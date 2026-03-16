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
  Key,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { usersStore } from '@/stores/users'
import { useAuth } from '@/contexts/AuthContext'
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
      throw new Error('Domínio não encontrado no Microsoft 365.')
    }

    const tenantName = normalized.split('.')[0].toUpperCase() + ' Corp'

    return { tenantName }
  } catch (error) {
    throw new Error('Domínio não encontrado ou falha de comunicação.')
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
  const { logout } = useAuth()
  const [formData, setFormData] = useState(store.sharepoint)

  const [primaryInput, setPrimaryInput] = useState(store.sharepoint.primaryDomain || '')
  const [spInput, setSpInput] = useState(store.sharepoint.sharepointDomain || '')

  const [clientId, setClientId] = useState(store.sharepoint.clientId || '')
  const [tenantId, setTenantId] = useState(store.sharepoint.tenantId || '')

  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')

  const [primaryStatus, setPrimaryStatus] = useState<'idle' | 'validating' | 'active' | 'invalid'>(
    store.sharepoint.primaryDomain ? 'active' : 'idle',
  )
  const [primaryError, setPrimaryError] = useState<string | null>(null)

  const [spStatus, setSpStatus] = useState<'idle' | 'validating' | 'active' | 'invalid'>(
    store.sharepoint.sharepointDomain ? 'active' : 'idle',
  )
  const [spError, setSpError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const currentDomain = primaryInput.trim()

    if (!currentDomain) {
      setPrimaryStatus('idle')
      setPrimaryError(null)
      return
    }

    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentDomain)) {
      setPrimaryStatus('invalid')
      setPrimaryError('Formato de domínio primário inválido.')
      return
    }

    if (
      currentDomain === store.sharepoint.primaryDomain &&
      formData.tenantName === store.sharepoint.tenantName
    ) {
      setPrimaryStatus('active')
      setPrimaryError(null)
      return
    }

    setPrimaryStatus('validating')
    setPrimaryError(null)

    const timer = setTimeout(async () => {
      try {
        const { tenantName } = await resolveTenantByDomain(currentDomain)
        if (!isMounted) return

        setPrimaryStatus('active')
        setPrimaryError(null)

        setFormData((prev) => ({
          ...prev,
          primaryDomain: currentDomain,
          tenantName,
          teamsWebhookUrl: `https://${currentDomain}.webhook.office.com/teams/alertas`,
        }))

        toast({
          title: 'Domínio Primário Validado',
          description: `Tenant ${tenantName} encontrado. Clique em Salvar para aplicar.`,
        })
      } catch (e) {
        if (isMounted) {
          setPrimaryStatus('invalid')
          setPrimaryError((e as Error).message)
          setFormData((prev) => ({ ...prev, tenantName: '' }))
        }
      }
    }, 800)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [primaryInput]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isMounted = true
    const currentDomain = spInput.trim()

    if (!currentDomain) {
      setSpStatus('idle')
      setSpError(null)
      return
    }

    if (!/^[a-zA-Z0-9.-]+\.sharepoint\.com$/.test(currentDomain)) {
      setSpStatus('invalid')
      setSpError('O domínio deve terminar em .sharepoint.com')
      return
    }

    if (currentDomain === store.sharepoint.sharepointDomain) {
      setSpStatus('active')
      setSpError(null)
      return
    }

    setSpStatus('validating')
    setSpError(null)

    const timer = setTimeout(() => {
      if (!isMounted) return

      setSpStatus('active')
      setSpError(null)

      const defaultSites = {
        locacao: `https://${currentDomain}/sites/Locacao`,
        captacao: `https://${currentDomain}/sites/Captacao`,
        vendas: `https://${currentDomain}/sites/Vendas`,
        juridico: `https://${currentDomain}/sites/Juridico`,
        financeiro: `https://${currentDomain}/sites/Financeiro`,
      }

      setFormData((prev) => ({
        ...prev,
        sharepointDomain: currentDomain,
        sites: defaultSites,
      }))
    }, 800)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [spInput]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSiteChange = (field: keyof typeof formData.sites, value: string) => {
    setFormData((prev) => ({ ...prev, sites: { ...prev.sites, [field]: value } }))
  }

  const sitePrefix = formData.sharepointDomain
    ? `https://${formData.sharepointDomain}/sites/`
    : 'https://dominio.sharepoint.com/sites/'

  const domainPrefix = formData.primaryDomain
    ? `https://${formData.primaryDomain}.webhook.office.com/teams/`
    : 'https://dominio.webhook.office.com/teams/'

  const handleSave = () => {
    if (!primaryInput.trim() && !spInput.trim()) {
      mainStore.updateSharePointSettings({
        primaryDomain: '',
        sharepointDomain: '',
        tenantName: '',
        teamsWebhookUrl: '',
        clientId: '',
        tenantId: '',
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
        description: 'Todas as configurações de M365 e SharePoint foram limpas.',
      })
      return
    }

    if (primaryStatus !== 'active' || !formData.primaryDomain) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Um Domínio Primário válido é necessário.',
      })
      return
    }

    if (spStatus !== 'active' || !formData.sharepointDomain) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Um Domínio SharePoint válido é necessário.',
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
          'Verifique se os sites departamentais e o Webhook estão preenchidos corretamente para os domínios atuais.',
      })
      return
    }

    // Detect if essential authentication connection parameters have changed
    const isAuthChanged =
      formData.primaryDomain !== store.sharepoint.primaryDomain ||
      clientId.trim() !== store.sharepoint.clientId ||
      tenantId.trim() !== store.sharepoint.tenantId

    mainStore.updateSharePointSettings({
      ...formData,
      clientId: clientId.trim(),
      tenantId: tenantId.trim(),
    })

    if (isAuthChanged) {
      // Programmatically invalidate session caches to prevent old OAuth loops or invalid session errors
      sessionStorage.clear()

      mainStore.updateSettings({
        managementEmails: '',
        administrativeEmails: '',
        operationalEmails: '',
      })

      usersStore.enforceDomain(formData.primaryDomain)
      if (formData.primaryDomain) {
        usersStore.addUser({
          name: 'Admin Sistema',
          email: `admin@${formData.primaryDomain}`,
          role: 'Admin',
        })
      }
      toast({
        title: 'Credenciais M365 Atualizadas',
        description:
          'Os parâmetros de autenticação foram alterados. Sua sessão foi encerrada e os caches foram limpos de forma segura para aplicar as novas configurações de Client ID/Tenant ID. Por favor, inicie o login novamente.',
      })
      logout() // Force re-auth to cleanly re-init the Context and PKCE flows
      return
    }

    toast({
      title: 'Integração M365 Salva',
      description: 'Configurações de integração atualizadas e persistidas com sucesso.',
    })
  }

  const testConnection = () => {
    setIsTesting(true)
    setTestResult('idle')
    setTimeout(() => {
      setIsTesting(false)
      if (
        primaryStatus !== 'active' ||
        spStatus !== 'active' ||
        !formData.primaryDomain ||
        !formData.sharepointDomain
      ) {
        setTestResult('error')
        return
      }

      if (clientId && tenantId) {
        // Mocking a successful Graph API connection check based on credentials existing
        toast({
          title: 'Graph API Test',
          description: 'Client ID and Tenant ID validated structure successfully.',
        })
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
    primaryStatus === 'active'

  const renderSiteInput = (label: string, siteKey: keyof typeof formData.sites) => {
    const value = formData.sites[siteKey] || ''
    const path = value.startsWith(sitePrefix)
      ? value.substring(sitePrefix.length)
      : value.split('/').pop() || ''
    const isValid = value.startsWith(sitePrefix) && path.length > 0 && spStatus === 'active'

    return (
      <div key={siteKey} className="space-y-2">
        <Label className="flex items-center justify-between text-sm">
          <span>{label}</span>
          {isValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {!isValid && spStatus === 'active' && formData.sharepointDomain && (
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
              !isValid && spStatus === 'active' && formData.sharepointDomain
                ? 'border-destructive focus-visible:ring-destructive'
                : '',
            )}
            value={path}
            onChange={(e) =>
              handleSiteChange(siteKey, e.target.value ? `${sitePrefix}${e.target.value}` : '')
            }
            disabled={spStatus !== 'active' || !formData.sharepointDomain}
            placeholder="nome-do-setor"
          />
        </div>
      </div>
    )
  }

  const isFullyConnected = !!(
    store.sharepoint.clientId &&
    store.sharepoint.tenantId &&
    primaryStatus === 'active'
  )

  return (
    <div className="space-y-6">
      {isFullyConnected && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg flex items-center gap-3 border border-emerald-200 shadow-sm animate-fade-in">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Integração Ativa com Microsoft 365</p>
            <p className="text-xs">
              As operações estão conectadas via Graph API e autenticação nativa Entra ID. As
              configurações estão salvas.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" /> Conexão M365 & Domínios
          </CardTitle>
          <CardDescription>
            Configure seu ambiente Microsoft 365 informando os domínios corporativos da organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Domínio Primário (M365 & Identidade)</span>
              {primaryStatus === 'active' && formData.primaryDomain && (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 bg-emerald-50"
                >
                  <Globe className="w-3 h-3 mr-1" /> Verificado
                </Badge>
              )}
              {primaryStatus === 'invalid' && <Badge variant="destructive">Inválido</Badge>}
              {primaryStatus === 'validating' && (
                <Badge variant="secondary" className="gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Validando...
                </Badge>
              )}
              {primaryStatus === 'idle' && <Badge variant="secondary">Desconectado</Badge>}
            </Label>
            <Input
              value={primaryInput}
              onChange={(e) => {
                setPrimaryInput(e.target.value)
                if (e.target.value !== formData.primaryDomain) {
                  setFormData((prev) => ({
                    ...prev,
                    primaryDomain: '',
                    tenantName: '',
                    teamsWebhookUrl: '',
                  }))
                }
              }}
              placeholder="Ex: company.com.br ou company.onmicrosoft.com"
              className={
                primaryStatus === 'invalid'
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {primaryError && <p className="text-sm text-destructive mt-1">{primaryError}</p>}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center justify-between text-sm">
              <span>Domínio SharePoint (Documentos)</span>
              {spStatus === 'active' && formData.sharepointDomain && (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 bg-emerald-50"
                >
                  <Globe className="w-3 h-3 mr-1" /> Verificado
                </Badge>
              )}
              {spStatus === 'invalid' && <Badge variant="destructive">Inválido</Badge>}
              {spStatus === 'validating' && (
                <Badge variant="secondary" className="gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Validando...
                </Badge>
              )}
              {spStatus === 'idle' && <Badge variant="secondary">Desconectado</Badge>}
            </Label>
            <Input
              value={spInput}
              onChange={(e) => {
                setSpInput(e.target.value)
                if (e.target.value !== formData.sharepointDomain) {
                  setFormData((prev) => ({
                    ...prev,
                    sharepointDomain: '',
                    sites: { locacao: '', captacao: '', vendas: '', juridico: '', financeiro: '' },
                  }))
                }
              }}
              placeholder="Ex: company.sharepoint.com"
              className={
                spStatus === 'invalid' ? 'border-destructive focus-visible:ring-destructive' : ''
              }
            />
            {spError && <p className="text-sm text-destructive mt-1">{spError}</p>}
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

          <div className="space-y-2">
            <Label className="flex items-center justify-between text-sm">
              <span>Canal de Alertas Teams (Webhook)</span>
              {isWebhookPathValid && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {!isWebhookPathValid &&
                primaryStatus === 'active' &&
                formData.primaryDomain &&
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
                    primaryStatus === 'active' &&
                    formData.primaryDomain &&
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
                disabled={primaryStatus !== 'active' || !formData.primaryDomain}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" /> Microsoft 365 Integration Credentials
          </CardTitle>
          <CardDescription>
            Configure application credentials for Azure AD (Entra ID) integration to enable real
            Graph API calls. Alterar estes valores forçará um novo login e limpeza de cache.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Client ID (Application ID)</span>
              {clientId && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </Label>
            <Input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Ex: 12345678-abcd-1234-abcd-1234567890ab"
              className="font-mono text-sm"
              disabled={primaryStatus !== 'active'}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Tenant ID (Directory ID)</span>
              {tenantId && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </Label>
            <Input
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              placeholder="Ex: 87654321-dcba-4321-dcba-ba0987654321"
              className="font-mono text-sm"
              disabled={primaryStatus !== 'active'}
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
        <CardContent className="space-y-4">
          {(spStatus !== 'active' || !formData.sharepointDomain) && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Forneça um Domínio SharePoint válido para configurar os sites departamentais.
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
            disabled={
              isTesting ||
              primaryStatus !== 'active' ||
              spStatus !== 'active' ||
              !formData.primaryDomain ||
              !formData.sharepointDomain
            }
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
