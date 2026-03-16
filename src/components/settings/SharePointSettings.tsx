import { useState, useEffect } from 'react'
import { Save, Server, Loader2, CheckCircle2, AlertCircle, Globe, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { usersStore } from '@/stores/users'
import { cn } from '@/lib/utils'

const getDomainFromTenant = (tenantId: string) => {
  if (!tenantId) return ''
  if (tenantId === 'a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d') return 'imobged.com'
  const cleanId = tenantId.replace(/[^a-f0-9]/gi, '')
  return `tenant-${cleanId.substring(0, 6)}.com`
}

const isValidTenantId = (id: string) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
}

export default function SharePointSettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.sharepoint)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')
  const [tenantStatus, setTenantStatus] = useState<'idle' | 'validating' | 'active' | 'invalid'>(
    () => (isValidTenantId(store.sharepoint.tenantId) ? 'active' : 'idle'),
  )
  const [tenantIdError, setTenantIdError] = useState<string | null>(null)

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

          setFormData((prev) => {
            if (resolvedDomain !== prev.tenantDomain) {
              const newPrefix = `https://${resolvedDomain.split('.')[0]}.sharepoint.com/sites/`
              const updatedSites = { ...prev.sites }

              Object.keys(updatedSites).forEach((k) => {
                const key = k as keyof typeof updatedSites
                const path = updatedSites[key].split('/').pop() || ''
                updatedSites[key] = path ? `${newPrefix}${path}` : ''
              })

              setTimeout(() => {
                toast({
                  title: 'Novo Domínio Identificado',
                  description: `O domínio ${resolvedDomain} foi vinculado ao Tenant e os sites foram atualizados.`,
                })
              }, 0)

              return {
                ...prev,
                tenantDomain: resolvedDomain,
                teamsWebhookUrl: '', // Clear path on domain change to prevent leaks
                sites: updatedSites,
              }
            }
            return prev
          })
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

  const handleSave = () => {
    if (tenantStatus === 'invalid' || !formData.tenantId?.trim()) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Forneça um Tenant ID válido antes de salvar.',
      })
      return
    }

    const sitePrefix = `https://${formData.tenantDomain.split('.')[0]}.sharepoint.com/sites/`
    const allSitesValid = Object.values(formData.sites).every(
      (url) => url && url.startsWith(sitePrefix),
    )

    if (!allSitesValid) {
      toast({
        variant: 'destructive',
        title: 'Mapeamento Inválido',
        description:
          'Verifique se todos os sites departamentais estão preenchidos corretamente para o domínio atual.',
      })
      return
    }

    const domainChanged = formData.tenantDomain !== store.sharepoint.tenantDomain

    mainStore.updateSharePointSettings(formData)

    if (domainChanged && formData.tenantDomain) {
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
      const sitePrefix = `https://${formData.tenantDomain.split('.')[0]}.sharepoint.com/sites/`
      const allSitesValid = Object.values(formData.sites).every(
        (url) => url && url.startsWith(sitePrefix),
      )
      setTestResult(allSitesValid && tenantStatus === 'active' ? 'success' : 'error')
    }, 2000)
  }

  const domainPrefix = `https://${formData.tenantDomain || 'dominio'}.webhook.office.com/teams/`
  const webhookPath = formData.teamsWebhookUrl?.startsWith(domainPrefix)
    ? formData.teamsWebhookUrl.replace(domainPrefix, '')
    : formData.teamsWebhookUrl || ''

  const sitePrefix = `https://${(formData.tenantDomain || 'dominio').split('.')[0]}.sharepoint.com/sites/`

  const renderSiteInput = (label: string, siteKey: keyof typeof formData.sites) => {
    const value = formData.sites[siteKey]
    const path = value?.startsWith(sitePrefix)
      ? value.substring(sitePrefix.length)
      : value
        ? value.split('/').pop() || ''
        : ''
    const isValid = value?.startsWith(sitePrefix) && path.length > 0 && tenantStatus === 'active'

    return (
      <div className="space-y-2">
        <Label className="flex items-center justify-between text-sm">
          <span>{label}</span>
          {isValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {!isValid && tenantStatus === 'active' && (
            <AlertCircle className="w-4 h-4 text-destructive" />
          )}
        </Label>
        <div className="flex w-full">
          <span
            className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px] sm:max-w-[200px]"
            title={sitePrefix}
          >
            {sitePrefix}
          </span>
          <Input
            className={cn(
              'rounded-l-none font-mono text-sm',
              !isValid && tenantStatus === 'active'
                ? 'border-destructive focus-visible:ring-destructive'
                : '',
            )}
            value={path}
            onChange={(e) =>
              handleSiteChange(siteKey, e.target.value ? `${sitePrefix}${e.target.value}` : '')
            }
            disabled={tenantStatus !== 'active'}
            placeholder="nome-do-setor"
          />
        </div>
        {!isValid && tenantStatus === 'active' && path.length === 0 && (
          <p className="text-xs text-destructive mt-1">O nome do site é obrigatório.</p>
        )}
        {!isValid &&
          tenantStatus === 'active' &&
          path.length > 0 &&
          !value.startsWith(sitePrefix) && (
            <p className="text-xs text-destructive mt-1">Domínio incompatível. Atualize o campo.</p>
          )}
      </div>
    )
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
                  handleChange(
                    'teamsWebhookUrl',
                    e.target.value ? `${domainPrefix}${e.target.value}` : '',
                  )
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
        <CardContent className="space-y-4">
          {tenantStatus !== 'active' && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Forneça um Tenant ID válido para configurar os sites departamentais.
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
            {renderSiteInput('Gestão de Locação (Site URL)', 'locacao')}
            {renderSiteInput('Vendas (Site URL)', 'vendas')}
            {renderSiteInput('Captação de Imóveis (Site URL)', 'captacao')}
            {renderSiteInput('Jurídico (Site URL)', 'juridico')}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/50 p-4 rounded-lg border gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={isTesting || tenantStatus !== 'active'}
          >
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
