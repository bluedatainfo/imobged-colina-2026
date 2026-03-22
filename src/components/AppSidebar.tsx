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
  Activity,
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

const navigation = [
  { title: 'Painel', url: '/', icon: LayoutDashboard },
  { title: 'Entidades (Prop. / Inq.)', url: '/entities', icon: UsersRound },
  { title: 'Imóveis', url: '/properties', icon: Home },
  { title: 'Documentos GED', url: '/documents', icon: FolderOpen },
  { title: 'Alertas GED', url: '/document-alerts', icon: BellRing },
  { title: 'Monitor de Sincronização', url: '/sync-monitor', icon: Activity },
  { title: 'Análise da Gerencia', url: '/manager-approval', icon: UserCheck },
  { title: 'Vistorias', url: '/inspections', icon: ClipboardCheck },
  { title: 'Controle de Chaves', url: '/keys', icon: KeyRound },
  { title: 'Ciclo de Contratos', url: '/contracts', icon: FileSignature },
  { title: 'Manutenção', url: '/maintenance', icon: Wrench },
  { title: 'Renovações', url: '/renewals', icon: CalendarClock },
  { title: 'Jurídico', url: '/legal', icon: Scale },
  { title: 'Configurações', url: '/settings', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const { agencyProfile } = useMainStore()
  const { user } = useAuth()

  const visibleNavigation = navigation.filter((item) => checkAccess(item.url, user?.role))

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
