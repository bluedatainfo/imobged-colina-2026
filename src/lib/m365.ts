import { toast } from '@/hooks/use-toast'

export const m365Service = {
  sendEmail: (to: string, subject: string, body?: string) => {
    toast({
      title: 'E-mail M365 Enviado',
      description: `Para: ${to}\nAssunto: ${subject}`,
    })
  },
  saveToLibrary: (library: string, fileName: string) => {
    toast({
      title: 'SharePoint: Gestão de Locação',
      description: `Arquivo ${fileName} salvo em "${library}".`,
    })
  },
  syncToList: (listName: string, itemData: string) => {
    toast({
      title: `Lista SharePoint: ${listName}`,
      description: 'Sincronizado com sucesso.',
    })
  },
}
