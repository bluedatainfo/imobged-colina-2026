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
  { title: 'Formulários OnLine', url: '/forms-online', icon: ClipboardList },
  { title: 'Gestão de Interessados', url: '/candidates', icon: UserPlus },
  { title: 'Documentos GED', url: '/documents', icon: FolderOpen },
  { title: 'Documentos Adicionais', url: '/additional-documents', icon: FilePlus },
  { title: 'Documentos Enviados ao SharePoint', url: '/sent-documents', icon: FileUp },
  { title: 'Entidades (Prop. / Loc.)', url: '/entities', icon: UsersRound },
  { title: 'Imóveis', url: '/properties', icon: Home },
  { title: 'Gestão de Modelos', url: '/templates', icon: BookOpen },
  { title: 'Ciclo de Contratos', url: '/contracts', icon: FileSignature },
  { title: 'Contratos em Andamento', url: '/ongoing-contracts', icon: FileCheck },
  { title: 'Análise da Gerencia', url: '/manager-approval', icon: UserCheck },
  { title: 'Vistorias', url: '/inspections', icon: ClipboardCheck },
  { title: 'Controle de Chaves', url: '/keys', icon: KeyRound },
  { title: 'Alertas GED', url: '/document-alerts', icon: BellRing },
  { title: 'Monitor de Sincronização', url: '/sync-monitor', icon: Activity },
  { title: 'Manutenção', url: '/maintenance', icon: Wrench },
  { title: 'Renovações', url: '/renewals', icon: CalendarClock },
  { title: 'Jurídico', url: '/legal', icon: Scale },
  { title: 'Vendas', url: '/sales', icon: TrendingUp },
  { title: 'Financeiro', url: '/financial', icon: Wallet },
  { title: 'Configurações', url: '/settings', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const { agencyProfile } = useMainStore()
  const { user } = useAuth()
  const { modules } = useModulesStore()

  const moduleMapping: Record<string, keyof typeof modules> = {
    '/entities': 'entities',
    '/properties': 'properties',
    '/templates': 'templates',
    '/contracts': 'contracts',
    '/ongoing-contracts': 'contracts',
    '/manager-approval': 'manager_approval',
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
  }

  const visibleNavigation = navigation.filter((item) => {
    if (
      item.url !== '/candidates' &&
      item.url !== '/forms-online' &&
      item.url !== '/ongoing-contracts' &&
      !checkAccess(item.url, user?.role)
    )
      return false

    const moduleKey = moduleMapping[item.url]
    if (moduleKey && modules[moduleKey] === false) return false

    return true
  })

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
              {visibleNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
