import { getGraphToken } from '@/lib/m365'

export const m365Service = {
  isAuthenticated: () => {
    return !!localStorage.getItem('m365_token') || localStorage.getItem('m365_auth') === 'true'
  },

  login: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('m365_auth', 'true')
        resolve(true)
      }, 800)
    })
  },

  fetchExcelRows: async (sourceDocId: string, worksheetName?: string) => {
    const token = getGraphToken()
    if (!token) {
      console.warn('No M365 token found.')
      return []
    }

    const spConfigStr = localStorage.getItem('main-storage')
    let sharepointDomain = ''
    let sitePath = 'locacao'
    if (spConfigStr) {
      try {
        const state = JSON.parse(spConfigStr)
        if (state.state && state.state.sharepoint) {
          sharepointDomain = state.state.sharepoint.sharepointDomain || ''
          if (state.state.sharepoint.sites?.locacao) {
            sitePath = state.state.sharepoint.sites.locacao
          }
        }
      } catch {
        /* intentionally ignored */
      }
    }

    if (!sharepointDomain) {
      console.warn('SharePoint domain not configured.')
      return []
    }

    const headers = { Authorization: `Bearer ${token}` }

    try {
      let siteId = ''

      const directRes = await fetch(
        `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:/sites/${sitePath}`,
        { headers },
      )
      if (directRes.ok) {
        const directData = await directRes.json()
        if (directData.id) siteId = directData.id
      } else {
        const searchRes = await fetch(
          `https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(sitePath)}`,
          { headers },
        )
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          const site = searchData.value?.find(
            (s: any) => s.webUrl && s.webUrl.toLowerCase().includes(sitePath.toLowerCase()),
          )
          if (site) siteId = site.id
        }
      }

      if (!siteId) return []

      const cleanId = sourceDocId.replace(/[{}]/g, '')
      let targetDriveId = null
      let targetItemId = null

      const drivesRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, {
        headers,
      })
      if (drivesRes.ok) {
        const drivesData = await drivesRes.json()

        for (const drive of drivesData.value) {
          const itemRes = await fetch(
            `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/items/${cleanId}`,
            { headers },
          )
          if (itemRes.ok) {
            targetDriveId = drive.id
            targetItemId = cleanId
            break
          }
          const itemRes2 = await fetch(
            `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/items/${sourceDocId}`,
            { headers },
          )
          if (itemRes2.ok) {
            targetDriveId = drive.id
            targetItemId = sourceDocId
            break
          }
        }
      }

      if (targetDriveId && targetItemId && worksheetName) {
        const encodedName = encodeURIComponent(worksheetName)
        const rangeRes = await fetch(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${targetDriveId}/items/${targetItemId}/workbook/worksheets('${encodedName}')/usedRange`,
          { headers },
        )
        if (rangeRes.ok) {
          const rangeData = await rangeRes.json()
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
      }

      const listRes = await fetch(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${cleanId}/items?expand=fields`,
        { headers },
      )
      if (listRes.ok) {
        const listData = await listRes.json()
        return listData.value?.map((v: any) => v.fields || {}) || []
      }

      const listRes2 = await fetch(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${sourceDocId}/items?expand=fields`,
        { headers },
      )
      if (listRes2.ok) {
        const listData2 = await listRes2.json()
        return listData2.value?.map((v: any) => v.fields || {}) || []
      }
    } catch (e) {
      console.warn('Failed to fetch Excel rows from M365 API:', e)
    }

    return []
  },
}
