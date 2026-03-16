import { toast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'

export const m365Service = {
  sendEmail: (to: string, subject: string, body?: string) => {
    const { tenantId } = mainStore.getState().sharepoint
    toast({
      title: `E-mail M365 Enviado [Tenant: ${tenantId || 'Não configurado'}]`,
      description: `Para: ${to}\nAssunto: ${subject}`,
    })
  },
  saveToLibrary: (library: string, fileName: string) => {
    const { tenantId } = mainStore.getState().sharepoint
    toast({
      title: `SharePoint: Gestão de Locação [Tenant: ${tenantId || 'N/A'}]`,
      description: `Arquivo ${fileName} salvo em "${library}".`,
    })
  },
  syncToList: (listName: string, itemData: string) => {
    const { tenantId } = mainStore.getState().sharepoint
    toast({
      title: `Lista SharePoint: ${listName} [Tenant: ${tenantId || 'N/A'}]`,
      description: 'Sincronizado com sucesso.',
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
    const { tenantId } = mainStore.getState().sharepoint
    toast({
      title: `Sincronização Condicional Ativa [Tenant: ${tenantId || 'N/A'}]`,
      description: `Arquivo ${fileName} movido automaticamente para a biblioteca "${targetLibrary}".`,
    })
  },
}
