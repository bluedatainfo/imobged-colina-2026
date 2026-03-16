import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Documents from './pages/Documents'
import Properties from './pages/Properties'
import Inspections from './pages/Inspections'
import LegalReview from './pages/LegalReview'
import ManagerApproval from './pages/ManagerApproval'
import Contracts from './pages/Contracts'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Renewals from './pages/Renewals'
import KeysControl from './pages/KeysControl'
import AccessDenied from './pages/AccessDenied'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { checkAccess } from './lib/permissions'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace />

  const hasAccess = checkAccess(location.pathname, user.role)
  if (!hasAccess) return <Navigate to="/access-denied" replace />

  return <>{children}</>
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Index />} />
      <Route path="/manager-approval" element={<ManagerApproval />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/inspections" element={<Inspections />} />
      <Route path="/legal" element={<LegalReview />} />
      <Route path="/renewals" element={<Renewals />} />
      <Route path="/keys" element={<KeysControl />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/access-denied" element={<AccessDenied />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

const App = () => (
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

export default App
