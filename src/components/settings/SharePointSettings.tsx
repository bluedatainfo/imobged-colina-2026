import { useState } from 'react'
import {
  Save,
  Database,
  Server,
  Link,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'

export default function SharePointSettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.sharepoint)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSiteChange = (field: keyof typeof formData.sites, value: string) => {
    setFormData((prev) => ({ ...prev, sites: { ...prev.sites, [field]: value } }))
  }

  const handleLibraryChange = (field: keyof typeof formData.libraries, value: string) => {
    setFormData((prev) => ({ ...prev, libraries: { ...prev.libraries, [field]: value } }))
  }

  const handleListChange = (field: keyof typeof formData.lists, value: string) => {
    setFormData((prev) => ({ ...prev, lists: { ...prev.lists, [field]: value } }))
  }

  const handleSave = () => {
    mainStore.updateSharePointSettings(formData)
    toast({
      title: 'Integração SharePoint Salva',
      description: 'Mapeamento de sites departamentais, bibliotecas e Webhooks atualizados.',
    })
  }

  const testConnection = () => {
    setIsTesting(true)
    setTestResult('idle')
    setTimeout(() => {
      setIsTesting(false)
      const allSitesValid = Object.values(formData.sites).every(
        (url) => url && url.startsWith('http'),
      )
      setTestResult(allSitesValid && formData.tenantId ? 'success' : 'error')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" /> Conexão M365 & Tenant
          </CardTitle>
          <CardDescription>
            Parâmetros principais do Tenant e credenciais via Microsoft Graph API.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tenant ID</Label>
            <Input value={formData.tenantId} readOnly className="bg-muted text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label>Canal de Alertas Teams (Webhook)</Label>
            <Input
              value={formData.teamsWebhookUrl || ''}
              onChange={(e) => handleChange('teamsWebhookUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> Mapeamento de Sites Departamentais
          </CardTitle>
          <CardDescription>
            Conecte os ambientes específicos para governança isolada por setor.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label>Gestão de Locação (Site URL)</Label>
            <Input
              value={formData.sites.locacao}
              onChange={(e) => handleSiteChange('locacao', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Vendas (Site URL)</Label>
            <Input
              value={formData.sites.vendas}
              onChange={(e) => handleSiteChange('vendas', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Captação de Imóveis (Site URL)</Label>
            <Input
              value={formData.sites.captacao}
              onChange={(e) => handleSiteChange('captacao', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Jurídico (Site URL)</Label>
            <Input
              value={formData.sites.juridico}
              onChange={(e) => handleSiteChange('juridico', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Financeiro (Site URL)</Label>
            <Input
              value={formData.sites.financeiro}
              onChange={(e) => handleSiteChange('financeiro', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" /> Bibliotecas Padrão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Templates DOCX Base</Label>
              <Input
                value={formData.libraries.templates}
                onChange={(e) => handleLibraryChange('templates', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Contratos em Elaboração</Label>
              <Input
                value={formData.libraries.contracts}
                onChange={(e) => handleLibraryChange('contracts', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Arquivo Permanente (Ativos)</Label>
              <Input
                value={formData.libraries.archive}
                onChange={(e) => handleLibraryChange('archive', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" /> Listas SharePoint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Controle de Processos</Label>
              <Input
                value={formData.lists.processControl}
                onChange={(e) => handleListChange('processControl', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Audit Log (Trilha)</Label>
              <Input
                value={formData.lists.auditLog}
                onChange={(e) => handleListChange('auditLog', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/50 p-4 rounded-lg border gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="outline" onClick={testConnection} disabled={isTesting}>
            {isTesting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Link className="w-4 h-4 mr-2" />
            )}{' '}
            Testar Conexão Multi-Site
          </Button>
          {testResult === 'success' && (
            <span className="flex items-center text-sm text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Todos os 5 sites OK
            </span>
          )}
          {testResult === 'error' && (
            <span className="flex items-center text-sm text-destructive font-medium">
              <AlertCircle className="w-4 h-4 mr-1" /> Falha na conexão de sites
            </span>
          )}
        </div>
        <Button onClick={handleSave} className="gap-2 w-full sm:w-auto">
          <Save className="w-4 h-4" /> Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
