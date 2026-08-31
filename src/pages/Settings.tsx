import { lazy, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Lazy loading large components to prevent build memory issues
const GeneralSettings = lazy(() => import('@/components/settings/GeneralSettings'))
const SharePointSettings = lazy(() => import('@/components/settings/SharePointSettings'))
const AgencySettings = lazy(() => import('@/components/settings/AgencySettings'))
const PermissionsSettings = lazy(() => import('@/components/settings/PermissionsSettings'))
const SecuritySettings = lazy(() => import('@/components/settings/SecuritySettings'))
const SharePointMapping = lazy(() => import('@/components/settings/SharePointMapping'))
const ModulesSettings = lazy(() => import('@/components/settings/ModulesSettings'))
const MenuOrder = lazy(() => import('@/components/settings/MenuOrder'))
const DataCleanupSettings = lazy(() => import('@/components/settings/DataCleanupSettings'))

const SettingsFallback = () => (
  <div className="flex h-32 w-full items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
)

const Settings = () => {
  const { user } = useAuth()
  const isAdmin = user?.role?.toLowerCase().includes('admin') || user?.role === 'Gerência'

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
          {isAdmin && <TabsTrigger value="modules">Módulos</TabsTrigger>}
          <TabsTrigger value="permissions">Permissões de Acesso</TabsTrigger>
          <TabsTrigger value="security">Segurança & Auditoria</TabsTrigger>
          <TabsTrigger value="sharepoint">Integração SharePoint</TabsTrigger>
          <TabsTrigger value="ged-mapping">Mapeamento GED</TabsTrigger>
          <TabsTrigger value="agency">Dados da Imobiliária</TabsTrigger>
          <TabsTrigger value="general">Geral & SLA</TabsTrigger>
          {isAdmin && <TabsTrigger value="menu-order">Ordenação do Menu</TabsTrigger>}
          {isAdmin && (
            <TabsTrigger
              value="data-cleanup"
              className="text-destructive data-[state=active]:text-destructive"
            >
              Limpeza de Dados
            </TabsTrigger>
          )}
        </TabsList>
        <Suspense fallback={<SettingsFallback />}>
          {isAdmin && (
            <TabsContent value="modules">
              <ModulesSettings />
            </TabsContent>
          )}
          <TabsContent value="permissions">
            <PermissionsSettings />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="sharepoint">
            <SharePointSettings />
          </TabsContent>
          <TabsContent value="ged-mapping">
            <SharePointMapping />
          </TabsContent>
          <TabsContent value="agency">
            <AgencySettings />
          </TabsContent>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="menu-order">
              <MenuOrder />
            </TabsContent>
          )}
          {isAdmin && (
            <TabsContent value="data-cleanup">
              <DataCleanupSettings />
            </TabsContent>
          )}
        </Suspense>
      </Tabs>
    </div>
  )
}

export default Settings
