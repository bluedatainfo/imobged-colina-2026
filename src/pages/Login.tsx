import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import useMainStore, { mainStore } from '@/stores/main'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function Login() {
  const { loginM365, user, isExchanging } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { sharepoint } = useMainStore()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  // Explicitly fetch the most durable configuration when opening the login screen
  useEffect(() => {
    mainStore.reloadCoreConfig()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState(
    sharepoint.primaryDomain ? `admin@${sharepoint.primaryDomain}` : '',
  )

  // Populate email if domain is restored after initial component mount
  useEffect(() => {
    if (!email && sharepoint.primaryDomain) {
      setEmail(`admin@${sharepoint.primaryDomain}`)
    }
  }, [sharepoint.primaryDomain, email])

  const handleNext = async () => {
    if (!email.trim()) return
    if (sharepoint.clientId && sharepoint.tenantId) {
      setIsLoading(true)
      try {
        await loginM365(email)
      } catch (err: any) {
        setIsLoading(false)
      }
    } else {
      setStep(2)
    }
  }

  const handleLoginSubmit = async () => {
    if (!email || !password) return
    setIsLoading(true)
    try {
      await loginM365(email, password)
      toast({
        title: 'Sessão Iniciada',
        description: 'Identidade verificada via Microsoft Entra ID.',
      })
      navigate('/')
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

  const [password, setPassword] = useState('')

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
      </Card>

      <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
        Secured by Microsoft Entra
      </div>
    </div>
  )
}
