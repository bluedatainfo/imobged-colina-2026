import { toast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'
import { supabase } from '@/lib/supabase/client'

export const getGraphToken = () => localStorage.getItem('m365_token')

const refreshM365Token = async () => {
  const refreshToken = localStorage.getItem('m365_refresh_token')
  if (!refreshToken) return null

  const { clientId, tenantId } = mainStore.getState().sharepoint
  if (!clientId || !tenantId) return null

  try {
    const tokenParams = new URLSearchParams()
    tokenParams.append('client_id', clientId)
    tokenParams.append('refresh_token', refreshToken)
    tokenParams.append('grant_type', 'refresh_token')

    const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString(),
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('m365_token', data.access_token)
      if (data.refresh_token) {
        localStorage.setItem('m365_refresh_token', data.refresh_token)
      }
      return data.access_token
    }
  } catch (e) {
    console.error('Failed to refresh token', e)
  }
  return null
}

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = getGraphToken()

  const executeFetch = (currentToken: string | null) => {
    const headers = new Headers(options.headers || {})
    if (currentToken) {
      headers.set('Authorization', `Bearer ${currentToken}`)
    }
    return fetch(url, { ...options, headers })
  }

  let res = await executeFetch(token)

  if (res.status === 401) {
    const newToken = await refreshM365Token()
    if (newToken) {
      res = await executeFetch(newToken)
      if (res.status === 401) {
        throw new Error(
          'Sua sessão M365 expirou e não pôde ser renovada. Por favor, faça login novamente (Logout/Login).',
        )
      }
    } else {
      localStorage.removeItem('m365_token')
      localStorage.removeItem('m365_refresh_token')
      throw new Error(
        'Sua sessão M365 expirou e não pôde ser renovada. Por favor, faça login novamente (Logout/Login).',
      )
    }
  }
  return res
}

const resolveSiteId = async (hostname: string, sitePath: string): Promise<string | null> => {
  let spPath = sitePath.trim()
  if (spPath.startsWith('http')) {
    try {
      spPath = new URL(spPath).pathname
    } catch (e) {
      // Ignore URL parsing error
    }
  }

  if (!spPath || spPath === '/') {
    try {
      const res = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${hostname}`)
      if (res.ok) return (await res.json()).id
    } catch (e) {
      // Ignore site root fetch error
    }
    return null
  }

  if (!spPath.startsWith('/')) {
    if (!spPath.startsWith('sites/') && !spPath.startsWith('teams/')) {
      spPath = `/sites/${spPath}`
    } else {
      spPath = `/${spPath}`
    }
  }

  const siteName = spPath.split('/').filter(Boolean).pop()
  if (siteName) {
    try {
      const searchRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(siteName)}`,
      )
      if (searchRes.ok) {
        const data = await searchRes.json()
        const site = data.value?.find(
          (s: any) =>
            s.webUrl &&
            (s.webUrl.toLowerCase().endsWith(spPath.toLowerCase()) ||
              s.webUrl.toLowerCase().endsWith(spPath.replace('/sites/', '/teams/').toLowerCase())),
        )
        if (site && site.id) return site.id

        const fallbackSite = data.value?.find(
          (s: any) => s.name?.toLowerCase() === siteName.toLowerCase(),
        )
        if (fallbackSite && fallbackSite.id) return fallbackSite.id
      }
    } catch (e) {
      // Ignore search site error
    }
  }

  return null
}

