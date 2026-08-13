import { Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import useMainStore, { mainStore } from '@/stores/main'
import { Role } from '@/lib/permissions'

const MENU_ITEMS = [
  { path: '/', label: 'Dashboard' },
  { path: '/entities', label: 'Entidades' },
  { path: '/documents', label: 'Documentos' },
  { path: '/additional-documents', label: 'Documentos Adicionais' },
  { path: '/document-alerts', label: 'Alertas GED' },
  { path: '/sync-monitor', label: 'Monitor Sinc.' },
  { path: '/manager-approval', label: 'Análise Ger.' },
  { path: '/inspections', label: 'Vistorias' },
  { path: '/keys', label: 'Chaves' },
  { path: '/contracts', label: 'Contratos' },
  { path: '/templates', label: 'Modelos' },
  { path: '/properties', label: 'Imóveis' },
  { path: '/maintenance', label: 'Manutenção' },
  { path: '/renewals', label: 'Renovações' },
  { path: '/legal', label: 'Jurídico' },
  { path: '/caixa', label: 'Caixa (Boletos)' },
  { path: '/settings', label: 'Configurações' },
  { path: '/profile', label: 'Perfil' },
]

const availableRoles: Role[] = [
  'Admin',
  'Diretor',
  'Gerente',
  'Caixa',
  'Gestor de Contrato',
  'Vistoriador',
  'Jurídico',
  'Financeiro',
  'Corretor',
]

export function RbacMatrix() {
  const { settings } = useMainStore()

  const toggleRbac = (role: string, path: string, checked: boolean) => {
    const currentRbac = { ...settings.rbac }
    let rolePaths = currentRbac[role] ? [...currentRbac[role]] : []

    if (rolePaths.includes('all')) {
      if (checked) return
      rolePaths = MENU_ITEMS.map((m) => m.path).filter((p) => p !== path)
    } else {
      if (checked) {
        rolePaths.push(path)
        if (MENU_ITEMS.every((m) => rolePaths.includes(m.path))) rolePaths = ['all']
      } else {
        rolePaths = rolePaths.filter((p) => p !== path)
      }
    }

    currentRbac[role] = rolePaths
    mainStore.updateSettings({ rbac: currentRbac })
  }

  const toggleAllRbac = (role: string, checked: boolean) => {
    const currentRbac = { ...settings.rbac }
    currentRbac[role] = checked ? ['all'] : []
    mainStore.updateSettings({ rbac: currentRbac })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> Matriz de Permissões (RBAC)
        </CardTitle>
        <CardDescription>
          Controle o acesso aos menus do sistema para cada perfil de usuário.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px] sticky left-0 bg-background z-10">
                  Módulo / Menu
                </TableHead>
                {availableRoles.map((role) => (
                  <TableHead key={role} className="text-center min-w-[120px]">
                    {role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold sticky left-0 bg-muted/30 z-10">
                  Acesso Total
                </TableCell>
                {availableRoles.map((role) => {
                  const isAll = settings.rbac?.[role]?.includes('all')
                  return (
                    <TableCell key={role} className="text-center">
                      <Checkbox
                        checked={isAll}
                        disabled={role === 'Admin'}
                        onCheckedChange={(c) => toggleAllRbac(role, c as boolean)}
                      />
                    </TableCell>
                  )
                })}
              </TableRow>
              {MENU_ITEMS.map((item) => (
                <TableRow key={item.path}>
                  <TableCell className="sticky left-0 bg-background z-10">{item.label}</TableCell>
                  {availableRoles.map((role) => {
                    const paths = settings.rbac?.[role] || []
                    const isChecked = paths.includes('all') || paths.includes(item.path)
                    return (
                      <TableCell key={role} className="text-center">
                        <Checkbox
                          checked={isChecked}
                          disabled={role === 'Admin' || paths.includes('all')}
                          onCheckedChange={(c) => toggleRbac(role, item.path, c as boolean)}
                        />
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
