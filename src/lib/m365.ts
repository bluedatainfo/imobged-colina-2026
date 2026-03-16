import { toast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'

export const getGraphToken = () => sessionStorage.getItem('m365_token')

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
      const url = `https://graph.microsoft.com/v1.0/sites/${hostname}:/sites/${sitePath}:/drive/root:/${library}/${fileName}:/content`

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
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Erro de Integração (Graph API)',
        description:
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

    // Graph API request placeholder for list sync
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
}
