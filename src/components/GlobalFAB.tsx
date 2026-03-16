import { Plus, Camera, Upload, PenTool, FilePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { checkAccess } from '@/lib/permissions'

export function GlobalFAB() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const canContracts = checkAccess('/contracts', user?.role)
  const canDocuments = checkAccess('/documents', user?.role)
  const canInspections = checkAccess('/inspections', user?.role)
  const canLegal = checkAccess('/legal', user?.role)

  if (!canContracts && !canDocuments && !canInspections && !canLegal) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Ações Rápidas</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" sideOffset={12}>
          <DropdownMenuLabel>Ações Rápidas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {canContracts && (
            <DropdownMenuItem onClick={() => navigate('/contracts')} className="cursor-pointer">
              <FilePlus className="mr-2 h-4 w-4" />
              <span>Criar Minuta (Wizard)</span>
            </DropdownMenuItem>
          )}
          {canDocuments && (
            <DropdownMenuItem onClick={() => navigate('/documents')} className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload Rápido (GED)</span>
            </DropdownMenuItem>
          )}
          {canInspections && (
            <DropdownMenuItem onClick={() => navigate('/inspections')} className="cursor-pointer">
              <Camera className="mr-2 h-4 w-4" />
              <span>Nova Vistoria (Fotos)</span>
            </DropdownMenuItem>
          )}
          {canLegal && (
            <DropdownMenuItem onClick={() => navigate('/legal')} className="cursor-pointer">
              <PenTool className="mr-2 h-4 w-4" />
              <span>Abrir Chamado Jurídico</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
