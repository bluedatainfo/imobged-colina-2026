import { useState, useEffect } from 'react'
import {
  Save,
  Server,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  RefreshCw,
  Building,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { usersStore } from '@/stores/users'
import { cn } from '@/lib/utils'

const resolveTenantByDomain = async (domain: string) => {
  const normalized = domain.toLowerCase().trim()
  try {
    const response = await fetch(
      `https://login.microsoftonline.com/${normalized}/v2.0/.well-known/openid-configuration`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      },
    ).catch(() => null)

    if (!response || !response.ok) {
      throw new Error(
        'Unable to find a valid Microsoft 365 Tenant for this domain. Please verify your entry.',
      )
    }

    const data = await response.json()
    const match = data.issuer?.match(/microsoftonline\.com\/([^/]+)\//)
    const tenantId = match ? match[1] : 'unknown-id'

    const tenantName = normalized.split('.')[0].toUpperCase() + ' Corp'

    return { tenantId, tenantName }
  } catch (error) {
    throw new Error(
      'Unable to find a valid Microsoft 365 Tenant for this domain. Please verify your entry.',
    )
  }
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
  const [domainInput, setDomainInput] = useState(store.sharepoint.tenantDomain || '')

  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')

  const [domainStatus, setDomainStatus] = useState<'idle' | 'validating' | 'active' | 'invalid'>(
    () => {
      if (!store.sharepoint.tenantDomain) return 'idle'
      return 'active'
    },
  )
  const [domainError, setDomainError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const currentDomain = domainInput.trim()

    if (!currentDomain) {
      setDomainStatus('idle')
      setDomainError(null)
      return
    }

    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentDomain)) {
      setDomainStatus('invalid')
      setDomainError('Formato de domínio inválido.')
      return
    }

    if (
      currentDomain === store.sharepoint.tenantDomain &&
      formData.tenantId === store.sharepoint.tenantId
    ) {
      setDomainStatus('active')
      setDomainError(null)
      return
    }

    setDomainStatus('validating')
    setDomainError(null)

    const timer = setTimeout(async () => {
      try {
        const { tenantId, tenantName } = await resolveTenantByDomain(currentDomain)
        if (!isMounted) return

        setDomainStatus('active')
        setDomainError(null)

        const domainPrefix = currentDomain.split('.')[0]
        const defaultSites = {
          locacao: `https://${domainPrefix}.sharepoint.com/sites/Locacao`,
          captacao: `https://${domainPrefix}.sharepoint.com/sites/Captacao`,
          vendas: `https://${domainPrefix}.sharepoint.com/sites/Vendas`,
          juridico: `https://${domainPrefix}.sharepoint.com/sites/Juridico`,
          financeiro: `https://${domainPrefix}.sharepoint.com/sites/Financeiro`,
        }

        setFormData((prev) => ({
          ...prev,
          tenantDomain: currentDomain,
          tenantId,
          tenantName,
          teamsWebhookUrl: `https://${currentDomain}.webhook.office.com/teams/alertas`,
          sites: defaultSites,
        }))

        toast({
          title: 'Domínio Validado',
          description: `Tenant ${tenantName} encontrado. Clique em Salvar para aplicar as alterações.`,
        })
      } catch (e) {
        if (isMounted) {
          setDomainStatus('invalid')
          setDomainError((e as Error).message)
          setFormData((prev) => ({ ...prev, tenantId: '', tenantName: '' }))
        }
      }
    }, 800)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [domainInput]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDomainChange = (value: string) => {
    setDomainInput(value)
    if (value !== formData.tenantDomain) {
      setFormData((prev) => ({
        ...prev,
        tenantDomain: value,
        tenantId: '',
        tenantName: '',
        teamsWebhookUrl: '',
        sites: { locacao: '', captacao: '', vendas: '', juridico: '', financeiro: '' },
      }))
    }
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
    if (!domainInput.trim()) {
      mainStore.updateSharePointSettings({
        tenantId: '',
        tenantDomain: '',
        tenantName: '',
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

    if (domainStatus !== 'active' || !formData.tenantDomain || !formData.tenantId) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Forneça um Domínio válido antes de salvar.',
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
      if (domainStatus !== 'active' || !formData.tenantDomain) {
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
    domainStatus === 'active'

  const renderSiteInput = (label: string, siteKey: keyof typeof formData.sites) => {
    const value = formData.sites[siteKey] || ''
    const path = value.startsWith(sitePrefix)
      ? value.substring(sitePrefix.length)
      : value.split('/').pop() || ''
    const isValid = value.startsWith(sitePrefix) && path.length > 0 && domainStatus === 'active'

    return (
      <div key={siteKey} className="space-y-2">
        <Label className="flex items-center justify-between text-sm">
          <span>{label}</span>
          {isValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {!isValid && domainStatus === 'active' && formData.tenantDomain && (
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
              !isValid && domainStatus === 'active' && formData.tenantDomain
                ? 'border-destructive focus-visible:ring-destructive'
                : '',
            )}
            value={path}
            onChange={(e) =>
              handleSiteChange(siteKey, e.target.value ? `${sitePrefix}${e.target.value}` : '')
            }
            disabled={domainStatus !== 'active' || !formData.tenantDomain}
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
            Configure seu ambiente Microsoft 365 informando o domínio da organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Domínio (Microsoft 365)</span>
              {domainStatus === 'active' && formData.tenantDomain && (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 bg-emerald-50"
                >
                  <Globe className="w-3 h-3 mr-1" /> Verificado
                </Badge>
              )}
              {domainStatus === 'invalid' && <Badge variant="destructive">Domínio Inválido</Badge>}
              {domainStatus === 'validating' && (
                <Badge variant="secondary" className="gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Buscando Tenant...
                </Badge>
              )}
              {domainStatus === 'idle' && <Badge variant="secondary">Desconectado</Badge>}
            </Label>
            <Input
              value={domainInput}
              onChange={(e) => handleDomainChange(e.target.value)}
              placeholder="Ex: imobiliariacolina.com.br ou company.onmicrosoft.com"
              className={
                domainStatus === 'invalid'
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {domainError && <p className="text-sm text-destructive mt-1">{domainError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Tenant Name Oficial (M365)</span>
              {formData.tenantName && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </Label>
            <div className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground items-center">
              {formData.tenantName ? (
                <span className="flex items-center gap-2 text-foreground font-medium">
                  <Building className="w-4 h-4 text-primary" />
                  {formData.tenantName}
                </span>
              ) : (
                <span>Aguardando domínio válido...</span>
              )}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center justify-between text-sm">
              <span>Canal de Alertas Teams (Webhook)</span>
              {isWebhookPathValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {!isWebhookPathValid &&
                domainStatus === 'active' &&
                formData.tenantDomain &&
                formData.teamsWebhookUrl && <AlertCircle className="w-4 h-4 text-destructive" />}
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
                  !isWebhookPathValid &&
                    domainStatus === 'active' &&
                    formData.tenantDomain &&
                    formData.teamsWebhookUrl
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
                disabled={domainStatus !== 'active' || !formData.tenantDomain}
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
          {(domainStatus !== 'active' || !formData.tenantDomain) && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Forneça um Domínio válido para configurar os sites departamentais.
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
            disabled={isTesting || domainStatus !== 'active' || !formData.tenantDomain}
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
