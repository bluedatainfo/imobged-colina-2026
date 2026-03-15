import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GeneralSettings from '@/components/settings/GeneralSettings'
import SharePointSettings from '@/components/settings/SharePointSettings'
import AgencySettings from '@/components/settings/AgencySettings'

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie o perfil da imobiliária, integrações Microsoft 365 e regras de aprovação.
        </p>
      </div>

      <Tabs defaultValue="agency">
        <TabsList className="mb-4 bg-muted/50 border flex flex-wrap h-auto">
          <TabsTrigger value="agency">Dados da Imobiliária</TabsTrigger>
          <TabsTrigger value="sharepoint">Integração SharePoint</TabsTrigger>
          <TabsTrigger value="general">Geral & SLA</TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencySettings />
        </TabsContent>
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
