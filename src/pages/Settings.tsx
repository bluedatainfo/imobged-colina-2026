import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GeneralSettings from '@/components/settings/GeneralSettings'
import SharePointSettings from '@/components/settings/SharePointSettings'

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie contas do Microsoft 365, permissões de SharePoint e regras de aprovação SLA.
        </p>
      </div>

      <Tabs defaultValue="sharepoint">
        <TabsList className="mb-4 bg-muted/50 border">
          <TabsTrigger value="general">Geral & SLA</TabsTrigger>
          <TabsTrigger value="sharepoint">Integração SharePoint</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="sharepoint">
          <SharePointSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
