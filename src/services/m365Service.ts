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
      const bytes = new TextEncoder().encode(sharingUrl)
      let binary = ''
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
      })
      const encodedLink =
        'u!' + btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '')

      const driveItemRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/shares/${encodedLink}/driveItem`,
      )
      if (!driveItemRes.ok) return { data: [], error: NOT_FOUND_ERROR }

      const driveItem = await driveItemRes.json()
      const driveId = driveItem.parentReference?.driveId
      const itemId = driveItem.id
      if (!driveId || !itemId) return { data: [], error: NOT_FOUND_ERROR }

      const encodedSheet = encodeURIComponent(worksheetName)
      const rangeRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('${encodedSheet}')/usedRange`,
      )
      if (!rangeRes.ok) return { data: [], error: NOT_FOUND_ERROR }

      const rangeData = await rangeRes.json()
      return { data: parseWorksheetRows(rangeData), error: null }
    } catch (e) {
      console.warn('Failed to fetch Excel rows via share link:', e)
      return { data: [], error: NOT_FOUND_ERROR }
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

  fetchAdminOneDriveExcel: async (worksheetName: string): Promise<FetchResult> => {
    const token = getGraphToken()
    if (!token) return { data: [], error: NO_TOKEN_ERROR }

    let creatorEmail: string | undefined
    let fileId: string | undefined
    let fileName: string | undefined

    try {
      const { data: settings } = await supabase
        .from('app_settings')
        .select('module_settings')
        .maybeSingle()

      const moduleSettings = (settings?.module_settings as any) || {}
      const formsConfig = moduleSettings.forms_online || {}

      creatorEmail = moduleSettings.creator_email?.trim() || undefined
      fileId = formsConfig.pf_sheet_id?.trim() || undefined
      fileName = formsConfig.pf_file_name?.trim() || undefined
    } catch (dbErr) {
      console.warn('Failed to fetch settings from app_settings', dbErr)
    }

    if (!creatorEmail) {
      return {
        data: [],
        error:
          'Email do administrador não configurado. Acesse as Configurações para definir o creator_email em module_settings.',
      }
    }

    const driveBaseUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(creatorEmail)}/drive`

    try {
      let itemData: any = null

      if (fileId) {
        const cleanId = fileId.replace(/[{}]/g, '')
        for (const id of [cleanId, fileId]) {
          const res = await fetchWithAuth(`${driveBaseUrl}/items/${id}`)
          if (res.ok) {
            itemData = await res.json()
            break
          }
        }
      }

      if (!itemData) {
        const searchTerm = fileName || '.xlsx'
        const searchRes = await fetchWithAuth(
          `${driveBaseUrl}/root/search(q='${encodeURIComponent(searchTerm)}')?$top=50`,
        )
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          const excelFiles = (searchData.value || []).filter((v: any) =>
            v.name?.toLowerCase().endsWith('.xlsx'),
          )
          if (fileName) {
            itemData =
              excelFiles.find((v: any) => v.name?.toLowerCase().includes(fileName.toLowerCase())) ||
              excelFiles[0] ||
              null
          } else {
            itemData = excelFiles[0] || null
          }
        }
      }

      if (!itemData) {
        return {
          data: [],
          error: `Planilha não encontrada no OneDrive de ${creatorEmail}. Verifique se o arquivo existe e se a aplicação tem permissão de acesso.`,
        }
      }

      const targetWorksheet = worksheetName || 'Sheet1'
      const encodedSheet = encodeURIComponent(targetWorksheet)
      const rangeRes = await fetchWithAuth(
        `${driveBaseUrl}/items/${itemData.id}/workbook/worksheets('${encodedSheet}')/usedRange`,
      )

      if (!rangeRes.ok) {
        return {
          data: [],
          error: `Aba "${targetWorksheet}" não encontrada na planilha "${itemData.name}". Verifique o nome da aba no arquivo.`,
        }
      }

      const rangeData = await rangeRes.json()
      return { data: parseWorksheetRows(rangeData), error: null }
    } catch (e) {
      console.warn('Failed to fetch admin OneDrive Excel:', e)
      return { data: [], error: NOT_FOUND_ERROR }
    }
  },
}
