import { useState } from 'react'
import {
  Shield,
  UserCog,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  User,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import useUsersStore, { SystemUser, usersStore } from '@/stores/users'
import useMainStore from '@/stores/main'
import { Role } from '@/lib/permissions'

const availableRoles: Role[] = [
  'Admin',
  'Diretor',
  'Gerente',
  'Gestor de Contrato',
  'Vistoriador',
  'Jurídico',
  'Financeiro',
  'Corretor',
]

export function UserManagement() {
  const { users } = useUsersStore()
  const {
    sharepoint: { primaryDomain, clientId, tenantId },
  } = useMainStore()
  const { toast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: 'Vistoriador' as Role })
  const [localEmailPart, setLocalEmailPart] = useState('')

  const handleRoleChange = (userId: string, newRole: Role) => {
    usersStore.updateUserRole(userId, newRole)
    toast({ title: 'Permissões Atualizadas', description: `Perfil alterado para ${newRole}.` })
  }

  const handleOpenNew = () => {
    setEditId(null)
    setLocalEmailPart('')
    setFormData({ name: '', role: 'Vistoriador' })
    setDialogOpen(true)
  }
  const handleOpenEdit = (user: SystemUser) => {
    setEditId(user.id)
    setLocalEmailPart(user.email.split('@')[0])
    setFormData({ name: user.name, role: user.role })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !localEmailPart || !primaryDomain)
      return toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos.',
      })
    const fullEmail = `${localEmailPart}@${primaryDomain}`
    if (editId) {
      usersStore.updateUser(editId, { ...formData, email: fullEmail })
      toast({ title: 'Atualizado', description: 'Usuário salvo com sucesso.' })
    } else {
      usersStore.addUser({ ...formData, email: fullEmail })
      toast({ title: 'Adicionado', description: 'Novo usuário criado.' })
    }
    setDialogOpen(false)
  }

  const handleSyncM365 = async () => {
    if (!primaryDomain) return
    setIsSyncing(true)
    const token = sessionStorage.getItem('m365_token')

    if (token && clientId && tenantId) {
      try {
        const response = await fetch(
          'https://graph.microsoft.com/v1.0/users?$select=id,displayName,mail,userPrincipalName',
          { headers: { Authorization: `Bearer ${token}` } },
        )
        if (!response.ok) throw new Error('Falha ao buscar usuários da Graph API.')
        const data = await response.json()
        const validUsers = (data.value || [])
          .filter((u: any) =>
            (u.mail || u.userPrincipalName || '')
              .toLowerCase()
              .endsWith(`@${primaryDomain.toLowerCase()}`),
          )
          .map((u: any) => ({
            id: u.id,
            name: u.displayName || 'Usuário M365',
            email: (u.mail || u.userPrincipalName).toLowerCase(),
            role: 'Vistoriador' as Role,
            avatar: '',
          }))
        usersStore.syncUsers(validUsers)
        toast({
          title: 'Sincronização Concluída',
          description: `${validUsers.length} usuários importados.`,
        })
      } catch (e: any) {
        toast({ variant: 'destructive', title: 'Erro de Sincronização', description: e.message })
      } finally {
        setIsSyncing(false)
      }
    } else {
      setTimeout(() => {
        setIsSyncing(false)
        toast({
          title: 'Sincronização Simulada',
          description: 'Cadastre credenciais para uso real.',
        })
      }, 1000)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Contas e Acessos M365
            </CardTitle>
            <CardDescription className="flex flex-col gap-1 mt-1">
              <span>Gerencie emails corporativos permitidos.</span>
              {primaryDomain ? (
                <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> @{primaryDomain}
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded w-fit">
                  <AlertCircle className="w-3 h-3 mr-1" /> Domínio não configurado
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSyncM365}
              disabled={!primaryDomain || isSyncing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />{' '}
              Sincronizar
            </Button>
            <Button onClick={handleOpenNew} disabled={!primaryDomain}>
              <Plus className="w-4 h-4 mr-2" /> Novo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>{' '}
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Select value={u.role} onValueChange={(v: Role) => handleRoleChange(u.id, v)}>
                      <SelectTrigger className="w-[180px]">
                        <UserCog className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(u)}>
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => usersStore.removeUser(u.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar' : 'Novo Usuário'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <div className="flex">
                <Input
                  className="rounded-r-none"
                  value={localEmailPart}
                  onChange={(e) => setLocalEmailPart(e.target.value.trim())}
                />
                <span className="inline-flex items-center px-3 border border-l-0 rounded-r-md bg-muted text-sm">
                  @{primaryDomain}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Perfil</Label>
              <Select
                value={formData.role}
                onValueChange={(v: Role) => setFormData({ ...formData, role: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
