import { CloudUpload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
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

export function IntegrationPermissions() {
  const { settings } = useMainStore()
  const { toast } = useToast()

  const toggleSpIntegrationRole = (role: Role, checked: boolean) => {
    const currentRoles = settings.spIntegrationRoles || []
    let newRoles = [...currentRoles]
    if (checked) {
      if (!newRoles.includes(role)) newRoles.push(role)
    } else {
      newRoles = newRoles.filter((r) => r !== role)
    }
    mainStore.updateSettings({ spIntegrationRoles: newRoles })
    toast({ title: 'Permissões Atualizadas', description: `Acesso do perfil ${role} modificado.` })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudUpload className="w-5 h-5 text-primary" /> Permissões de Integração SharePoint
        </CardTitle>
        <CardDescription>
          Defina quais perfis podem realizar uploads e sincronizar dados com o ambiente M365.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {availableRoles.map((role) => {
            const isChecked = settings.spIntegrationRoles?.includes(role) ?? false
            return (
              <div key={role} className="flex items-center space-x-2 border p-3 rounded-lg bg-card">
                <Checkbox
                  id={`sp-role-${role}`}
                  checked={isChecked}
                  onCheckedChange={(c) => toggleSpIntegrationRole(role, c as boolean)}
                />
                <Label
                  htmlFor={`sp-role-${role}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {role}
                </Label>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
