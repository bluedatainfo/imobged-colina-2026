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

const mockDomains = [
  'imobged.com',
  'imobiliariacolina.com.br',
  'primeimoveis.com.br',
  'litoralbeta.com.br',
  'sullocacoes.com',
  'imoveisgold.com.br',
  'alugacerto.com',
  'hausimoveis.com.br',
  'nacionalimobiliaria.com',
  'urbanalocacoes.com.br',
]

const resolveDomainAsync = async (tenantId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalized = tenantId.toLowerCase().trim()
      if (normalized === 'a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d') return resolve('imobged.com')
      if (normalized === 'bf7f8315-5eb1-44a0-bb92-c6640af6a671')
        return resolve('imobiliariacolina.com.br')

      let hash = 0
      for (let i = 0; i < normalized.length; i++) {
        hash = normalized.charCodeAt(i) + ((hash << 5) - hash)
      }
      resolve(mockDomains[Math.abs(hash) % mockDomains.length])
    }, 800)
  })
}

const isValidTenantId = (id: string) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
}

const SITES = [
  { key: 'locacao', label: 'Gestão de Locação (Site URL)' },
  { key: 'vendas', label: 'Vendas (Site URL)' },
  { key: 'captacao', label: 'Captação de Imóveis (Site URL)' },
  { key: 'juridico', label: 'Jurídico (Site URL)' },
  { key: 'financeiro', label: 'Financeiro (Site URL)' },
] as const

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
    let isMounted = true
    const currentId = formData.tenantId?.trim() || ''

    if (!currentId) {
      setTenantStatus('idle')
      setTenantIdError(null)
      if (store.sharepoint.tenantDomain) {
        const emptySites = { locacao: '', captacao: '', vendas: '', juridico: '', financeiro: '' }
        mainStore.updateSharePointSettings({
          tenantId: '',
          tenantDomain: '',
          teamsWebhookUrl: '',
          sites: emptySites,
        })
        mainStore.updateSettings({
          managementEmails: '',
          administrativeEmails: '',
          operationalEmails: '',
        })
        usersStore.enforceDomain('')
        setFormData((prev) => ({
          ...prev,
          tenantDomain: '',
          teamsWebhookUrl: '',
          sites: emptySites,
        }))
        toast({
          title: 'Tenant Removido',
          description: 'Configurações vinculadas ao domínio foram limpas.',
        })
      }
      return
    }

    if (!isValidTenantId(currentId)) {
      setTenantStatus('invalid')
      setTenantIdError('Insira um ID de locatário (Tenant ID) válido.')
      return
    }

    setTenantStatus('validating')
    setTenantIdError(null)

    const timer = setTimeout(async () => {
      try {
        const resolvedDomain = await resolveDomainAsync(currentId)
        if (!isMounted) return

        setTenantStatus('active')

        if (currentId !== store.sharepoint.tenantId) {
          const newPrefix = `https://${resolvedDomain.split('.')[0]}.sharepoint.com/sites/`
          const updatedSites = { ...formData.sites }

          Object.keys(updatedSites).forEach((k) => {
            const key = k as keyof typeof updatedSites
            const path = (updatedSites[key] || '').split('/').pop() || ''
            updatedSites[key] = path ? `${newPrefix}${path}` : ''
          })

          const newSettings = {
            tenantId: currentId,
            tenantDomain: resolvedDomain,
            teamsWebhookUrl: '',
            sites: updatedSites,
          }

          setFormData((prev) => ({ ...prev, ...newSettings }))
          mainStore.updateSharePointSettings(newSettings)
          mainStore.updateSettings({
            managementEmails: '',
            administrativeEmails: '',
            operationalEmails: '',
          })
          usersStore.enforceDomain(resolvedDomain)

          toast({
            title: 'Novo Domínio Vinculado',
            description: `Domínio ${resolvedDomain} detectado. Configurações sincronizadas.`,
          })
        }
      } catch (e) {
        if (isMounted) {
          setTenantStatus('invalid')
          setTenantIdError('Erro ao resolver domínio do Tenant.')
        }
      }
    }, 600)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [formData.tenantId]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSiteChange = (field: keyof typeof formData.sites, value: string) => {
    setFormData((prev) => ({ ...prev, sites: { ...prev.sites, [field]: value } }))
  }

  const sitePrefix = formData.tenantDomain
    ? `https://${formData.tenantDomain.split('.')[0]}.sharepoint.com/sites/`
    : 'https://dominio.sharepoint.com/sites/'

  const domainPrefix = formData.tenantDomain
    ? `https://${formData.tenantDomain}.webhook.office.com/teams/`
    : 'https://dominio.webhook.office.com/teams/'

  const handleSave = () => {
    if (tenantStatus !== 'active' || !formData.tenantDomain) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Forneça um Tenant ID válido antes de salvar.',
      })
      return
    }

    const allSitesValid = Object.values(formData.sites).every(
      (url) => url && url.startsWith(sitePrefix),
    )
    const isWebhookValid =
      !formData.teamsWebhookUrl || formData.teamsWebhookUrl.startsWith(domainPrefix)

    if (!allSitesValid || !isWebhookValid) {
      toast({
        variant: 'destructive',
        title: 'Mapeamento Inválido',
        description:
          'Verifique se os sites departamentais e o Webhook estão preenchidos corretamente para o domínio atual.',
      })
      return
    }

    mainStore.updateSharePointSettings(formData)
    toast({
      title: 'Integração SharePoint Salva',
      description: 'Mapeamento de sites e configurações atualizados.',
    })
  }

  const testConnection = () => {
    setIsTesting(true)
    setTestResult('idle')
    setTimeout(() => {
      setIsTesting(false)
      if (tenantStatus !== 'active' || !formData.tenantDomain) {
        setTestResult('error')
        return
      }
      const allSitesValid = Object.values(formData.sites).every(
        (url) => url && url.startsWith(sitePrefix),
      )
      const isWebhookValid =
        !formData.teamsWebhookUrl || formData.teamsWebhookUrl.startsWith(domainPrefix)

      setTestResult(allSitesValid && isWebhookValid ? 'success' : 'error')
    }, 1500)
  }

  const webhookPath = formData.teamsWebhookUrl?.startsWith(domainPrefix)
    ? formData.teamsWebhookUrl.substring(domainPrefix.length)
    : formData.teamsWebhookUrl || ''

  const isWebhookPathValid =
    formData.teamsWebhookUrl?.startsWith(domainPrefix) &&
    webhookPath.length > 0 &&
    tenantStatus === 'active'

  const renderSiteInput = (label: string, siteKey: keyof typeof formData.sites) => {
    const value = formData.sites[siteKey] || ''
    const path = value.startsWith(sitePrefix)
      ? value.substring(sitePrefix.length)
      : value.split('/').pop() || ''
    const isValid = value.startsWith(sitePrefix) && path.length > 0 && tenantStatus === 'active'

    return (
      <div key={siteKey} className="space-y-2">
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
            disabled={tenantStatus !== 'active' || !formData.tenantDomain}
            placeholder="nome-do-setor"
          />
        </div>
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
        <CardContent className="grid md:grid-cols-2 gap-6">
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
              {tenantStatus === 'validating' && <Badge variant="secondary">Resolvendo...</Badge>}
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
            <Label className="flex items-center justify-between text-sm">
              <span>Canal de Alertas Teams (Webhook)</span>
              {isWebhookPathValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {!isWebhookPathValid && tenantStatus === 'active' && formData.teamsWebhookUrl && (
                <AlertCircle className="w-4 h-4 text-destructive" />
              )}
            </Label>
            <div className="flex w-full">
              <span
                className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]"
                title={domainPrefix}
              >
                {domainPrefix}
              </span>
              <Input
                className={cn(
                  'rounded-l-none font-mono text-sm',
                  !isWebhookPathValid && tenantStatus === 'active' && formData.teamsWebhookUrl
                    ? 'border-destructive focus-visible:ring-destructive'
                    : '',
                )}
                value={webhookPath}
                onChange={(e) =>
                  handleChange(
                    'teamsWebhookUrl',
                    e.target.value ? `${domainPrefix}${e.target.value}` : '',
                  )
                }
                placeholder="id-do-canal"
                disabled={tenantStatus !== 'active' || !formData.tenantDomain}
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
            {SITES.map((site) => renderSiteInput(site.label, site.key))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/50 p-4 rounded-lg border gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={isTesting || tenantStatus !== 'active' || !formData.tenantDomain}
          >
            {isTesting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}{' '}
            Testar Conexões
          </Button>
          {testResult === 'success' && (
            <span className="flex items-center text-sm text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Endpoints validados com sucesso
            </span>
          )}
          {testResult === 'error' && (
            <span className="flex items-center text-sm text-destructive font-medium">
              <AlertCircle className="w-4 h-4 mr-1" /> Falha na validação dos endpoints
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
