import { Link } from 'react-router-dom'
import { Bell, Search, LogOut, Users, HelpCircle, User, Settings2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import useUsersStore from '@/stores/users'
import { helpStore } from '@/stores/help'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { OperatorBadge } from '@/components/OperatorBadge'
import { clearCurrentOperator } from '@/lib/operator'

export function AppHeader() {
  const { user, logout, switchUser } = useAuth()
  const { users } = useUsersStore()

  const handleLogout = async () => {
    clearCurrentOperator()
    await logout()
  }
  const handleSwitchUser = async (id: string) => {
    clearCurrentOperator()
    await switchUser(id)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="hidden relative w-full max-w-sm md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar documentos, imóveis (CMD+K)..."
            className="w-full bg-muted/50 border-transparent focus-visible:border-primary pl-9 md:w-[300px] lg:w-[400px] transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          title="Ajuda Contextual (F1)"
          onClick={() => helpStore.setOpen(true)}
        >
          <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
        </Button>
        <div className="flex items-center gap-2 border-l pl-2 sm:pl-4">
          <OperatorBadge />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full ring-2 ring-transparent transition-all hover:ring-primary/20 data-[state=open]:ring-primary/30"
              >
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name}
                    className="object-contain bg-white"
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-medium leading-none">{user?.name || 'Usuário'}</p>
                  <p className="text-xs leading-none text-muted-foreground flex items-center gap-2 mt-1 truncate">
                    {user?.email}
                  </p>
                  <div className="pt-1.5">
                    <Badge
                      variant="secondary"
                      className="font-medium bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {user?.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer py-2">
                <Link to="/profile" className="w-full flex items-center">
                  <Settings2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Configurações do Perfil</span>
                </Link>
              </DropdownMenuItem>

              {user?.role === 'Admin' && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Alternar Conta (Demo)</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-56">
                    {users.map((u) => (
                      <DropdownMenuItem
                        key={u.id}
                        onClick={() => handleSwitchUser(u.id)}
                        className={`justify-between cursor-pointer py-2 ${user?.id === u.id ? 'bg-accent' : ''}`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{u.name}</span>
                          <span className="text-[10px] text-muted-foreground">{u.email}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5 ml-2 shrink-0">
                          {u.role}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive cursor-pointer py-2 hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Encerrar Sessão</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden flex-col text-sm md:flex">
            <span className="font-medium leading-none">{user?.name || 'Visitante'}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {user?.role || 'Microsoft 365'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
