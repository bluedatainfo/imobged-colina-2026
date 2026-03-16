import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usersStore } from '@/stores/users'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Upload, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [photo, setPhoto] = useState<string>(user?.avatar || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Erro de Upload',
          description: 'A imagem deve ter no máximo 2MB.',
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPhoto(result)
        usersStore.updateUser(user.id, { avatar: result })
        toast({
          title: 'Foto Atualizada',
          description: 'Sua foto de perfil foi salva com sucesso.',
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto('')
    usersStore.updateUser(user.id, { avatar: '' })
    toast({
      title: 'Foto Removida',
      description: 'Sua foto de perfil foi removida com sucesso e restaurada para o padrão.',
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e configure sua foto de perfil.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
          <CardDescription>
            Personalize sua conta com uma foto profissional. (Tamanho máximo: 2MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={photo} className="object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 w-full transition-all hover:shadow-md"
            >
              <Upload className="h-4 w-4" /> Enviar Nova Foto
            </Button>
            {photo && (
              <Button
                variant="outline"
                onClick={handleRemovePhoto}
                className="gap-2 text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground w-full transition-colors"
              >
                <Trash2 className="h-4 w-4" /> Remover Foto
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Detalhes da Conta</CardTitle>
          <CardDescription>Suas informações de acesso corporativo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-1.5">
            <span className="text-sm font-medium text-muted-foreground">Nome de Exibição</span>
            <span className="font-semibold text-lg">{user.name}</span>
          </div>
          <div className="grid gap-1.5">
            <span className="text-sm font-medium text-muted-foreground">E-mail Corporativo</span>
            <span className="text-base">{user.email}</span>
          </div>
          <div className="grid gap-1.5">
            <span className="text-sm font-medium text-muted-foreground">
              Nível de Acesso (Perfil)
            </span>
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {user.role}
            </span>
            {user.role === 'Corretor' && (
              <p className="text-sm text-muted-foreground mt-2">
                Como Corretor, seu acesso é focado no painel principal e nos dossiês de
                propriedades. Outros módulos operacionais estão restritos.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
