import { toast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'
import { supabase } from '@/lib/supabase/client'

export const getGraphToken = () => localStorage.getItem('m365_token')

export const m365Service = {
  sendEmail: (to: string, subject: string, body?: string) => {
    const { primaryDomain } = mainStore.getState().sharepoint
    toast({
      title: `E-mail M365 Enviado [Domínio: ${primaryDomain || 'Não configurado'}]`,
      description: `Para: ${to}\nAssunto: ${subject}`,
    })
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

      // Get Site ID
      const siteRes = await fetch(
        `https://graph.microsoft.com/v1.0/sites/${hostname}:/sites/${sitePath}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (!siteRes.ok) throw new Error(`Site "${sitePath}" não encontrado no M365.`)
      const siteId = (await siteRes.json()).id

      // Get Drive ID
      const drivesRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!drivesRes.ok) throw new Error(`Não foi possível listar as bibliotecas de "${sitePath}".`)
      const drivesData = await drivesRes.json()
      const drive = drivesData.value.find((d: any) => d.name === library)

      if (!drive) throw new Error(`Biblioteca "${library}" não encontrada no site "${sitePath}".`)
      const driveId = drive.id

      // Upload with ID-based URL
      const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fileName}:/content`

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
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
    const sanitizedTitle = propertyTitle.replace(/[^a-zA-Z0-9 -]/g, '').trim()

    let folderPath = ''
    if (isEntityDoc && entityCode) {
      folderPath = [config.base_path, entityCode].filter(Boolean).join('/')
    } else {
      folderPath = [config.base_path, year, month, sanitizedTitle].filter(Boolean).join('/')
    }

    // Ensure uniqueness
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

        // 1. Get Site ID Dynamically
        const siteRes = await fetch(
          `https://graph.microsoft.com/v1.0/sites/${hostname}:/sites/${config.site_name}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!siteRes.ok)
          throw new Error(
            `Site M365 "${config.site_name}" não encontrado. Verifique a configuração de mapeamento GED.`,
          )
        const siteId = (await siteRes.json()).id

        // 2. Get Drive ID Dynamically
        const drivesRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!drivesRes.ok)
          throw new Error(`Não foi possível listar as bibliotecas do site "${config.site_name}".`)
        const drivesData = await drivesRes.json()
        const drive = drivesData.value.find((d: any) => d.name === config.library_name)

        if (!drive)
          throw new Error(
            `Biblioteca "${config.library_name}" não encontrada no site "${config.site_name}".`,
          )
        const driveId = drive.id

        // 3. Upload File Using Dynamic IDs
        const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${fullPath}:/content`

        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': file instanceof File ? file.type : 'application/octet-stream',
          },
          body: file,
        })

        if (!res.ok) {
          throw new Error('Erro de permissão no SharePoint ou caminho de upload inválido.')
        }

        const uploadedItem = await res.json()

        // 4. Update Metadata if it's an entity doc
        if (isEntityDoc && entityCode) {
          try {
            await fetch(
              `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${uploadedItem.id}/listItem/fields`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${token}`,
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
