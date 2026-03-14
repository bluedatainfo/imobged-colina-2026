import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const { loginM365 } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await loginM365()
      toast({
        title: 'Login bem-sucedido',
        description: 'Conectado via Microsoft 365 SSO.',
      })
      navigate('/')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro de autenticação',
        description: 'Falha ao conectar com Microsoft 365.',
      })
    } finally {
      setIsLoading(false)
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
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              'Autenticando...'
            ) : (
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
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Autenticação Segura SSO</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
