import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function AppHeader() {
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Notificações</span>
        </Button>
        <div className="flex items-center gap-2 border-l pl-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2"
              alt="User"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col text-sm md:flex">
            <span className="font-medium leading-none">Ana Silva</span>
            <span className="text-xs text-muted-foreground">Admin M365</span>
          </div>
        </div>
      </div>
    </header>
  )
}
