import { getGraphToken, fetchWithAuth } from '@/lib/m365'
import { mainStore } from '@/stores/main'
import { supabase } from '@/lib/supabase/client'

export interface FetchResult {
  data: any[]
  error: string | null
}

const NO_TOKEN_ERROR =
  'Conexão com Microsoft 365 não encontrada. Por favor, realize o login em Configurações.'
const NOT_FOUND_ERROR =
  'Não foi possível localizar a planilha no OneDrive/SharePoint. Verifique o domínio e o caminho configurados.'

const isOneDriveDomain = (domain: string): boolean =>
  domain.toLowerCase().includes('-my.sharepoint.com')

const parseWorksheetRows = (rangeData: any): any[] => {
  const rows = rangeData.values
  if (!rows || rows.length <= 1) return []
  const headersRow = rows[0]
  const data: any[] = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const obj: any = {}
    let hasData = false
    headersRow.forEach((header: string, index: number) => {
      if (header) {
        obj[header] = row[index]
        if (row[index] !== null && row[index] !== '') hasData = true
      }
    })
    if (hasData) data.push(obj)
  }
  return data
}

const encodeSharingUrl = (sharingUrl: string): string => {
  const bytes = new TextEncoder().encode(sharingUrl)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return 'u!' + btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '')
}

const fetchWorksheet = async (
  itemBaseUrl: string,
  worksheetName: string,
): Promise<any[] | null> => {
  const encodedName = encodeURIComponent(worksheetName)
  const rangeRes = await fetchWithAuth(
    `${itemBaseUrl}/workbook/worksheets('${encodedName}')/usedRange`,
  )
  if (!rangeRes.ok) return null
  return parseWorksheetRows(await rangeRes.json())
}

