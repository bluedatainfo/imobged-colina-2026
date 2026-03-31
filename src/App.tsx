import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { checkAccess } from './lib/permissions'
import { Loader2 } from 'lucide-react'
import { initMainStore } from './stores/main'
import { initUsersStore } from './stores/users'
import { initContractsStore } from './stores/contracts'
import { initKeysStore } from './stores/keys'
import { initEntitiesStore } from './stores/entities'
import { initTemplatesStore } from './stores/templates'
import { initDocumentsStore } from './stores/documents'
import { initModulesStore } from './stores/modules'
import { supabase } from './lib/supabase/client'

// Code splitting routes to prevent out-of-memory errors during build chunking
const Index = lazy(() => import('./pages/Index'))
const Documents = lazy(() => import('./pages/Documents'))
const DocumentAlerts = lazy(() => import('./pages/DocumentAlerts'))
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDossier = lazy(() => import('./pages/PropertyDossier'))
const Inspections = lazy(() => import('./pages/Inspections'))
const LegalReview = lazy(() => import('./pages/LegalReview'))
const ManagerApproval = lazy(() => import('./pages/ManagerApproval'))
const Contracts = lazy(() => import('./pages/Contracts'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Renewals = lazy(() => import('./pages/Renewals'))
const KeysControl = lazy(() => import('./pages/KeysControl'))
const Maintenance = lazy(() => import('./pages/Maintenance'))
const Entities = lazy(() => import('./pages/Entities'))
const SyncMonitor = lazy(() => import('./pages/SyncMonitor'))
const AccessDenied = lazy(() => import('./pages/AccessDenied'))
const Portal = lazy(() => import('./pages/Portal'))
const Profile = lazy(() => import('./pages/Profile'))
const Templates = lazy(() => import('./pages/Templates'))
const Sales = lazy(() => import('./pages/Sales'))
const Financial = lazy(() => import('./pages/Financial'))

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace />

  const hasAccess = checkAccess(location.pathname, user.role)
  if (!hasAccess) return <Navigate to="/access-denied" replace />

  return <>{children}</>
}

const SuspenseFallback = () => (
  <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

const AppRoutes = () => (
  <Suspense fallback={<SuspenseFallback />}>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/portal" element={<Portal />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manager-approval" element={<ManagerApproval />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/document-alerts" element={<DocumentAlerts />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id/dossier" element={<PropertyDossier />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/legal" element={<LegalReview />} />
        <Route path="/renewals" element={<Renewals />} />
        <Route path="/keys" element={<KeysControl />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/sync-monitor" element={<SyncMonitor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
)

const App = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('app_user_id')) {
        await supabase.auth.signInWithPassword({
          email: 'system@imobiliaria.local',
          password: 'SystemPassword123!',
        })
      }
      await Promise.all([
        initMainStore(),
        initUsersStore(),
        initContractsStore(),
        initKeysStore(),
        initEntitiesStore(),
        initTemplatesStore(),
        initDocumentsStore(),
        initModulesStore(),
      ])
      setReady(true)
    }
    initialize()
  }, [])

  if (!ready) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f0f2f5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0067b8]" />
      </div>
    )
  }

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
