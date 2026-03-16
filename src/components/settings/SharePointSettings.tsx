import { useState, useEffect } from 'react'
import {
  Save,
  Database,
  Server,
  Link,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { usersStore } from '@/stores/users'

const getDomainFromTenant = (tenantId: string) => {
  if (!tenantId) return ''
  if (tenantId === 'a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d') return 'imobged.com'
  const cleanId = tenantId.replace(/[^a-f0-9]/gi, '')
  return `tenant-${cleanId.substring(0, 6)}.com`
}

export default function SharePointSettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.sharepoint)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')
  const [tenantStatus, setTenantStatus] = useState<'idle' | 'validating' | 'active' | 'invalid'>(
    'idle',
  )
  const [tenantIdError, setTenantIdError] = useState<string | null>(null)

  const isValidTenantId = (id: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!formData.tenantId || !formData.tenantId.trim()) {
        setTenantStatus('idle')
        setTenantIdError(null)
        return
      }

      setTenantStatus('validating')
      setTimeout(() => {
        if (isValidTenantId(formData.tenantId.trim())) {
          setTenantStatus('active')
          setTenantIdError(null)

          const resolvedDomain = getDomainFromTenant(formData.tenantId.trim())
          if (resolvedDomain !== formData.tenantDomain) {
            setFormData((prev) => ({
              ...prev,
              tenantDomain: resolvedDomain,
              teamsWebhookUrl: '', // Clear path on domain change to prevent leaks
            }))
            toast({
              title: 'Novo Domínio Identificado',
              description: `O domínio ${resolvedDomain} foi vinculado ao Tenant.`,
            })
          }
        } else {
          setTenantStatus('invalid')
          setTenantIdError(
            'Formato inválido. Insira um ID de locatário (Tenant ID) válido do Microsoft Entra ID.',
          )
        }
      }, 600)
    }, 500)

    return () => clearTimeout(handler)
  }, [formData.tenantId, toast])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSiteChange = (field: keyof typeof formData.sites, value: string) => {
    setFormData((prev) => ({ ...prev, sites: { ...prev.sites, [field]: value } }))
  }

  const handleLibraryChange = (field: keyof typeof formData.libraries, value: string) => {
    setFormData((prev) => ({ ...prev, libraries: { ...prev.libraries, [field]: value } }))
  }

  const handleSave = () => {
    if (tenantStatus === 'invalid' || !formData.tenantId?.trim()) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Forneça um Tenant ID válido antes de salvar.',
      })
      return
    }

    const domainChanged = formData.tenantDomain !== store.sharepoint.tenantDomain

    mainStore.updateSharePointSettings(formData)

    if (domainChanged && formData.tenantDomain) {
      // Clear dependent fields globally
      mainStore.updateSettings({
        managementEmails: '',
        administrativeEmails: '',
        operationalEmails: '',
      })
      usersStore.enforceDomain(formData.tenantDomain)
      toast({
        title: 'Integração Salva & Sincronizada',
        description: `Dados atualizados e permissões restritas para @${formData.tenantDomain}`,
      })
    } else {
      toast({
        title: 'Integração SharePoint Salva',
        description: 'Mapeamento de sites e configurações atualizados.',
      })
    }
  }

  const testConnection = () => {
    setIsTesting(true)
    setTestResult('idle')
    setTimeout(() => {
      setIsTesting(false)
      const allSitesValid = Object.values(formData.sites).every(
        (url) => url && url.startsWith('http'),
      )
      setTestResult(allSitesValid && tenantStatus === 'active' ? 'success' : 'error')
    }, 2000)
  }

  const domainPrefix = `https://${formData.tenantDomain || 'dominio'}.webhook.office.com/teams/`
  const webhookPath = formData.teamsWebhookUrl?.startsWith(domainPrefix)
    ? formData.teamsWebhookUrl.replace(domainPrefix, '')
    : formData.teamsWebhookUrl || ''

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
            <Label className="flex items-center justify-between">
              <span>Tenant ID (Microsoft Entra ID)</span>
              {tenantStatus === 'active' && formData.tenantDomain && (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 bg-emerald-50"
                >
                  <Globe className="w-3 h-3 mr-1" /> Vinculado: {formData.tenantDomain}
                </Badge>
              )}
              {tenantStatus === 'invalid' && <Badge variant="destructive">Tenant Inválido</Badge>}
              {tenantStatus === 'validating' && <Badge variant="secondary">Verificando...</Badge>}
              {tenantStatus === 'idle' && <Badge variant="secondary">Desconectado</Badge>}
            </Label>
            <Input
              value={formData.tenantId}
              onChange={(e) => handleChange('tenantId', e.target.value)}
              placeholder="Ex: a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d"
              className={
                tenantStatus === 'invalid'
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {tenantIdError && <p className="text-sm text-destructive mt-1">{tenantIdError}</p>}
          </div>

          <div className="space-y-2">
            <Label>Canal de Alertas Teams (Webhook)</Label>
            <div className="flex w-full">
              <span
                className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-[220px]"
                title={domainPrefix}
              >
                {domainPrefix}
              </span>
              <Input
                className="rounded-l-none font-mono text-sm"
                value={webhookPath}
                onChange={(e) =>
                  handleChange('teamsWebhookUrl', `${domainPrefix}${e.target.value}`)
                }
                placeholder="id-do-canal-xyz"
                disabled={tenantStatus !== 'active'}
              />
            </div>
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
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/50 p-4 rounded-lg border gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="outline" onClick={testConnection} disabled={isTesting}>
            {isTesting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}{' '}
            Testar Conexão Multi-Site
          </Button>
          {testResult === 'success' && (
            <span className="flex items-center text-sm text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Conexão com Sites e Tenant OK
            </span>
          )}
          {testResult === 'error' && (
            <span className="flex items-center text-sm text-destructive font-medium">
              <AlertCircle className="w-4 h-4 mr-1" /> Falha na conexão de sites ou Tenant ID
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