export const m365Service = {
  isAuthenticated: () => !!getGraphToken(),

  login: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('m365_auth', 'true')
        resolve(true)
      }, 800)
    })
  },

  fetchExcelRowsByShareLink: async (
    sharingUrl: string,
    worksheetName: string,
  ): Promise<FetchResult> => {
    const token = getGraphToken()
    if (!token) return { data: [], error: NO_TOKEN_ERROR }

    try {
      const encodedLink = encodeSharingUrl(sharingUrl)

      const driveItemRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/shares/${encodedLink}/driveItem`,
      )
      if (!driveItemRes.ok) {
        if (driveItemRes.status === 401 || driveItemRes.status === 403) {
          return {
            data: [],
            error:
              'Acesso negado pelo Microsoft 365. Verifique se o link de compartilhamento ainda é válido e se você tem permissões para acessar o arquivo.',
          }
        }
        if (driveItemRes.status === 404) {
          return {
            data: [],
            error:
              'O link de compartilhamento não foi encontrado. Verifique se o link está correto e se o arquivo ainda existe no SharePoint.',
          }
        }
        return { data: [], error: NOT_FOUND_ERROR }
      }

      const driveItem = await driveItemRes.json()
      const driveId = driveItem.parentReference?.driveId
      const itemId = driveItem.id
      if (!driveId || !itemId) return { data: [], error: NOT_FOUND_ERROR }

      const itemBaseUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}`

      const encodedSheet = encodeURIComponent(worksheetName)
      const rangeRes = await fetchWithAuth(
        `${itemBaseUrl}/workbook/worksheets('${encodedSheet}')/usedRange`,
      )

      if (rangeRes.ok) {
        const rangeData = await rangeRes.json()
        return { data: parseWorksheetRows(rangeData), error: null }
      }

      const worksheetsRes = await fetchWithAuth(`${itemBaseUrl}/workbook/worksheets`)
      if (worksheetsRes.ok) {
        const worksheetsData = await worksheetsRes.json()
        const worksheets = worksheetsData.value || []

        if (worksheets.length === 0) {
          return { data: [], error: 'A planilha não contém nenhuma aba de trabalho.' }
        }

        const firstSheetName = worksheets[0].name
        const firstRangeRes = await fetchWithAuth(
          `${itemBaseUrl}/workbook/worksheets('${encodeURIComponent(firstSheetName)}')/usedRange`,
        )

        if (firstRangeRes.ok) {
          const firstRangeData = await firstRangeRes.json()
          return { data: parseWorksheetRows(firstRangeData), error: null }
        }

        return {
          data: [],
          error: `Não foi possível ler os dados da aba "${firstSheetName}" na planilha compartilhada.`,
        }
      }

      return {
        data: [],
        error: `A aba "${worksheetName}" não foi encontrada na planilha compartilhada, e não foi possível listar as abas disponíveis. Verifique se o arquivo é uma planilha Excel válida.`,
      }
    } catch (e: any) {
      console.warn('Failed to fetch Excel rows via share link:', e)
      const errorMsg = e?.message || NOT_FOUND_ERROR
      return { data: [], error: errorMsg }
    }
  },

  fetchExcelRows: async (sourceDocId: string, worksheetName?: string): Promise<FetchResult> => {
    const token = getGraphToken()
    if (!token) return { data: [], error: NO_TOKEN_ERROR }

    let defaultDomain = mainStore.getState().sharepoint.sharepointDomain
    let creatorEmail: string | undefined

    try {
      const { data: settings } = await supabase
        .from('app_settings')
        .select('default_domain, module_settings')
        .maybeSingle()

      if (settings?.default_domain) {
        defaultDomain = settings.default_domain
      }

      creatorEmail =
        ((settings?.module_settings as any)?.creator_email as string | undefined)?.trim() ||
        undefined
    } catch (dbErr) {
      console.warn('Failed to fetch default_domain from app_settings', dbErr)
    }

    if (!defaultDomain)
      return {
        data: [],
        error: 'Domínio M365 não configurado. Acesse as Configurações para definir o domínio.',
      }

    const cleanId = sourceDocId.replace(/[{}]/g, '')

    try {
      if (creatorEmail) {
        return await m365Service.fetchFromOneDrive(
          cleanId,
          sourceDocId,
          worksheetName,
          creatorEmail,
        )
      }
      if (isOneDriveDomain(defaultDomain)) {
        return await m365Service.fetchFromOneDrive(cleanId, sourceDocId, worksheetName)
      }
      return await m365Service.fetchFromSharePoint(
        defaultDomain,
        cleanId,
        sourceDocId,
        worksheetName,
        mainStore.getState().sharepoint.sites?.locacao,
      )
    } catch (e) {
      console.warn('Failed to fetch Excel rows from M365 API:', e)
      return { data: [], error: NOT_FOUND_ERROR }
    }
  },

  fetchFromOneDrive: async (
    cleanId: string,
    originalId: string,
    worksheetName?: string,
    creatorEmail?: string,
  ): Promise<FetchResult> => {
    const driveBaseUrl = creatorEmail
      ? `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(creatorEmail)}/drive`
      : 'https://graph.microsoft.com/v1.0/me/drive'

    let itemData: any = null

    for (const id of [cleanId, originalId]) {
      const res = await fetchWithAuth(`${driveBaseUrl}/items/${id}`)
      if (res.ok) {
        itemData = await res.json()
        break
      }
    }

    if (!itemData) {
      const searchRes = await fetchWithAuth(
        `${driveBaseUrl}/root/search(q='${encodeURIComponent(cleanId)}')`,
      )
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        itemData = searchData.value?.[0] || null
      }
    }

    if (!itemData) return { data: [], error: NOT_FOUND_ERROR }

    if (worksheetName && itemData.id) {
      const rows = await fetchWorksheet(`${driveBaseUrl}/items/${itemData.id}`, worksheetName)
      if (rows) return { data: rows, error: null }
    }

    const listRes = await fetchWithAuth(
      `${driveBaseUrl}/items/${itemData.id}/list/items?expand=fields`,
    )
    if (listRes.ok) {
      const listData = await listRes.json()
      return { data: listData.value?.map((v: any) => v.fields || {}) || [], error: null }
    }

    return { data: [], error: NOT_FOUND_ERROR }
  },

  fetchFromSharePoint: async (
    sharepointDomain: string,
    cleanId: string,
    originalId: string,
    worksheetName?: string,
    sitePath?: string,
  ): Promise<FetchResult> => {
    const path = sitePath || 'locacao'
    let siteId = ''

    const directRes = await fetchWithAuth(
      `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:/sites/${path}`,
    )
    if (directRes.ok) {
      siteId = (await directRes.json()).id || ''
    } else {
      const searchRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(path)}`,
      )
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        const site = searchData.value?.find((s: any) =>
          s.webUrl?.toLowerCase().includes(path.toLowerCase()),
        )
        if (site) siteId = site.id
      }
    }

    if (!siteId) return { data: [], error: NOT_FOUND_ERROR }

    let targetDriveId: string | null = null
    let targetItemId: string | null = null

    const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`)
    if (drivesRes.ok) {
      const drivesData = await drivesRes.json()
      for (const drive of drivesData.value) {
        for (const id of [cleanId, originalId]) {
          const itemRes = await fetchWithAuth(
            `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/items/${id}`,
          )
          if (itemRes.ok) {
            targetDriveId = drive.id
            targetItemId = id
            break
          }
        }
        if (targetDriveId) break
      }
    }

    if (targetDriveId && targetItemId && worksheetName) {
      const rows = await fetchWorksheet(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${targetDriveId}/items/${targetItemId}`,
        worksheetName,
      )
      if (rows) return { data: rows, error: null }
    }

    for (const id of [cleanId, originalId]) {
      const listRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${id}/items?expand=fields`,
      )
      if (listRes.ok) {
        const listData = await listRes.json()
        return { data: listData.value?.map((v: any) => v.fields || {}) || [], error: null }
      }
    }

    return { data: [], error: NOT_FOUND_ERROR }
  },
}
