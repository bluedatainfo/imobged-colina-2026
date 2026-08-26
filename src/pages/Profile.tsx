import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usersStore } from '@/stores/users'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Upload,
  Trash2,
  Phone,
  Save,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
  Send,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [photo, setPhoto] = useState<string>(user?.avatar || '')
  const [phone, setPhone] = useState<string>(user?.phone || '')
  const [callmebotApiKey, setCallmebotApiKey] = useState<string>(user?.callmebot_api_key || '')
  const [showApiKey, setShowApiKey] = useState(false)
  const [savingData, setSavingData] = useState(false)
  const [showActivationDialog, setShowActivationDialog] = useState(false)
  const [testSending, setTestSending] = useState(false)
  const hadPhoneBefore = useRef<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user?.phone !== undefined) {
      setPhone(user.phone || '')
      hadPhoneBefore.current = !!user.phone && user.phone.trim() !== ''
    }
    if (user?.callmebot_api_key !== undefined) {
      setCallmebotApiKey(user.callmebot_api_key || '')
    }
  }, [user?.phone, user?.callmebot_api_key])

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
            <AvatarImage src={photo} className="object-contain bg-white" />
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
            <Label htmlFor="phone-input" className="text-sm font-medium text-muted-foreground">
              Nr Celular
            </Label>
            <div className="relative max-w-md">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone-input"
                type="text"
                placeholder="(XX) XXXXX-XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label
              htmlFor="callmebot-key-input"
              className="text-sm font-medium text-muted-foreground"
            >
              CallMeBot API Key
            </Label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="relative flex-1 max-w-md">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="callmebot-key-input"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Digite sua chave da API CallMeBot"
                  value={callmebotApiKey}
                  onChange={(e) => setCallmebotApiKey(e.target.value)}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {callmebotApiKey.trim() !== '' && (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  disabled={testSending}
                  onClick={async () => {
                    setTestSending(true)
                    try {
                      let digits = phone.replace(/\D/g, '')
                      if (digits.startsWith('0')) {
                        digits = digits.replace(/^0+/, '')
                      }
                      if (digits.length <= 11 && digits.length > 0) {
                        digits = `55${digits}`
                      }

                      if (!digits) {
                        toast({
                          variant: 'destructive',
                          title: 'Erro de validação',
                          description: 'Informe um número de celular válido para testar o envio.',
                        })
                        return
                      }

                      const url = `https://api.callmebot.com/whatsapp.php?phone=${digits}&text=${encodeURIComponent(
                        '✅ Teste CallMeBot: seu WhatsApp está configurado!',
                      )}&apikey=${callmebotApiKey.trim()}`

                      const response = await fetch(url)
                      if (response.ok) {
                        toast({
                          title: 'Mensagem de teste enviada!',
                          description: 'Mensagem de teste enviada! Verifique seu WhatsApp.',
                        })
                      } else {
                        const errorText = await response.text().catch(() => '')
                        toast({
                          variant: 'destructive',
                          title: 'Erro ao enviar mensagem',
                          description:
                            errorText ||
                            `Erro na resposta do CallMeBot (${response.status}: ${response.statusText}).`,
                        })
                      }
                    } catch (err: any) {
                      toast({
                        variant: 'destructive',
                        title: 'Erro ao enviar teste',
                        description: err?.message || 'Falha ao conectar com o serviço CallMeBot.',
                      })
                    } finally {
                      setTestSending(false)
                    }
                  }}
                  className="gap-2 shrink-0"
                >
                  {testSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Testar envio
                </Button>
              )}
            </div>
          </div>
          <div className="pt-1">
            <Button
              type="button"
              onClick={async () => {
                setSavingData(true)
                try {
                  usersStore.updateUser(user.id, {
                    phone: phone.trim(),
                    callmebot_api_key: callmebotApiKey.trim(),
                  })
                  toast({
                    title: 'Dados Salvos',
                    description:
                      'Suas informações de contato e integração foram salvas com sucesso.',
                  })
                  if (!hadPhoneBefore.current && phone.trim() !== '') {
                    setShowActivationDialog(true)
                    hadPhoneBefore.current = true
                  }
                } catch (err: any) {
                  toast({
                    variant: 'destructive',
                    title: 'Erro ao salvar',
                    description: err?.message || 'Não foi possível salvar os dados.',
                  })
                } finally {
                  setSavingData(false)
                }
              }}
              disabled={savingData}
              className="gap-2"
            >
              {savingData ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Salvar
            </Button>
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

      <Dialog open={showActivationDialog} onOpenChange={setShowActivationDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ativação do CallMeBot</DialogTitle>
            <DialogDescription>
              Para receber alertas no WhatsApp, siga os passos abaixo:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 text-sm text-foreground">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Clique no link abaixo para abrir o WhatsApp com a mensagem pronta</li>
              <li>Envie a mensagem para o número +34 613 01 49 37</li>
              <li>Aguarde a resposta do bot com sua API Key</li>
              <li>Cole a API Key no campo &apos;CallMeBot API Key&apos; acima e salve novamente</li>
            </ol>

            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full justify-center gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                onClick={() => {
                  window.open(
                    'https://wa.me/34613014937?text=I%20allow%20callmebot%20to%20send%20me%20messages',
                    '_blank',
                  )
                }}
              >
                📱 Abrir WhatsApp com mensagem pronta
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="default" onClick={() => setShowActivationDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
