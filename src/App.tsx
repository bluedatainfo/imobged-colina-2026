import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Documents from './pages/Documents'
import Properties from './pages/Properties'
import Inspections from './pages/Inspections'
import LegalReview from './pages/LegalReview'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/legal" element={<LegalReview />} />
          <Route
            path="/settings"
            element={<div className="p-6">Página de Configurações em construção...</div>}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
