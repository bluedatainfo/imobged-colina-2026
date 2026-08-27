import { useState, useMemo, useEffect } from 'react'
import {
  ListOrdered,
  MoveUp,
  MoveDown,
  RotateCcw,
  Save,
  ShieldAlert,
  CheckCircle2,
  LayoutDashboard,
  FolderOpen,
  Home,
  ClipboardCheck,
  Scale,
  Settings,
  UserCheck,
  FileSignature,
  CalendarClock,
  KeyRound,
  Wrench,
  BellRing,
  UsersRound,
  UserPlus,
  Activity,
  BookOpen,
  TrendingUp,
  Wallet,
  FileUp,
  FilePlus,
  FileCheck,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { ALL_MODULES } from '@/lib/modulesRegistry'

// Mapeamento canônico dos itens de menu do sidebar (título, url, ícone)
const SIDEBAR_ITEMS = [
  { title: 'Painel', url: '/', icon: LayoutDashboard },
  { title: 'Gestão de Interessados', url: '/candidates', icon: UserPlus },
  { title: 'Documentos GED', url: '/documents', icon: FolderOpen },
  { title: 'Pendências de Análise', url: '/analysis-pending', icon: ClipboardCheck },
  { title: 'Documentos Adicionais', url: '/additional-documents', icon: FilePlus },
  { title: 'Documentos Enviados ao SharePoint', url: '/sent-documents', icon: FileUp },
  { title: 'Análise da Gerencia', url: '/manager-approval', icon: UserCheck },
  { title: 'Cadastros (Prop. / Loc.)', url: '/entities', icon: UsersRound },
  { title: 'Imóveis', url: '/properties', icon: Home },
  { title: 'Gestão de Modelos', url: '/templates', icon: BookOpen },
  { title: 'Ciclo de Contratos', url: '/contracts', icon: FileSignature },
  { title: 'Contratos em Andamento', url: '/ongoing-contracts', icon: FileCheck },
  { title: 'Vistorias', url: '/inspections', icon: ClipboardCheck },
  { title: 'Controle de Chaves', url: '/keys', icon: KeyRound },
  { title: 'Alertas GED', url: '/document-alerts', icon: BellRing },
  { title: 'Monitor de Sincronização', url: '/sync-monitor', icon: Activity },
  { title: 'Manutenção', url: '/maintenance', icon: Wrench },
  { title: 'Renovações', url: '/renewals', icon: CalendarClock },
  { title: 'Jurídico', url: '/legal', icon: Scale },
  { title: 'Vendas', url: '/sales', icon: TrendingUp },
  { title: 'Financeiro', url: '/financial', icon: Wallet },
  { title: 'Caixa', url: '/caixa', icon: Wallet },
  { title: 'Configurações', url: '/settings', icon: Settings },
]

export default function MenuOrder() {
  const { toast } = useToast()
  const { settings, menuOrder } = useMainStore()
  const [saving, setSaving] = useState(false)

  // Obter todos os perfis RBAC disponíveis, excluindo 'Admin'
  const availableRoles = useMemo(() => {
    const rolesFromSettings = Object.keys(settings?.rbac || {})
    const defaultRolesList = [
      'Diretor',
      'Gerente',
      'Caixa',
      'Gestor de Contrato',
      'Vistoriador',
      'Jurídico',
      'Financeiro',
      'Corretor',
    ]

    const merged = Array.from(new Set([...defaultRolesList, ...rolesFromSettings]))
    return merged.filter((r) => r.toLowerCase() !== 'admin')
  }, [settings?.rbac])

  const [selectedRole, setSelectedRole] = useState<string>(() => availableRoles[0] || 'Diretor')

  // Se a role selecionada não existir mais, seleciona a primeira
  useEffect(() => {
    if (availableRoles.length > 0 && !availableRoles.includes(selectedRole)) {
      setSelectedRole(availableRoles[0])
    }
  }, [availableRoles, selectedRole])

  // Lista padrão de itens visíveis para o perfil selecionado (na ordem do código)
  const defaultItemsForRole = useMemo(() => {
    if (!selectedRole) return []
    const rbacPaths = settings?.rbac?.[selectedRole] || []
    const hasAll = rbacPaths.includes('all')

    return SIDEBAR_ITEMS.filter((item) => {
      if (hasAll) return true
      if (rbacPaths.includes(item.url)) return true
      return false
    })
  }, [selectedRole, settings?.rbac])

  // Estado local com a lista ordenada de itens para edição
  const [orderedItems, setOrderedItems] = useState<typeof SIDEBAR_ITEMS>([])

  // Recarregar os itens ordenados sempre que mudar o perfil selecionado ou o store
  useEffect(() => {
    if (!selectedRole) {
      setOrderedItems([])
      return
    }

    const savedOrder = menuOrder?.[selectedRole]
    if (savedOrder && Array.isArray(savedOrder) && savedOrder.length > 0) {
      const orderMap = new Map<string, number>()
      savedOrder.forEach((path, idx) => orderMap.set(path, idx))

      const sorted = [...defaultItemsForRole].sort((a, b) => {
        const indexA = orderMap.has(a.url) ? orderMap.get(a.url)! : Number.MAX_SAFE_INTEGER
        const indexB = orderMap.has(b.url) ? orderMap.get(b.url)! : Number.MAX_SAFE_INTEGER
        return indexA - indexB
      })
      setOrderedItems(sorted)
    } else {
      setOrderedItems(defaultItemsForRole)
    }
  }, [selectedRole, menuOrder, defaultItemsForRole])

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= orderedItems.length) return

    const newItems = [...orderedItems]
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp

    setOrderedItems(newItems)
  }

  const handleRestoreDefault = async () => {
    setSaving(true)
    try {
      setOrderedItems(defaultItemsForRole)
      await mainStore.updateMenuOrder(selectedRole, null)
      toast({
        title: 'Ordem Restaurada',
        description: `A ordem padrão do menu para o perfil "${selectedRole}" foi restaurada.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao restaurar',
        description: 'Não foi possível restaurar a ordem padrão.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveOrder = async () => {
    setSaving(true)
    try {
      const paths = orderedItems.map((item) => item.url)
      await mainStore.updateMenuOrder(selectedRole, paths)
      toast({
        title: 'Ordem do Menu Salva',
        description: `A ordenação do menu para o perfil "${selectedRole}" foi atualizada com sucesso.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a nova ordem do menu.',
      })
    } finally {
      setSaving(false)
    }
  }

  const hasCustomOrder = Boolean(menuOrder?.[selectedRole]?.length)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-primary" />
                Ordenação do Menu por Perfil RBAC
              </CardTitle>
              <CardDescription>
                Personalize a posição dos itens do menu lateral para cada perfil de usuário. O
                perfil Admin mantém sempre a ordem padrão do sistema.
              </CardDescription>
            </div>
            {hasCustomOrder && (
              <Badge variant="secondary" className="gap-1.5 self-start sm:self-auto py-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Ordem Personalizada
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seleção de Perfil */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 rounded-lg bg-muted/40 border">
            <div className="space-y-1">
              <Label htmlFor="role-select" className="text-sm font-semibold">
                Perfil de Usuário
              </Label>
              <p className="text-xs text-muted-foreground">
                Selecione o perfil que deseja reordenar no menu
              </p>
            </div>
            <div className="sm:ml-auto w-full sm:w-64">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role-select" className="bg-background">
                  <SelectValue placeholder="Selecione um perfil" />
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

          {/* Lista de Módulos Reordenáveis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">
                Módulos Acessíveis ({orderedItems.length})
              </Label>
              <span className="text-xs text-muted-foreground">
                Use os botões para mover itens para cima ou para baixo
              </span>
            </div>

            {orderedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border rounded-lg border-dashed text-center bg-muted/20 text-muted-foreground gap-2">
                <ShieldAlert className="w-8 h-8 text-amber-500" />
                <p className="font-medium text-foreground">Nenhum módulo acessível</p>
                <p className="text-xs max-w-sm">
                  O perfil "{selectedRole}" não possui módulos habilitados na Matriz RBAC. Habilite
                  permissões na aba "Permissões de Acesso" para reordenar.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {orderedItems.map((item, index) => {
                  const Icon = item.icon
                  const isFirst = index === 0
                  const isLast = index === orderedItems.length - 1

                  return (
                    <div
                      key={item.url}
                      className="flex items-center justify-between p-3.5 rounded-lg border bg-card shadow-sm hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold text-muted-foreground shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-none truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate mt-1">{item.url}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={isFirst || saving}
                          onClick={() => moveItem(index, 'up')}
                          title="Mover para cima"
                          aria-label={`Mover ${item.title} para cima`}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={isLast || saving}
                          onClick={() => moveItem(index, 'down')}
                          title="Mover para baixo"
                          aria-label={`Mover ${item.title} para baixo`}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-lg border-t">
          <Button
            type="button"
            variant="ghost"
            onClick={handleRestoreDefault}
            disabled={saving || !hasCustomOrder || orderedItems.length === 0}
            className="gap-2 w-full sm:w-auto text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" /> Restaurar Padrão
          </Button>
          <Button
            type="button"
            onClick={handleSaveOrder}
            disabled={saving || orderedItems.length === 0}
            className="gap-2 w-full sm:w-auto"
          >
            <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar Ordem'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
