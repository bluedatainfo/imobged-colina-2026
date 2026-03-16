import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function AccessDenied() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <ShieldAlert className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Acesso Negado</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Seu perfil atual (<span className="font-semibold text-foreground">{user?.role}</span>) não
        possui permissões para acessar este módulo. Solicite liberação ao administrador.
      </p>
      <Button onClick={() => navigate('/')} size="lg" className="gap-2">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
      </Button>
    </div>
  )
}
