import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import useMainStore from '@/stores/main'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const { loginM365 } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { sharepoint } = useMainStore()

  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('ana.silva@imobged.com') // Default mock for easy testing
  const [password, setPassword] = useState('')

  const handleNext = () => {
    if (!email.trim()) return
    setStep(2)
  }

  const handleLoginSubmit = async () => {
    if (!email || !password) return
    setIsLoading(true)
    try {
      await loginM365(email, password)
      toast({
        title: 'Login bem-sucedido',
        description: 'Identidade verificada via Microsoft 365.',
      })
      navigate('/')
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de autenticação',
        description: err.message || 'Falha ao validar credenciais no Tenant.',
      })
      setStep(1)
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setShowDialog(open)
    if (!open) {
      setStep(1)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">ImobGED</CardTitle>
          <CardDescription>Gestão Documental e de Rotinas Imobiliárias</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button
            className="w-full h-12 text-base font-medium shadow-sm transition-all hover:scale-[1.02]"
            onClick={() => setShowDialog(true)}
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-3 shrink-0"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#f25022" d="M1 1h9v9H1z" />
                <path fill="#00a4ef" d="M1 11h9v9H1z" />
                <path fill="#7fba00" d="M11 1h9v9h-9z" />
                <path fill="#ffb900" d="M11 11h9v9h-9z" />
              </svg>
              Entrar com Microsoft 365
            </span>
          </Button>
          <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Autenticação Segura SSO Corporativo</span>
            </div>
            <span className="opacity-70 mt-1">Tenant ID: {sharepoint.tenantId}</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <path fill="#f25022" d="M1 1h9v9H1z" />
                <path fill="#00a4ef" d="M1 11h9v9H1z" />
                <path fill="#7fba00" d="M11 1h9v9h-9z" />
                <path fill="#ffb900" d="M11 11h9v9h-9z" />
              </svg>
              Sign in to your account
            </DialogTitle>
            <DialogDescription>
              {step === 1
                ? `Validando acesso para o Tenant corporativo vinculado.`
                : `Insira a senha de acesso para ${email}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {step === 1 ? (
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail corporativo M365</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@imobiliaria.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  autoFocus
                />
              </div>
            ) : (
              <div className="grid gap-3 animate-fade-in">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
                  autoFocus
                />
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between flex-row">
            {step === 2 && (
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} disabled={isLoading}>
                Voltar
              </Button>
            )}
            <div className={step === 1 ? 'w-full flex justify-end' : ''}>
              {step === 1 ? (
                <Button onClick={handleNext} disabled={!email.trim()}>
                  Avançar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleLoginSubmit} disabled={!password || isLoading}>
                  {isLoading ? 'Verificando Tenant...' : 'Entrar na Plataforma'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
