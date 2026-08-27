import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderOpen,
  Home,
  ClipboardCheck,
  Scale,
  Settings,
  Building,
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
  ClipboardList,
  FileCheck,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useEffect, useMemo, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import useMainStore from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { checkAccess } from '@/lib/permissions'
import { useModulesStore } from '@/stores/modules'

const navigation = [
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

export function AppSidebar() {
  const location = useLocation()
  const { agencyProfile, menuOrder } = useMainStore()
  const { user } = useAuth()
  const { modules } = useModulesStore()
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const { count, error } = await supabase
          .from('pre_registrations')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Pendência')
        if (!error && count !== null) {
          setPendingCount(count)
        }
      } catch (e) {
        // ignore — badge just stays at 0
      }
    }

    fetchPendingCount()

    // Atualiza em tempo real quando uma pendência é criada/resolvida em outra tela
    const channel = supabase
      .channel('pre_registrations_pending_count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pre_registrations',
          filter: 'status=eq.Pendência',
        },
        () => fetchPendingCount(),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [location.pathname])

  const moduleMapping: Record<string, keyof typeof modules> = {
    '/entities': 'entities',
    '/properties': 'properties',
    '/templates': 'templates',
    '/contracts': 'contracts',
    '/manager-approval': 'manager_approval',
    '/analysis-pending': 'manager_approval',
    '/documents': 'documents',
    '/additional-documents': 'documents',
    '/sent-documents': 'documents',
    '/inspections': 'inspections',
    '/keys': 'keys',
    '/document-alerts': 'document_alerts',
    '/sync-monitor': 'sync_monitor',
    '/maintenance': 'maintenance',
    '/renewals': 'renewals',
    '/legal': 'legal',
    '/sales': 'sales',
    '/financial': 'financial',
    '/caixa': 'caixa',
  }

  const visibleNavigation = useMemo(() => {
    const filtered = navigation.filter((item) => {
      // Todos os módulos (incluindo /candidates e /ongoing-contracts) são
      // validados por checkAccess, sem exceções hardcoded. A fonte da verdade
      // dos módulos é ALL_MODULES (src/lib/modulesRegistry.ts).
      if (!checkAccess(item.url, user?.role)) return false

      const moduleKey = moduleMapping[item.url]
      if (moduleKey && modules[moduleKey] === false) return false

      return true
    })

    const roleOrder = user?.role ? menuOrder?.[user.role] : undefined
    if (!roleOrder || !Array.isArray(roleOrder) || roleOrder.length === 0) {
      return filtered
    }

    const orderMap = new Map<string, number>()
    roleOrder.forEach((path, index) => {
      orderMap.set(path, index)
    })

    return [...filtered].sort((a, b) => {
      const indexA = orderMap.has(a.url) ? orderMap.get(a.url)! : Number.MAX_SAFE_INTEGER
      const indexB = orderMap.has(b.url) ? orderMap.get(b.url)! : Number.MAX_SAFE_INTEGER

      if (indexA !== indexB) {
        return indexA - indexB
      }
      return 0
    })
  }, [user?.role, modules, menuOrder])

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3 font-semibold text-primary overflow-hidden">
          {agencyProfile.logo ? (
            <img
              src={agencyProfile.logo}
              alt={agencyProfile.name}
              className="h-8 w-8 object-contain shrink-0"
            />
          ) : (
            <Building className="h-6 w-6 shrink-0" />
          )}
          <span className="text-lg truncate" title={agencyProfile.name}>
            {agencyProfile.name || 'ImobGED'}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleNavigation.map((item) => {
                const isPendingItem = item.url === '/analysis-pending'
                const showBadge = isPendingItem && pendingCount > 0
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url} className="relative">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {showBadge && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white animate-pulse-badge shadow-md">
                            {pendingCount}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
