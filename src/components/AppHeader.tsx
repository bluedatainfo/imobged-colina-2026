import { Bell, Search, LogOut, Users, HelpCircle } from 'lucide-react'
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

export function AppHeader() {
  const { user, logout, switchUser } = useAuth()
  const { users } = useUsersStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="hidden relative w-full max-w-sm md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar documentos, imóveis (CMD+K)..."
            className="w-full bg-background pl-9 md:w-[300px] lg:w-[400px]"
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
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        <div className="flex items-center gap-2 border-l pl-2 sm:pl-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.substring(0, 2) || 'US'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'Usuário'}</p>
                  <p className="text-xs leading-none text-muted-foreground flex items-center gap-2 mt-1">
                    {user?.email} <Badge variant="secondary">{user?.role}</Badge>
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Mudar Usuário (Demo)</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {users.map((u) => (
                    <DropdownMenuItem
                      key={u.id}
                      onClick={() => switchUser(u.id)}
                      className="justify-between"
                    >
                      {u.name}
                      <span className="text-xs text-muted-foreground ml-2">{u.role}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair (SSO)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden flex-col text-sm md:flex">
            <span className="font-medium leading-none">{user?.name || 'Visitante'}</span>
            <span className="text-xs text-muted-foreground">{user?.role || 'Microsoft 365'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
