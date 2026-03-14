import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import { GlobalFAB } from './GlobalFAB'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
            <Outlet />
          </main>
          <GlobalFAB />
        </div>
      </div>
    </SidebarProvider>
  )
}
