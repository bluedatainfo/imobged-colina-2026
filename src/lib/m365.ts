import { toast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'

export const m365Service = {
  sendEmail: (to: string, subject: string, body?: string) => {
    const { primaryDomain } = mainStore.getState().sharepoint
    toast({
      title: `E-mail M365 Enviado [Domínio: ${primaryDomain || 'Não configurado'}]`,
      description: `Para: ${to}\nAssunto: ${subject}`,
    })
  },
  saveToLibrary: (library: string, fileName: string) => {
    const { sharepointDomain } = mainStore.getState().sharepoint
    toast({
      title: `SharePoint: Gestão de Locação [Domínio SP: ${sharepointDomain || 'N/A'}]`,
      description: `Arquivo ${fileName} salvo em "${library}".`,
    })
  },
  syncToList: (listName: string, itemData: string) => {
    const { sharepointDomain } = mainStore.getState().sharepoint
    toast({
      title: `Lista SharePoint: ${listName} [Domínio SP: ${sharepointDomain || 'N/A'}]`,
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
    const { sharepointDomain } = mainStore.getState().sharepoint
    toast({
      title: `Sincronização Condicional Ativa [Domínio SP: ${sharepointDomain || 'N/A'}]`,
      description: `Arquivo ${fileName} movido automaticamente para a biblioteca "${targetLibrary}".`,
    })
  },
}
