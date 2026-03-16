import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GeneralSettings from '@/components/settings/GeneralSettings'
import SharePointSettings from '@/components/settings/SharePointSettings'
import AgencySettings from '@/components/settings/AgencySettings'
import PermissionsSettings from '@/components/settings/PermissionsSettings'
import SecuritySettings from '@/components/settings/SecuritySettings'

const Settings = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie o perfil da imobiliária, acessos, integrações Microsoft 365 e segurança.
        </p>
      </div>

      <Tabs defaultValue="permissions">
        <TabsList className="mb-4 bg-muted/50 border flex flex-wrap h-auto">
          <TabsTrigger value="permissions">Permissões de Acesso</TabsTrigger>
          <TabsTrigger value="security">Segurança & Auditoria</TabsTrigger>
          <TabsTrigger value="sharepoint">Integração SharePoint</TabsTrigger>
          <TabsTrigger value="agency">Dados da Imobiliária</TabsTrigger>
          <TabsTrigger value="general">Geral & SLA</TabsTrigger>
        </TabsList>
        <TabsContent value="permissions">
          <PermissionsSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="sharepoint">
          <SharePointSettings />
        </TabsContent>
        <TabsContent value="agency">
          <AgencySettings />
        </TabsContent>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
