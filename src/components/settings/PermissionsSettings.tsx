import { Shield, UserCog } from 'lucide-react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import useUsersStore, { usersStore } from '@/stores/users'
import { Role } from '@/lib/permissions'

const availableRoles: Role[] = [
  'Admin',
  'Gerente',
  'Gestor de Contrato',
  'Vistoriador',
  'Jurídico',
  'Financeiro',
]

export default function PermissionsSettings() {
  const { users } = useUsersStore()
  const { toast } = useToast()

  const handleRoleChange = (userId: string, newRole: Role) => {
    usersStore.updateUserRole(userId, newRole)
    toast({
      title: 'Permissões Atualizadas',
      description: `O perfil de acesso foi alterado para ${newRole}.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Gestão de Acessos (RBAC)
          </CardTitle>
          <CardDescription>
            Defina os papéis de cada usuário para restringir o acesso a módulos específicos do
            sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email M365</TableHead>
                <TableHead>Perfil de Acesso</TableHead>
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
                      <SelectTrigger className="w-[200px]">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