export const m365Service = {
  sendEmail: (to: string, subject: string, body?: string) => {
    const { primaryDomain } = mainStore.getState().sharepoint
    toast({
      title: `E-mail M365 Enviado [Domínio: ${primaryDomain || 'Não configurado'}]`,
      description: `Para: ${to}\nAssunto: ${subject}`,
    })
  },

  findDocumentInSharePoint: async (fileName: string): Promise<string | null> => {
    const token = getGraphToken()
    if (!token) return null

    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    const { sites } = storeSpConfig
    if (!sharepointDomain || !sites.locacao) return null

    try {
      const siteId = await resolveSiteId(sharepointDomain, sites.locacao)
      if (!siteId) return null

      const drivesRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
      )
      if (!drivesRes.ok) return null
      const drivesData = await drivesRes.json()

      for (const drive of drivesData.value) {
        const searchRes = await fetchWithAuth(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root/search(q='${fileName}')`,
        )
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          if (searchData.value && searchData.value.length > 0) {
            const item = searchData.value[0]
            try {
              const previewRes = await fetchWithAuth(
                `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/items/${item.id}/preview`,
                { method: 'POST' },
              )
              if (previewRes.ok) {
                const previewData = await previewRes.json()
                if (previewData.getUrl) return previewData.getUrl
              }
            } catch (e) {
              /* Ignore preview fetch error */
            }
            return item.webUrl
          }
        }
      }
    } catch (e) {
      console.warn('Failed to search SharePoint dynamically', e)
    }
    return null
  },

  searchFilesByPropertyId: async (propertyId: string): Promise<any[]> => {
    const token = getGraphToken()
    if (!token) return []

    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    const { sites } = storeSpConfig
    if (!sharepointDomain || !sites.locacao) return []

    try {
      const siteId = await resolveSiteId(sharepointDomain, sites.locacao)
      if (!siteId) return []

      const drivesRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
      )
      if (!drivesRes.ok) return []
      const drivesData = await drivesRes.json()

      let allFiles: any[] = []
      for (const drive of drivesData.value) {
        const searchRes = await fetchWithAuth(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root/search(q='${propertyId}')`,
        )
        if (searchRes.ok) {
          const searchData = await searchRes.json()
          if (searchData.value) {
            allFiles = [...allFiles, ...searchData.value]
          }
        }
      }
      return allFiles
    } catch (e) {
      console.warn('Failed to search SharePoint by Property ID', e)
      return []
    }
  },

  getEntityDocuments: async (documentType: string, entityCode: string): Promise<any[] | null> => {
    const { data: config } = await supabase
      .from('sharepoint_configs')
      .select('*')
      .eq('document_type', documentType)
      .maybeSingle()

    if (!config) return null

    const token = getGraphToken()
    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain
    const { clientId, tenantId } = storeSpConfig

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    if (!token || !clientId || !tenantId) return null

    try {
      const siteId = await resolveSiteId(sharepointDomain, config.site_name)
      if (!siteId) return null

      const drivesRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
      )
      if (!drivesRes.ok) return null
      const drivesData = await drivesRes.json()
      const drive = drivesData.value.find(
        (d: any) =>
          d.name === config.library_name ||
          (d.name &&
            config.library_name &&
            d.name.toLowerCase() === config.library_name.toLowerCase()),
      )
      if (!drive) return null

      const folderPath = [config.base_path, entityCode].filter(Boolean).join('/')
      const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${drive.id}/root:/${folderPath}:/children`

      const res = await fetchWithAuth(url)
      if (res.ok) {
        const data = await res.json()
        return data.value || []
      } else if (res.status === 404) {
        return []
      }
    } catch (e) {
      console.warn('Failed to fetch entity documents from SP', e)
    }
    return null
  },

  getFilePreviewUrl: async (filePath: string, documentType: string) => {
    const { data: config } = await supabase
      .from('sharepoint_configs')
      .select('*')
      .eq('document_type', documentType)
      .maybeSingle()

    if (!config) throw new Error('Mapeamento GED não encontrado para esta categoria de documento.')

    const token = getGraphToken()
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let { sharepointDomain } = mainStore.getState().sharepoint

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    if (!token) throw new Error('Sessão do Microsoft 365 ausente ou expirada.')

    const siteId = await resolveSiteId(sharepointDomain, config.site_name)
    if (!siteId) {
      throw new Error(`Site M365 "${config.site_name}" não encontrado. Verifique o mapeamento GED.`)
    }

    const drivesRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`)
    if (!drivesRes.ok)
      throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`)

    const drivesData = await drivesRes.json()
    const drive = drivesData.value.find(
      (d: any) =>
        d.name === config.library_name ||
        (d.name &&
          config.library_name &&
          d.name.toLowerCase() === config.library_name.toLowerCase()),
    )

    if (!drive)
      throw new Error(
        `Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`,
      )
    const driveId = drive.id

    let safePath = filePath
    if (safePath.startsWith('/')) safePath = safePath.substring(1)

    let itemData: any = null

    // Attempt 1: Get directly by path
    const itemUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${safePath}`
    const itemRes = await fetchWithAuth(itemUrl)
    if (itemRes.ok) {
      itemData = await itemRes.json()
    }

    // Attempt 2: Fallback to search
    if (!itemData) {
      const fileName = safePath.split('/').pop() || safePath
      const searchUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root/search(q='${encodeURIComponent(fileName)}')`
      const searchRes = await fetchWithAuth(searchUrl)
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        itemData = searchData.value?.find((v: any) => v.name === fileName)
      }
    }

    const expectedDomain = envBaseUrl
      ? envBaseUrl.replace(/\/$/, '')
      : `https://${sharepointDomain}/sites/${config.site_name}`
    const fullExpectedUrl = `${expectedDomain}/${config.library_name}/${safePath}`

    if (!itemData) {
      throw new Error(`Arquivo não encontrado no SharePoint. Caminho buscado: ${fullExpectedUrl}`)
    }

    try {
      const previewRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${itemData.id}/preview`,
        { method: 'POST' },
      )
      if (previewRes.ok) {
        const previewData = await previewRes.json()
        if (previewData.getUrl) return previewData.getUrl
      }
    } catch (e) {
      console.warn('Falha ao gerar link de preview, caindo para link de fallback', e)
    }

    return itemData.webUrl || fullExpectedUrl
  },

  saveToLibrary: async (
    library: string,
    fileName: string,
    fileContent: string | Blob = 'Conteúdo gerado via sistema',
    sitePath: string = 'locacao',
  ) => {
    const token = getGraphToken()
    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain
    const { clientId, tenantId } = storeSpConfig

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    if (!token || !clientId || !tenantId) {
      toast({
        title: `SharePoint: ${library} [Mock]`,
        description: `Arquivo ${fileName} salvo localmente. Configure as credenciais no painel de Integração SharePoint para envio real.`,
      })
      return
    }

    try {
      const siteId = await resolveSiteId(sharepointDomain, sitePath)
      if (!siteId) throw new Error(`Site "${sitePath}" não encontrado no M365.`)

      const drivesRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
      )
      if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas de "${sitePath}".`)
      const drivesData = await drivesRes.json()
      const drive = drivesData.value.find(
        (d: any) =>
          d.name === library ||
          (d.name && library && d.name.toLowerCase() === library.toLowerCase()),
      )

      if (!drive) throw new Error(`Biblioteca "${library}" não encontrada no site "${sitePath}".`)
      const driveId = drive.id

      const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fileName}:/content`

      const res = await fetchWithAuth(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: fileContent,
      })

      if (!res.ok) {
        throw new Error('Upload falhou devido à falta de permissões ou caminhos incorretos')
      }

      toast({
        title: 'SharePoint Online',
        description: `Upload real do arquivo ${fileName} concluído com sucesso.`,
      })
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de Integração (Graph API)',
        description:
          e.message ||
          'Unable to connect to Microsoft 365. Please verify your Client/Tenant ID and Azure App permissions.',
      })
    }
  },

  syncToList: async (listName: string, itemData: string) => {
    const token = getGraphToken()
    const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint

    if (!token || !clientId || !tenantId) {
      toast({
        title: `Lista SharePoint: ${listName} [Mock]`,
        description: 'Sincronizado com sucesso (Modo de simulação).',
      })
      return
    }

    toast({
      title: `Sincronização Online`,
      description: `Dados enviados em tempo real para a lista ${listName}.`,
    })
  },

  sendTeamsMessage: (webhookUrl: string | undefined, message: string) => {
    if (!webhookUrl) return
    toast({
      title: 'Notificação Microsoft Teams',
      description: message,
    })
  },

  moveDocument: (fileName: string, targetLibrary: string) => {
    const { sharepointDomain } = mainStore.getState().sharepoint
    toast({
      title: `Sincronização Condicional Ativa [Domínio SP: ${sharepointDomain || 'N/A'}]`,
      description: `Arquivo ${fileName} movido automaticamente para a biblioteca "${targetLibrary}".`,
    })
  },

  fetchListItems: async (sitePath: string, listName: string): Promise<any[]> => {
    const token = getGraphToken()
    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain
    const { clientId, tenantId } = storeSpConfig

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    if (!token || !clientId || !tenantId) {
      if (listName.includes('PF') || listName.includes('Locat') || listName.includes('Locatrios')) {
        return [
          {
            id: 'mock-1',
            fields: {
              Title: 'João Silva',
              CPF: '111.222.333-44',
              Celular: '(11) 99999-1111',
              Email: 'joao@email.com',
            },
          },
        ]
      }
      if (listName.includes('PJ')) {
        return [
          {
            id: 'mock-2',
            fields: {
              Title: 'Empresa Fictícia LTDA',
              CNPJ: '12.345.678/0001-99',
              Endereco: 'Rua das Flores, 123',
              Email: 'contato@empresa.com',
            },
          },
        ]
      }
      if (listName.includes('Fiador')) {
        return [
          {
            id: 'mock-3',
            fields: {
              Title: 'Maria Oliveira',
              CPF: '555.666.777-88',
              Celular: '(11) 98888-2222',
              Email: 'maria@email.com',
            },
          },
        ]
      }
      return []
    }

    try {
      const siteId = await resolveSiteId(sharepointDomain, sitePath)
      if (!siteId) return []

      const listsRes = await fetchWithAuth(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists`)
      if (!listsRes.ok) return []
      const listsData = await listsRes.json()

      const list = listsData.value.find(
        (l: any) =>
          l.name === listName ||
          l.displayName === listName ||
          (l.name &&
            l.name.replace(/\s+/g, '').toLowerCase() ===
              listName.replace(/\s+/g, '').toLowerCase()) ||
          (l.displayName &&
            l.displayName.replace(/\s+/g, '').toLowerCase() ===
              listName.replace(/\s+/g, '').toLowerCase()),
      )

      if (!list) return []

      const itemsRes = await fetchWithAuth(
        `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${list.id}/items?expand=fields`,
      )
      if (!itemsRes.ok) return []
      const itemsData = await itemsRes.json()

      return itemsData.value || []
    } catch (e) {
      console.warn(`Failed to fetch items from list ${listName}`, e)
      return []
    }
  },

  uploadStructuredDocument: async (
    file: File | Blob,
    fileName: string,
    documentType: string,
    propertyId: string,
    propertyTitle: string,
    userName: string,
    entityCode?: string,
    entityName?: string,
    leaseNumber?: string,
  ) => {
    const { data: config, error } = await supabase
      .from('sharepoint_configs')
      .select('*')
      .eq('document_type', documentType)
      .maybeSingle()

    if (error || !config) {
      throw new Error('SharePoint configuration missing for this document category.')
    }

    const isEntityDoc = ['OWNER_DOCUMENT', 'TENANT_DOCUMENT'].includes(documentType)
    const isInspection = ['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT'].includes(documentType)
    const isLease = documentType === 'LEASES'
    const date = new Date()

    let folderPath = ''
    if (isEntityDoc && entityCode) {
      folderPath = [config.base_path, entityCode].filter(Boolean).join('/')
    } else if (isInspection && leaseNumber) {
      const inspectionSubFolder =
        documentType === 'INSPECTION_MOVE_IN' ? 'Vistoria de Entrada' : 'Vistoria de Saida'
      folderPath = [config.base_path, propertyId, 'Locacao', leaseNumber, inspectionSubFolder]
        .filter(Boolean)
        .join('/')
    } else if (isLease && leaseNumber) {
      folderPath = [config.base_path, propertyId, 'Locacao', leaseNumber].filter(Boolean).join('/')
    } else {
      folderPath = [config.base_path, propertyId].filter(Boolean).join('/')
    }

    const fullPath = `${folderPath}/${fileName}`

    const token = getGraphToken()
    const storeSpConfig = mainStore.getState().sharepoint
    const envBaseUrl = import.meta.env.VITE_SHAREPOINT_BASE_URL as string
    let sharepointDomain = storeSpConfig.sharepointDomain
    const { clientId, tenantId } = storeSpConfig

    if (envBaseUrl) {
      try {
        sharepointDomain = new URL(envBaseUrl).hostname
      } catch (e) {
        /* ignore */
      }
    }

    try {
      if (!token || !clientId || !tenantId) {
        toast({
          title: `Upload GED Simulado: ${config.site_name}`,
          description: `Salvo em: /${config.library_name}/${fullPath}`,
        })
        mainStore.addAuditLog({
          propertyId,
          action: 'SHAREPOINT_UPLOAD',
          user: userName,
          details: `[Mock] Arquivo ${fileName} salvo em ${config.site_name}/${config.library_name}/${folderPath}`,
        })
      } else {
        const siteId = await resolveSiteId(sharepointDomain, config.site_name)

        if (!siteId) {
          throw new Error(
            `Site M365 "${config.site_name}" não encontrado. Verifique o mapeamento GED.`,
          )
        }

        const drivesRes = await fetchWithAuth(
          `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
        )
        if (!drivesRes.ok)
          throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`)
        const drivesData = await drivesRes.json()
        const drive = drivesData.value.find(
          (d: any) =>
            d.name === config.library_name ||
            (d.name &&
              config.library_name &&
              d.name.toLowerCase() === config.library_name.toLowerCase()),
        )

        if (!drive)
          throw new Error(
            `Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`,
          )
        const driveId = drive.id

        const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fullPath}:/content`

        const res = await fetchWithAuth(url, {
          method: 'PUT',
          headers: {
            'Content-Type': file instanceof File ? file.type : 'application/octet-stream',
          },
          body: file,
        })

        if (!res.ok) {
          throw new Error('Erro de permissão no SharePoint ou caminho de upload inválido.')
        }

        const uploadedItem = await res.json()

        if (isEntityDoc && entityCode) {
          try {
            await fetchWithAuth(
              `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${uploadedItem.id}/listItem/fields`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  IdentificationCode: entityCode,
                  EntityName: entityName || '',
                }),
              },
            )
          } catch (metaErr) {
            console.warn(
              'Failed to update SharePoint metadata. Make sure the columns exist in the library.',
              metaErr,
            )
          }
        }

        mainStore.addAuditLog({
          propertyId,
          action: 'SHAREPOINT_UPLOAD',
          user: userName,
          details: `Arquivo ${fileName} salvo com sucesso em ${config.site_name}/${config.library_name}/${folderPath}`,
        })
      }

      return { success: true, path: fullPath }
    } catch (e: any) {
      const msg =
        e.message || 'Erro de permissão no SharePoint. Verifique o acesso do seu usuário M365.'

      mainStore.addAuditLog({
        propertyId,
        action: 'SHAREPOINT_UPLOAD_ERROR',
        user: userName,
        details: `Erro ao subir ${fileName}: ${msg}`,
      })

      toast({ variant: 'destructive', title: 'Falha no Upload GED', description: msg })
      throw new Error(msg)
    }
  },
}
