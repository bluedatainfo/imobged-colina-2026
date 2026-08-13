import React, { useState, useEffect } from 'react'
import { Folder, FolderOpen, ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetchWithAuth, getGraphToken } from '@/lib/m365'
import { mainStore } from '@/stores/main'
import { useToast } from '@/hooks/use-toast'

export interface OneDriveFolder {
  id: string
  name: string
  siteId?: string
  driveId?: string
  path: string
  webUrl?: string
}

interface OneDriveFolderPickerProps {
  onSelectFolder: (folder: OneDriveFolder) => void
  buttonText?: string
}

export function OneDriveFolderPicker({
  onSelectFolder,
  buttonText = 'Selecionar Pasta do OneDrive / SharePoint',
}: OneDriveFolderPickerProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [folders, setFolders] = useState<OneDriveFolder[]>([])
  const [currentPath, setCurrentPath] = useState<OneDriveFolder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<OneDriveFolder | null>(null)
  const { toast } = useToast()

  const loadRootFolders = async () => {
    setLoading(true)
    const token = getGraphToken()
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'M365 Desconectado',
        description: 'Faça login no Microsoft 365 / SharePoint nas Configurações para continuar.',
      })
      setLoading(false)
      return
    }

    try {
      // 1. Try fetching user's OneDrive drive root children first
      const meRes = await fetchWithAuth('https://graph.microsoft.com/v1.0/me/drive/root/children')
      let driveFolders: OneDriveFolder[] = []

      if (meRes.ok) {
        const data = await meRes.json()
        driveFolders = (data.value || [])
          .filter((item: any) => item.folder)
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            path: item.name,
            webUrl: item.webUrl,
          }))
      }

      // 2. Also try fetching default site/drives root children if available
      const storeSpConfig = mainStore.getState().sharepoint
      if (storeSpConfig.sharepointDomain && storeSpConfig.sites.financeiro) {
        try {
          const siteRes = await fetchWithAuth(
            `https://graph.microsoft.com/v1.0/sites/${storeSpConfig.sharepointDomain}:/sites/financeiro`,
          )
          if (siteRes.ok) {
            const siteData = await siteRes.json()
            const drivesRes = await fetchWithAuth(
              `https://graph.microsoft.com/v1.0/sites/${siteData.id}/drives`,
            )
            if (drivesRes.ok) {
              const drivesData = await drivesRes.json()
              for (const drv of drivesData.value || []) {
                const rootChildrenRes = await fetchWithAuth(
                  `https://graph.microsoft.com/v1.0/sites/${siteData.id}/drives/${drv.id}/root/children`,
                )
                if (rootChildrenRes.ok) {
                  const rootChildren = await rootChildrenRes.json()
                  const spFolders = (rootChildren.value || [])
                    .filter((item: any) => item.folder)
                    .map((item: any) => ({
                      id: item.id,
                      name: `[SharePoint] ${item.name}`,
                      siteId: siteData.id,
                      driveId: drv.id,
                      path: item.name,
                      webUrl: item.webUrl,
                    }))
                  driveFolders = [...driveFolders, ...spFolders]
                }
              }
            }
          }
        } catch (e) {
          console.warn('Could not list financeiro SharePoint drive folders:', e)
        }
      }

      setFolders(driveFolders)
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar pastas',
        description: e.message || 'Não foi possível listar as pastas do OneDrive Business.',
      })
    } finally {
      setLoading(false)
    }
  }

  const navigateIntoFolder = async (folder: OneDriveFolder) => {
    setLoading(true)
    setSelectedFolder(folder)
    try {
      let url = ''
      if (folder.siteId && folder.driveId) {
        url = `https://graph.microsoft.com/v1.0/sites/${folder.siteId}/drives/${folder.driveId}/items/${folder.id}/children`
      } else {
        url = `https://graph.microsoft.com/v1.0/me/drive/items/${folder.id}/children`
      }

      const res = await fetchWithAuth(url)
      if (res.ok) {
        const data = await res.json()
        const childFolders = (data.value || [])
          .filter((item: any) => item.folder)
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            siteId: folder.siteId,
            driveId: folder.driveId,
            path: `${folder.path}/${item.name}`,
            webUrl: item.webUrl,
          }))

        setCurrentPath([...currentPath, folder])
        setFolders(childFolders)
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de navegação',
        description: e.message || 'Falha ao abrir a pasta.',
      })
    } finally {
      setLoading(false)
    }
  }

  const navigateBack = (index: number) => {
    if (index === -1) {
      setCurrentPath([])
      setSelectedFolder(null)
      loadRootFolders()
    } else {
      const targetPath = currentPath.slice(0, index + 1)
      const targetFolder = targetPath[targetPath.length - 1]
      setCurrentPath(targetPath)
      navigateIntoFolder(targetFolder)
    }
  }

  useEffect(() => {
    if (open) {
      loadRootFolders()
    }
  }, [open])

  const handleConfirm = () => {
    if (selectedFolder) {
      onSelectFolder(selectedFolder)
      setOpen(false)
    } else {
      toast({
        variant: 'destructive',
        title: 'Nenhuma pasta selecionada',
        description: 'Por favor, selecione uma pasta para continuar.',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Folder className="w-4 h-4 text-amber-500" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-amber-500" /> Selecionar Pasta do OneDrive Business
          </DialogTitle>
          <DialogDescription>
            Navegue pela sua estrutura de arquivos do Microsoft 365 e selecione a pasta onde estão
            salvos os boletos Itaú em PDF.
          </DialogDescription>
        </DialogHeader>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1 text-sm bg-muted/40 p-2 rounded-md overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs px-2"
            onClick={() => navigateBack(-1)}
          >
            Raiz (OneDrive)
          </Button>
          {currentPath.map((item, index) => (
            <React.Fragment key={item.id}>
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs px-2"
                onClick={() => navigateBack(index)}
              >
                {item.name}
              </Button>
            </React.Fragment>
          ))}
        </div>

        {/* List of Folders */}
        <div className="border rounded-lg h-64 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs">Carregando pastas do OneDrive...</span>
            </div>
          ) : folders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
              <Folder className="w-8 h-8 text-muted-foreground/50" />
              <span className="text-xs">Nenhuma subpasta encontrada neste diretório.</span>
            </div>
          ) : (
            folders.map((folder) => {
              const isSelected = selectedFolder?.id === folder.id
              return (
                <div
                  key={folder.id}
                  className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary/10 border border-primary/30 font-medium'
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedFolder(folder)}
                  onDoubleClick={() => navigateIntoFolder(folder)}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Folder
                      className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-amber-500'}`}
                    />
                    <span className="truncate">{folder.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateIntoFolder(folder)
                    }}
                  >
                    Abrir <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              )
            })
          )}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={loadRootFolders} disabled={loading}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Recarregar
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedFolder || loading}>
              Selecionar Esta Pasta
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
