import { useState } from 'react'
import {
  Camera,
  WifiOff,
  Wifi,
  RefreshCw,
  ClipboardList,
  CheckCircle,
  UploadCloud,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'
import { InspectionOCRDialog } from '@/components/InspectionOCRDialog'
import { useIsMobile } from '@/hooks/use-mobile'
import { MobileInspectionView } from '@/components/MobileInspectionView'
import { InspectionMap } from '@/components/InspectionMap'

const Inspections = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const isMobile = useIsMobile()
  const [isOffline, setIsOffline] = useState(false)
  const [unsyncedCount, setUnsyncedCount] = useState(0)

  const pendingInspections = store.properties.filter((p) => p.status === 'Vistoria')

  const [inspectingId, setInspectingId] = useState<string | null>(null)
  const [wallCondition, setWallCondition] = useState('')
  const [furnitureNotes, setFurnitureNotes] = useState('')

  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrData, setOcrData] = useState<any>(null)

  const processInspection = (propertyId: string, notes: string) => {
    let parsedNotes: any = null
    try {
      parsedNotes = JSON.parse(notes)
    } catch (e) {
      // Not JSON, handle as regular text
    }

    const finalWallCondition = parsedNotes
      ? `[${parsedNotes['Paredes']?.status || 'N/A'}] ${parsedNotes['Paredes']?.notes || ''}`
      : 'Extraído via Mobile'

    const finalFurnitureNotes = parsedNotes
      ? `[${parsedNotes['Móveis']?.status || 'N/A'}] ${parsedNotes['Móveis']?.notes || ''}`
      : notes

    mainStore.saveInspection({
      propertyId,
      wallCondition: finalWallCondition,
      furnitureNotes: finalFurnitureNotes,
      generalNotes: notes, // Store raw JSON string in general for later potential use
    })

    mainStore.updatePropertyStatus(propertyId, 'Confecção de Contrato')
    mainStore.addAuditLog({
      propertyId,
      action: 'Vistoria Mobile/OCR Concluída',
      user: user?.name || 'Sistema',
      details:
        'Upload sincronizado com a biblioteca "Gestão de Locação". Dados processados via OCR.',
    })
    m365Service.saveToLibrary('Gestão de Locação', `Vistoria_${propertyId}_Mobile.pdf`)
  }

  const handleMobileComplete = (propertyId: string, notes: string) => {
    processInspection(propertyId, notes)
    toast({
      title: 'Vistoria Sincronizada',
      description: 'Documento salvo no SharePoint da Gestão de Locação. Dados OCR processados.',
    })
  }

  const handleStartInspection = (id: string) => {
    if (isOffline) {
      setUnsyncedCount((prev) => prev + 1)
      toast({
        title: 'Modo Offline Ativo',
        description: 'Vistoria iniciada. Os dados serão salvos localmente.',
      })
    } else {
      setInspectingId(id)
      setWallCondition('')
      setFurnitureNotes('')
    }
  }

  const handleCompleteInspection = () => {
    if (!inspectingId) return
    const data = { propertyId: inspectingId, wallCondition, furnitureNotes }
    mainStore.saveInspection(data)
    mainStore.updatePropertyStatus(inspectingId, 'Confecção de Contrato')
    mainStore.addAuditLog({
      propertyId: inspectingId,
      action: 'Vistoria Estruturada Concluída',
      user: user?.name || 'Sistema',
      details: 'Checklist mapeado preenchido.',
    })

    m365Service.syncToList('Vistorias Realizadas', JSON.stringify(data))

    setInspectingId(null)
    toast({
      title: 'Vistoria Concluída',
      description: 'Dados estruturados enviados para a etapa de Confecção de Contrato.',
    })
  }

  const handleFileUpload = () => {
    setOcrLoading(true)
    setTimeout(() => {
      setOcrLoading(false)
      setOcrData({
        address: 'Rua Flores, 123',
        date: new Date().toLocaleDateString('pt-BR'),
        wallCondition: 'Pintura nova',
        generalNotes: 'Aprovado.',
      })
    }, 2000)
  }

  const handleOcrConfirm = (data: any, propertyId: string) => {
    setOcrData(null)
    processInspection(propertyId, data.generalNotes)
    toast({
      title: 'OCR Processado com Sucesso',
      description: 'Dados salvos via IA.',
    })
  }

  if (isMobile) {
    return (
      <MobileInspectionView
        pendingInspections={pendingInspections}
        onComplete={handleMobileComplete}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vistorias Inteligentes</h1>
          <p className="text-muted-foreground">
            Preencha offline, planeje rotas com o mapa ou utilize OCR para laudos de vistoria
            terceirizados.
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
        </div>
      </div>

      {!isOffline && unsyncedCount > 0 && (
        <Card className="bg-amber-50 border-amber-200 shadow-sm animate-fade-in">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-amber-800">
              <WifiOff className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">Você possui {unsyncedCount} vistoria(s) offline.</p>
              </div>
            </div>
            <Button
              className="shrink-0 gap-2 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => {
                setUnsyncedCount(0)
                toast({ title: 'Sincronização concluída com o SharePoint' })
              }}
            >
              <RefreshCw className="h-4 w-4" /> Sincronizar Pendentes
            </Button>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="fila">
        <TabsList className="mb-4">
          <TabsTrigger value="fila">Fila de Preenchimento</TabsTrigger>
          <TabsTrigger value="mapa">Mapa de Vistorias</TabsTrigger>
          <TabsTrigger value="ocr">Upload & OCR (IA)</TabsTrigger>
        </TabsList>

        <TabsContent value="fila">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" /> Fila de Imóveis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {pendingInspections.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg hidden sm:block">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base">{p.title}</h4>
                        <p className="text-sm text-muted-foreground">{p.address}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleStartInspection(p.id)}>Iniciar Vistoria</Button>
                  </div>
                ))}
                {pendingInspections.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>Nenhum imóvel aguardando vistoria no momento.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapa">
          <Card>
            <CardHeader>
              <CardTitle>Rotas e Logística (Mapa)</CardTitle>
              <CardDescription>
                Visualize os imóveis pendentes geograficamente para planejar as visitas da equipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-1 sm:p-6">
              <InspectionMap
                properties={pendingInspections}
                onStartInspection={handleStartInspection}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocr">
          <Card
            className="border-dashed border-2 flex flex-col items-center justify-center p-12 cursor-pointer transition-colors hover:bg-muted/50"
            onClick={handleFileUpload}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {ocrLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <UploadCloud className="h-8 w-8 text-primary" />
                )}
              </div>
              <CardTitle>Análise de Laudo (PDF/Imagem)</CardTitle>
              <CardDescription>Arraste um laudo para extração automática via OCR.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!inspectingId} onOpenChange={(val) => !val && setInspectingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checklist Inteligente de Vistoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Condição das Paredes e Pintura</Label>
              <Input value={wallCondition} onChange={(e) => setWallCondition(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Móveis e Observações</Label>
              <Textarea
                className="min-h-[100px]"
                value={furnitureNotes}
                onChange={(e) => setFurnitureNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInspectingId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleCompleteInspection}>Sincronizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InspectionOCRDialog
        open={!!ocrData}
        onClose={() => setOcrData(null)}
        initialData={ocrData}
        onConfirm={handleOcrConfirm}
      />
    </div>
  )
}

export default Inspections
