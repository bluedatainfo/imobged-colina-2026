import { useState } from 'react'
import { Plus, Camera, Search, WifiOff, Wifi, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { mockInspections } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

const Inspections = () => {
  const { toast } = useToast()
  const [isOffline, setIsOffline] = useState(false)
  const [unsyncedCount, setUnsyncedCount] = useState(0)

  const handleSync = () => {
    toast({
      title: 'Sincronizando...',
      description: 'Fazendo upload das fotos e checklists para o SharePoint.',
    })
    setTimeout(() => {
      setUnsyncedCount(0)
      toast({
        title: 'Sincronização Concluída',
        description: 'Todos os dados offline foram salvos com sucesso.',
      })
    }, 2000)
  }

  const handleNewInspection = () => {
    if (isOffline) {
      setUnsyncedCount((prev) => prev + 1)
      toast({
        title: 'Modo Offline Ativo',
        description: 'Vistoria iniciada. Os dados serão salvos localmente e sincronizados depois.',
      })
    } else {
      toast({ title: 'Nova Vistoria', description: 'Abrindo formulário online...' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vistorias (Survey)</h1>
          <p className="text-muted-foreground">
            Registre vistorias com suporte a modo offline para áreas sem sinal.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg border">
            {isOffline ? (
              <WifiOff className="h-4 w-4 text-destructive" />
            ) : (
              <Wifi className="h-4 w-4 text-emerald-500" />
            )}
            <Label htmlFor="offline-mode" className="text-sm cursor-pointer whitespace-nowrap">
              {isOffline ? 'Offline' : 'Online'}
            </Label>
            <Switch id="offline-mode" checked={isOffline} onCheckedChange={setIsOffline} />
          </div>
          <Button className="gap-2 shrink-0" onClick={handleNewInspection}>
            <Plus className="h-4 w-4" /> Nova Vistoria
          </Button>
        </div>
      </div>

      {!isOffline && unsyncedCount > 0 && (
        <Card className="bg-amber-50 border-amber-200 shadow-sm animate-fade-in">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-amber-800">
              <WifiOff className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">
                  Você está online e possui {unsyncedCount} vistoria(s) pendente(s).
                </p>
                <p className="text-sm opacity-90">
                  Faça a sincronização agora para enviar os dados capturados offline.
                </p>
              </div>
            </div>
            <Button
              className="shrink-0 gap-2 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleSync}
            >
              <RefreshCw className="h-4 w-4" /> Sincronizar Pendentes
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <CardTitle>Histórico de Vistorias</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por imóvel ou ID..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockInspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg hidden sm:block">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">{inspection.property}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{inspection.id}</span>
                      <span>•</span>
                      <span>{inspection.inspector}</span>
                      <span>•</span>
                      <span>{inspection.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={inspection.type === 'Entrada' ? 'default' : 'secondary'}>
                    {inspection.type}
                  </Badge>
                  <span
                    className={`text-xs font-medium ${
                      inspection.status === 'Concluída' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {inspection.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inspections
