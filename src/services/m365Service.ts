import { getGraphToken, fetchWithAuth } from '@/lib/m365'
import { mainStore } from '@/stores/main'

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

  fetchExcelRows: async (sourceDocId: string, worksheetName?: string): Promise<FetchResult> => {
    const token = getGraphToken()
    if (!token) return { data: [], error: NO_TOKEN_ERROR }

    const { sharepointDomain, sites } = mainStore.getState().sharepoint
    if (!sharepointDomain) return { data: [], error: NOT_FOUND_ERROR }

    const cleanId = sourceDocId.replace(/[{}]/g, '')

    try {
      if (isOneDriveDomain(sharepointDomain)) {
        return await m365Service.fetchFromOneDrive(cleanId, sourceDocId, worksheetName)
      }
      return await m365Service.fetchFromSharePoint(
        sharepointDomain,
        cleanId,
        sourceDocId,
        worksheetName,
        sites?.locacao,
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
  ): Promise<FetchResult> => {
    let itemData: any = null

    for (const id of [cleanId, originalId]) {
      const res = await fetchWithAuth(`https://graph.microsoft.com/v1.0/me/drive/items/${id}`)
      if (res.ok) {
        itemData = await res.json()
        break
      }
    }

    if (!itemData) {
      const searchRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/me/drive/root/search(q='${encodeURIComponent(cleanId)}')`,
      )
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        itemData = searchData.value?.[0] || null
      }
    }

    if (!itemData) return { data: [], error: NOT_FOUND_ERROR }

    if (worksheetName && itemData.id) {
      const rows = await fetchWorksheet(
        `https://graph.microsoft.com/v1.0/me/drive/items/${itemData.id}`,
        worksheetName,
      )
      if (rows) return { data: rows, error: null }
    }

    const listRes = await fetchWithAuth(
      `https://graph.microsoft.com/v1.0/me/drive/items/${itemData.id}/list/items?expand=fields`,
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
