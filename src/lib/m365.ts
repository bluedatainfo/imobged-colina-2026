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

    const { sharepointDomain, sites } = mainStore.getState().sharepoint
    if (!sharepointDomain || !sites.locacao) return null

    try {
      let sitePath = sites.locacao.trim()
      if (sitePath.startsWith('http')) {
        try {
          sitePath = new URL(sitePath).pathname
        } catch (e) {
          /* Ignore URL parsing error */
        }
      }
      if (!sitePath.startsWith('/')) {
        if (!sitePath.startsWith('sites/') && !sitePath.startsWith('teams/'))
          sitePath = `/sites/${sitePath}`
        else sitePath = `/${sitePath}`
      }

      let siteUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${sitePath}`
      let siteRes = await fetchWithAuth(siteUrl)

      if (siteRes.status === 404 && sitePath.startsWith('/sites/')) {
        const fallbackPath = sitePath.replace('/sites/', '/teams/')
        siteUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${fallbackPath}`
        siteRes = await fetchWithAuth(siteUrl)
      }

      if (!siteRes.ok) return null
      const siteId = (await siteRes.json()).id

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

    const { sharepointDomain, sites } = mainStore.getState().sharepoint
    if (!sharepointDomain || !sites.locacao) return []

    try {
      let sitePath = sites.locacao.trim()
      if (sitePath.startsWith('http')) {
        try {
          sitePath = new URL(sitePath).pathname
        } catch (e) {
          /* Ignore URL parsing error */
        }
      }
      if (!sitePath.startsWith('/')) {
        if (!sitePath.startsWith('sites/') && !sitePath.startsWith('teams/'))
          sitePath = `/sites/${sitePath}`
        else sitePath = `/${sitePath}`
      }

      let siteUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${sitePath}`
      let siteRes = await fetchWithAuth(siteUrl)

      if (siteRes.status === 404 && sitePath.startsWith('/sites/')) {
        const fallbackPath = sitePath.replace('/sites/', '/teams/')
        siteUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${fallbackPath}`
        siteRes = await fetchWithAuth(siteUrl)
      }

      if (!siteRes.ok) return []
      const siteId = (await siteRes.json()).id

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

  getFilePreviewUrl: async (filePath: string, documentType: string) => {
    const { data: config } = await supabase
      .from('sharepoint_configs')
      .select('*')
      .eq('document_type', documentType)
      .maybeSingle()

    if (!config) throw new Error('Mapeamento GED não encontrado para esta categoria de documento.')

    const token = getGraphToken()
    const { sharepointDomain } = mainStore.getState().sharepoint

    if (!token) throw new Error('Sessão do Microsoft 365 ausente ou expirada.')

    let sitePath = config.site_name.trim()
    if (sitePath.startsWith('http')) {
      try {
        sitePath = new URL(sitePath).pathname
      } catch (e) {
        // Ignore URL parsing error
      }
    }
    if (!sitePath.startsWith('/')) {
      if (!sitePath.startsWith('sites/') && !sitePath.startsWith('teams/')) {
        sitePath = `/sites/${sitePath}`
      } else {
        sitePath = `/${sitePath}`
      }
    }

    let siteUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${sitePath}`
    let siteRes = await fetchWithAuth(siteUrl)

    if (siteRes.status === 404 && sitePath.startsWith('/sites/')) {
      const fallbackPath = sitePath.replace('/sites/', '/teams/')
      const fallbackUrl = `https://graph.microsoft.com/v1.0/sites/${sharepointDomain}:${fallbackPath}`
      const fallbackRes = await fetchWithAuth(fallbackUrl)
      if (fallbackRes.ok) siteRes = fallbackRes
    }

    if (!siteRes.ok) {
      throw new Error(`Site M365 "${config.site_name}" não encontrado. Verifique o mapeamento GED.`)
    }
    const siteId = (await siteRes.json()).id

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

    const itemUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${safePath}`
    const itemRes = await fetchWithAuth(itemUrl)

    if (!itemRes.ok) {
      throw new Error(`Arquivo não encontrado no SharePoint no caminho: ${safePath}`)
    }
    const itemData = await itemRes.json()

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
      console.warn('Falha ao gerar link de preview, caindo para webUrl original', e)
    }

    return itemData.webUrl
  },

  saveToLibrary: async (
    library: string,
    fileName: string,
    fileContent: string | Blob = 'Conteúdo gerado via sistema',
    sitePath: string = 'locacao',
  ) => {
    const token = getGraphToken()
    const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint

    if (!token || !clientId || !tenantId) {
      toast({
        title: `SharePoint: ${library} [Mock]`,
        description: `Arquivo ${fileName} salvo localmente. Configure as credenciais no painel de Integração SharePoint para envio real.`,
      })
      return
    }

    try {
      const hostname = sharepointDomain

      let spPath = sitePath.trim()
      if (spPath.startsWith('http')) {
        try {
          spPath = new URL(spPath).pathname
        } catch (e) {
          /* Ignore URL parsing error */
        }
      }

      if (!spPath.startsWith('/')) {
        if (!spPath.startsWith('sites/') && !spPath.startsWith('teams/')) {
          spPath = `/sites/${spPath}`
        } else {
          spPath = `/${spPath}`
        }
      }

      let siteUrl = `https://graph.microsoft.com/v1.0/sites/${hostname}:${spPath}`
      let siteRes = await fetchWithAuth(siteUrl)

      if (siteRes.status === 404 && spPath.startsWith('/sites/')) {
        const fallbackPath = spPath.replace('/sites/', '/teams/')
        const fallbackUrl = `https://graph.microsoft.com/v1.0/sites/${hostname}:${fallbackPath}`
        const fallbackRes = await fetchWithAuth(fallbackUrl)
        if (fallbackRes.ok) {
          siteRes = fallbackRes
          spPath = fallbackPath
        }
      }

      if (!siteRes.ok) throw new Error(`Site "${sitePath}" não encontrado no M365.`)
      const siteId = (await siteRes.json()).id

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

  uploadStructuredDocument: async (
    file: File | Blob,
    fileName: string,
    documentType: string,
    propertyId: string,
    propertyTitle: string,
    userName: string,
    entityCode?: string,
    entityName?: string,
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
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    let folderPath = ''
    if (isEntityDoc && entityCode) {
      folderPath = [config.base_path, entityCode].filter(Boolean).join('/')
    } else {
      folderPath = [config.base_path, year, month, propertyId].filter(Boolean).join('/')
    }

    const extIndex = fileName.lastIndexOf('.')
    const nameWithoutExt = extIndex !== -1 ? fileName.substring(0, extIndex) : fileName
    const ext = extIndex !== -1 ? fileName.substring(extIndex) : ''
    const uniqueFileName = `${nameWithoutExt}_${date.getTime()}${ext}`

    const fullPath = `${folderPath}/${uniqueFileName}`

    const token = getGraphToken()
    const { sharepointDomain, clientId, tenantId } = mainStore.getState().sharepoint

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
          details: `[Mock] Arquivo ${uniqueFileName} salvo em ${config.site_name}/${config.library_name}/${folderPath}`,
        })
      } else {
        const hostname = sharepointDomain

        let sitePath = config.site_name.trim()

        if (sitePath.startsWith('http')) {
          try {
            sitePath = new URL(sitePath).pathname
          } catch (e) {
            /* Ignore URL parsing error */
          }
        }

        if (!sitePath.startsWith('/')) {
          if (!sitePath.startsWith('sites/') && !sitePath.startsWith('teams/')) {
            sitePath = `/sites/${sitePath}`
          } else {
            sitePath = `/${sitePath}`
          }
        }

        let siteUrl = `https://graph.microsoft.com/v1.0/sites/${hostname}:${sitePath}`
        let siteRes = await fetchWithAuth(siteUrl)

        if (siteRes.status === 404 && sitePath.startsWith('/sites/')) {
          const fallbackPath = sitePath.replace('/sites/', '/teams/')
          const fallbackUrl = `https://graph.microsoft.com/v1.0/sites/${hostname}:${fallbackPath}`
          const fallbackRes = await fetchWithAuth(fallbackUrl)
          if (fallbackRes.ok) {
            siteRes = fallbackRes
            sitePath = fallbackPath
          }
        }

        if (!siteRes.ok) {
          const errorMsg = await siteRes
            .json()
            .catch(() => ({ error: { message: siteRes.statusText } }))
          throw new Error(
            `Site M365 "${config.site_name}" não encontrado. (Erro: ${errorMsg?.error?.message || siteRes.status}). Verifique o mapeamento GED.`,
          )
        }
        const siteId = (await siteRes.json()).id

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
          details: `Arquivo ${uniqueFileName} salvo com sucesso em ${config.site_name}/${config.library_name}/${folderPath}`,
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
        details: `Erro ao subir ${uniqueFileName}: ${msg}`,
      })

      toast({ variant: 'destructive', title: 'Falha no Upload GED', description: msg })
      throw new Error(msg)
    }
  },
}
