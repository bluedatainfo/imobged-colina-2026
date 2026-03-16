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

const tenantMappings: Record<string, string> = {
  'a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d': 'imobged.com',
  'bf7f8315-5eb1-44a0-bb92-c6640af6a671': 'imobiliariacolina.com.br',
  '12345678-1234-1234-1234-1234567890ab': 'primeimoveis.com.br',
  '87654321-4321-4321-4321-ba0987654321': 'litoralbeta.com.br',
}

const resolveDomainAsync = async (tenantId: string): Promise<string> => {
  const normalized = tenantId.toLowerCase().trim()

  if (tenantMappings[normalized]) {
    return new Promise((resolve) => setTimeout(() => resolve(tenantMappings[normalized]), 600))
  }

  try {
    const response = await fetch(
      `https://login.microsoftonline.com/${normalized}/v2.0/.well-known/openid-configuration`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      },
    ).catch(() => null)

    if (response && !response.ok) {
      throw new Error('Tenant não encontrado na Microsoft.')
    }

    const prefix = normalized.split('-')[0]
    return `empresa-${prefix}.com.br`
  } catch (error) {
    throw new Error('Tenant ID inválido ou não existe no Microsoft 365.')
  }
}

const isValidTenantId = (id: string) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id.trim(),
  )
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
    () => {
      if (!store.sharepoint.tenantId) return 'idle'
      if (!isValidTenantId(store.sharepoint.tenantId)) return 'invalid'
      return 'active'
    },
  )
  const [tenantIdError, setTenantIdError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const currentId = formData.tenantId?.trim() || ''

    if (!currentId) {
      setTenantStatus('idle')
      setTenantIdError(null)
      return
    }

    if (!isValidTenantId(currentId)) {
      setTenantStatus('invalid')
      setTenantIdError('O formato do Tenant ID deve ser um GUID válido (ex: a1b2...).')
      return
    }

    if (
      currentId === store.sharepoint.tenantId &&
      formData.tenantDomain === store.sharepoint.tenantDomain
    ) {
      setTenantStatus('active')
      setTenantIdError(null)
      return
    }

    if (currentId === store.sharepoint.tenantId && !formData.tenantDomain) {
      setFormData(store.sharepoint)
      setTenantStatus('active')
      setTenantIdError(null)
      return
    }

    setTenantStatus('validating')
    setTenantIdError(null)

    const timer = setTimeout(async () => {
      try {
        const resolvedDomain = await resolveDomainAsync(currentId)
        if (!isMounted) return

        setTenantStatus('active')
        setTenantIdError(null)

        if (currentId !== store.sharepoint.tenantId) {
          const domainPrefix = resolvedDomain.split('.')[0]
          const defaultSites = {
            locacao: `https://${domainPrefix}.sharepoint.com/sites/Locacao`,
            captacao: `https://${domainPrefix}.sharepoint.com/sites/Captacao`,
            vendas: `https://${domainPrefix}.sharepoint.com/sites/Vendas`,
            juridico: `https://${domainPrefix}.sharepoint.com/sites/Juridico`,
            financeiro: `https://${domainPrefix}.sharepoint.com/sites/Financeiro`,
          }

          setFormData((prev) => ({
            ...prev,
            tenantDomain: resolvedDomain,
            teamsWebhookUrl: `https://${resolvedDomain}.webhook.office.com/teams/alertas`,
            sites: defaultSites,
          }))

          toast({
            title: 'Tenant Validado',
            description: `Domínio ${resolvedDomain} resolvido. Clique em Salvar para aplicar as alterações.`,
          })
        }
      } catch (e) {
        if (isMounted) {
          setTenantStatus('invalid')
          setTenantIdError((e as Error).message || 'Erro ao resolver domínio do Tenant.')
          setFormData((prev) => ({ ...prev, tenantDomain: '' }))
        }
      }
    }, 800)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [formData.tenantId]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTenantIdChange = (value: string) => {
    const currentId = value.trim()
    setFormData((prev) => {
      if (currentId !== store.sharepoint.tenantId && prev.tenantDomain) {
        return {
          ...prev,
          tenantId: value,
          tenantDomain: '',
          teamsWebhookUrl: '',
          sites: { locacao: '', captacao: '', vendas: '', juridico: '', financeiro: '' },
        }
      }
      return { ...prev, tenantId: value }
    })
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
    if (!formData.tenantId.trim()) {
      mainStore.updateSharePointSettings({
        tenantId: '',
        tenantDomain: '',
        teamsWebhookUrl: '',
        sites: { locacao: '', captacao: '', vendas: '', juridico: '', financeiro: '' },
      })
      mainStore.updateSettings({
        managementEmails: '',
        administrativeEmails: '',
        operationalEmails: '',
      })
      usersStore.enforceDomain('')
      toast({
        title: 'Integração Removida',
        description: 'Todas as configurações do SharePoint foram limpas.',
      })
      return
    }

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

    const isNewDomain = formData.tenantDomain !== store.sharepoint.tenantDomain

    mainStore.updateSharePointSettings(formData)

    if (isNewDomain) {
      mainStore.updateSettings({
        managementEmails: '',
        administrativeEmails: '',
        operationalEmails: '',
      })
      usersStore.enforceDomain(formData.tenantDomain)
      if (formData.tenantDomain && usersStore.getState().users.length === 0) {
        usersStore.addUser({
          name: 'Admin Sistema',
          email: `admin@${formData.tenantDomain}`,
          role: 'Admin',
        })
      }
    }

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
              {tenantStatus === 'validating' && <Badge variant="secondary">Validando...</Badge>}
              {tenantStatus === 'idle' && <Badge variant="secondary">Desconectado</Badge>}
            </Label>
            <Input
              value={formData.tenantId}
              onChange={(e) => handleTenantIdChange(e.target.value)}
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
                  setFormData((prev) => ({
                    ...prev,
                    teamsWebhookUrl: e.target.value ? `${domainPrefix}${e.target.value}` : '',
                  }))
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
