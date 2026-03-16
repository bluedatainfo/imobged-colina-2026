import { useState } from 'react'
import { Shield, UserCog, Plus, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
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
]

export default function PermissionsSettings() {
  const { users } = useUsersStore()
  const tenantDomain = useMainStore().sharepoint.tenantDomain || 'imobged.com'
  const { toast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [formData, setFormData] = useState({ name: '', role: 'Vistoriador' as Role })
  const [localEmailPart, setLocalEmailPart] = useState('')

  const handleRoleChange = (userId: string, newRole: Role) => {
    usersStore.updateUserRole(userId, newRole)
    toast({
      title: 'Permissões Atualizadas',
      description: `O perfil de acesso foi alterado para ${newRole}.`,
    })
  }

  const handleOpenNew = () => {
    setEditId(null)
    setLocalEmailPart('')
    setFormData({ name: '', role: 'Vistoriador' })
    setDialogOpen(true)
  }

  const handleOpenEdit = (user: SystemUser) => {
    setEditId(user.id)
    const [local] = user.email.split('@')
    setLocalEmailPart(local)
    setFormData({ name: user.name, role: user.role })
    setDialogOpen(true)
  }

  const handleRemove = (id: string) => {
    usersStore.removeUser(id)
    toast({ title: 'Usuário Removido', description: 'Acesso revogado com sucesso.' })
  }

  const handleSave = () => {
    if (!formData.name || !localEmailPart) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Preencha todos os campos.' })
      return
    }

    const fullEmail = `${localEmailPart}@${tenantDomain}`

    if (editId) {
      usersStore.updateUser(editId, { ...formData, email: fullEmail })
      toast({ title: 'Usuário Atualizado', description: 'Dados salvos com sucesso.' })
    } else {
      usersStore.addUser({ ...formData, email: fullEmail })
      toast({ title: 'Usuário Adicionado', description: 'Novo acesso concedido ao Tenant.' })
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Contas e Acessos M365
            </CardTitle>
            <CardDescription className="flex flex-col gap-1 mt-1">
              <span>
                Gerencie quais emails corporativos têm permissão para acessar a plataforma.
              </span>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit mt-1">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Permissões restritas ao domínio vinculado:
                @{tenantDomain}
              </span>
            </CardDescription>
          </div>
          <Button onClick={handleOpenNew} className="gap-2">
            <Plus className="w-4 h-4" /> Novo Usuário
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email M365 Autorizado</TableHead>
                <TableHead>Perfil de Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(val: Role) => handleRoleChange(user.id, val)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <UserCog className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(user)}>
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(user.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nenhum usuário cadastrado para este domínio.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar Usuário M365' : 'Autorizar Novo Usuário'}</DialogTitle>
            <DialogDescription>
              Apenas contas pertencentes ao domínio oficial do Tenant podem ser cadastradas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nome Completo</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="grid gap-2">
              <Label>Identificação (Email)</Label>
              <div className="flex">
                <Input
                  className="rounded-r-none focus-visible:z-10"
                  value={localEmailPart}
                  onChange={(e) => setLocalEmailPart(e.target.value.replace(/@.*/, '').trim())}
                  placeholder="joao.silva"
                />
                <span className="inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm font-medium">
                  @{tenantDomain}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Perfil de Acesso Inicial</Label>
              <Select
                value={formData.role}
                onValueChange={(val: Role) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
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
            <Button onClick={handleSave}>Salvar Usuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
