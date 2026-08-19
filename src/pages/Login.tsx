import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import useMainStore, { mainStore } from '@/stores/main'
import { getFirstAllowedPath } from '@/lib/permissions'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Loader2, Settings } from 'lucide-react'

export default function Login() {
  const { loginM365, user, isExchanging } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { sharepoint } = useMainStore()

  useEffect(() => {
    if (user) {
      // Redireciona para a primeira rota permitida pelo RBAC do perfil, em
      // vez de sempre ir para "/". Perfis sem Dashboard no RBAC (ex.: "Caixa")
      // caem direto na sua primeira rota permitida (ex.: "/caixa").
      navigate(getFirstAllowedPath(user.role), { replace: true })
    }
  }, [user, navigate])

  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingConfig, setIsFetchingConfig] = useState(true)
  const [setupMode, setSetupMode] = useState(false)

  const [setupDomain, setSetupDomain] = useState('')
  const [setupClientId, setSetupClientId] = useState('')
  const [setupTenantId, setSetupTenantId] = useState('')

  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchConfig = async () => {
      setIsFetchingConfig(true)
      try {
        const { data } = await supabase
          .from('app_settings')
          .select('client_id, tenant_id, default_domain')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (data?.client_id && data?.tenant_id) {
          mainStore.hydrateSharePointSettings({
            clientId: data.client_id,
            tenantId: data.tenant_id,
            primaryDomain: data.default_domain || '',
          })
          if (data.default_domain) {
            setEmail(`admin@${data.default_domain}`)
          }
          setSetupMode(false)
        } else {
          setSetupMode(true)
        }
      } catch (err) {
        console.error('Failed to fetch config', err)
      } finally {
        setIsFetchingConfig(false)
      }
    }

    if (!isExchanging) {
      fetchConfig()
    } else {
      setIsFetchingConfig(false)
    }
  }, [isExchanging])

  const handleSaveSetup = async () => {
    setIsLoading(true)
    try {
      const { error: authErr } = await supabase.auth.signInWithPassword({
        email: 'system@imobiliaria.local',
        password: 'SystemPassword123!',
      })

      if (authErr) throw new Error('Falha ao autenticar para salvar configurações.')

      const { data: existing } = await supabase
        .from('app_settings')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const payload = {
        client_id: setupClientId.trim(),
        tenant_id: setupTenantId.trim(),
        default_domain: setupDomain.trim(),
        updated_at: new Date().toISOString(),
      }

      if (existing) {
        await supabase.from('app_settings').update(payload).eq('id', existing.id)
      } else {
        await supabase.from('app_settings').insert(payload)
      }

      mainStore.hydrateSharePointSettings({
        clientId: setupClientId.trim(),
        tenantId: setupTenantId.trim(),
        primaryDomain: setupDomain.trim(),
      })

      await supabase.auth.signOut()

      toast({
        title: 'Configuração Salva',
        description: 'Integração M365 configurada com sucesso.',
      })

      setSetupMode(false)
      setEmail(`admin@${setupDomain.trim()}`)
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: err.message || 'Falha ao salvar configuração.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (!email.trim()) return

    setIsLoading(true)

    try {
      let hasM365 = !!(sharepoint.clientId && sharepoint.tenantId)

      if (!hasM365) {
        const { data } = await supabase
          .from('app_settings')
          .select('client_id, tenant_id')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (data?.client_id && data?.tenant_id) {
          hasM365 = true
          mainStore.hydrateSharePointSettings({
            clientId: data.client_id,
            tenantId: data.tenant_id,
          })
        }
      }

      if (hasM365) {
        await loginM365(email)
      } else {
        setIsLoading(false)
        setStep(2)
      }
    } catch (err: any) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Acesso Negado',
        description: err.message || 'Falha ao iniciar autenticação M365.',
      })
    }
  }

  const handleLoginSubmit = async () => {
    if (!email || !password) return
    setIsLoading(true)
    try {
      await loginM365(email, password)
      toast({
        title: 'Sessão Iniciada',
        description: 'Identidade verificada com sucesso.',
      })
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Acesso Negado',
        description: err.message || 'Falha ao validar credenciais no tenant atual.',
      })
      setStep(1)
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  if (isExchanging) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>
        <Card className="w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white flex flex-col items-center text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#0067b8] mb-6" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Autenticando...</h2>
          <p className="text-sm text-gray-600">Conectando de forma segura ao Microsoft Entra ID.</p>
        </Card>
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
          Secured by Microsoft Entra
        </div>
      </div>
    )
  }

  if (isFetchingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>
        <Card className="w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white flex flex-col items-center text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#0067b8] mb-6" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Carregando configurações...</h2>
          <p className="text-sm text-gray-600">Verificando ambiente Microsoft 365.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>

      <Card className="w-full max-w-[440px] shadow-2xl border-0 p-8 sm:p-10 rounded-lg relative z-10 bg-white">
        <div className="mb-8 flex items-center gap-3">
          <svg
            className="h-6 w-auto shrink-0"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#f25022" d="M1 1h9v9H1z" />
            <path fill="#00a4ef" d="M1 11h9v9H1z" />
            <path fill="#7fba00" d="M11 1h9v9h-9z" />
            <path fill="#ffb900" d="M11 11h9v9h-9z" />
          </svg>
          <span className="text-xl font-semibold text-gray-400">|</span>
          <span className="text-lg font-semibold text-gray-700 tracking-tight">
            {sharepoint.tenantName || 'Microsoft 365'}
          </span>
        </div>

        {setupMode ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Configuração Inicial</h2>
              <p className="text-sm text-gray-600">
                O sistema requer os dados do Azure AD para continuar o login M365.
              </p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Domínio Primário</Label>
                <Input
                  placeholder="ex: company.onmicrosoft.com"
                  value={setupDomain}
                  onChange={(e) => setSetupDomain(e.target.value)}
                  className="h-10 rounded-md border-gray-300"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Client ID (Application ID)</Label>
                <Input
                  placeholder="00000000-0000-0000-0000-000000000000"
                  value={setupClientId}
                  onChange={(e) => setSetupClientId(e.target.value)}
                  className="h-10 rounded-md border-gray-300 font-mono text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Tenant ID (Directory ID)</Label>
                <Input
                  placeholder="00000000-0000-0000-0000-000000000000"
                  value={setupTenantId}
                  onChange={(e) => setSetupTenantId(e.target.value)}
                  className="h-10 rounded-md border-gray-300 font-mono text-sm"
                />
              </div>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <Button
                onClick={handleSaveSetup}
                disabled={isLoading || !setupDomain || !setupClientId || !setupTenantId}
                className="w-full bg-[#0067b8] hover:bg-[#005da6] text-white h-10 font-medium rounded-none"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Settings className="w-4 h-4 mr-2" />
                )}
                Salvar e Continuar
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSetupMode(false)}
                className="w-full text-xs text-gray-500 hover:text-gray-900"
              >
                Continuar com login local (Demo)
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {step === 1 ? 'Sign in' : 'Enter password'}
            </h1>

            {step === 1 ? (
              <p className="text-sm text-gray-600 mb-6">to continue to ImobGED System</p>
            ) : (
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 rounded-full p-1"
                  title="Change user"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <p className="text-sm font-medium text-gray-800 truncate">{email}</p>
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <Input
                  type="email"
                  placeholder="Email, phone, or Skype"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none"
                  autoFocus
                />
                <div className="flex justify-between items-center pt-6">
                  <span className="text-[13px] text-blue-600 hover:underline cursor-pointer font-medium">
                    Can't access your account?
                  </span>
                  <Button
                    onClick={handleNext}
                    disabled={!email.trim() || isLoading}
                    className="bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] font-medium transition-colors"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Next'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
                  className="h-10 border-gray-300 focus-visible:ring-blue-600 rounded-none border-t-0 border-l-0 border-r-0 border-b-[1px] bg-transparent px-0 focus-visible:ring-0 focus-visible:border-b-[2px] focus-visible:border-blue-600 text-[15px] shadow-none"
                  autoFocus
                />
                <div className="flex justify-between items-center pt-6">
                  <span className="text-[13px] text-blue-600 hover:underline cursor-pointer font-medium">
                    Forgot my password
                  </span>
                  <Button
                    onClick={handleLoginSubmit}
                    disabled={!password || isLoading}
                    className="bg-[#0067b8] hover:bg-[#005da6] text-white rounded-none px-8 h-[34px] min-w-[100px] font-medium transition-colors"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
        Secured by Microsoft Entra
      </div>
    </div>
  )
}
