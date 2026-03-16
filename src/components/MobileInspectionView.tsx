import { useState, useEffect } from 'react'
import {
  Camera,
  UploadCloud,
  CheckCircle2,
  Building,
  Search,
  WifiOff,
  ChevronLeft,
  X,
  Loader2,
  Image as ImageIcon,
  MapPin,
  Check,
  List as ListIcon,
  Map as MapIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import useMainStore, { Property, mainStore } from '@/stores/main'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { InspectionMap } from './InspectionMap'

interface Props {
  pendingInspections: Property[]
  onComplete: (propertyId: string, notes: string) => void
}

type Category = 'Paredes' | 'Pisos' | 'Elétrica' | 'Hidráulica' | 'Móveis'
type Status = 'Novo' | 'Bom' | 'Usado' | 'Danificado' | ''

interface CategoryData {
  status: Status
  notes: string
  photos: string[]
}

const CATEGORIES: Category[] = ['Paredes', 'Pisos', 'Elétrica', 'Hidráulica', 'Móveis']
const STATUSES: Status[] = ['Novo', 'Bom', 'Usado', 'Danificado']

export function MobileInspectionView({ pendingInspections, onComplete }: Props) {
  const { agencyProfile } = useMainStore()
  const { toast } = useToast()
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Select, 2: Inspect, 3: Processing
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [search, setSearch] = useState('')
  const [propertyId, setPropertyId] = useState<string>('')
  const [checklist, setChecklist] = useState<Record<Category, CategoryData>>({
    Paredes: { status: '', notes: '', photos: [] },
    Pisos: { status: '', notes: '', photos: [] },
    Elétrica: { status: '', notes: '', photos: [] },
    Hidráulica: { status: '', notes: '', photos: [] },
    Móveis: { status: '', notes: '', photos: [] },
  })
  const [uploadingCat, setUploadingCat] = useState<string | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const filteredProperties = pendingInspections.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedProp = pendingInspections.find((p) => p.id === propertyId)

  const handleUpdateCategory = (cat: Category, field: keyof CategoryData, value: any) => {
    setChecklist((prev) => ({
      ...prev,
      [cat]: { ...prev[cat], [field]: value },
    }))
  }

  const handleAddPhoto = (cat: Category) => {
    setUploadingCat(cat)
    setTimeout(() => {
      const newPhoto = `https://img.usecurling.com/p/200/200?q=house+damage&seed=${Date.now()}`
      setChecklist((prev) => ({
        ...prev,
        [cat]: { ...prev[cat], photos: [...prev[cat].photos, newPhoto] },
      }))
      setUploadingCat(null)
    }, 1000)
  }

  const handleRemovePhoto = (cat: Category, index: number) => {
    setChecklist((prev) => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        photos: prev[cat].photos.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = () => {
    if (!propertyId) return
    setStep(3)

    const selectedAddress = selectedProp?.address || 'Endereço Desconhecido'
    let hasAlerts = false

    Object.entries(checklist).forEach(([cat, data]) => {
      if (data.status === 'Danificado') {
        hasAlerts = true
        mainStore.addMaintenanceTicket({
          propertyId,
          address: selectedAddress,
          item: cat,
          notes: data.notes || 'Identificado na vistoria mobile.',
          photo: data.photos[0] || null,
        })
        mainStore.addAuditLog({
          propertyId,
          action: `Alerta de Manutenção: ${cat}`,
          user: 'Sistema',
          details: 'Gerado automaticamente via status "Danificado".',
        })
      }
    })

    // Simulate OCR and Sync
    setTimeout(() => {
      onComplete(propertyId, JSON.stringify(checklist))

      if (hasAlerts) {
        toast({
          title: 'Alertas de Manutenção',
          description: 'Tickets de reparo foram encaminhados ao Financeiro/Manutenção.',
          variant: 'destructive',
        })
      }

      // Reset after complete
      setPropertyId('')
      setChecklist({
        Paredes: { status: '', notes: '', photos: [] },
        Pisos: { status: '', notes: '', photos: [] },
        Elétrica: { status: '', notes: '', photos: [] },
        Hidráulica: { status: '', notes: '', photos: [] },
        Móveis: { status: '', notes: '', photos: [] },
      })
      setStep(1)
    }, 3500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 font-sans pb-24">
      {/* Mobile Header */}
      <div className="bg-background border-b sticky top-0 z-20">
        {isOffline && (
          <div className="bg-amber-500 text-amber-950 text-xs font-medium px-4 py-2 flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" /> Trabalhando Offline - Sincronização pendente
          </div>
        )}
        <div className="flex items-center gap-3 p-4">
          {step === 2 && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 h-8 w-8 shrink-0"
              onClick={() => setStep(1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {agencyProfile.logo ? (
            <img
              src={agencyProfile.logo}
              alt={agencyProfile.name}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <Building className="h-8 w-8 text-primary shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg leading-tight truncate">{agencyProfile.name}</h2>
            <p className="text-xs text-muted-foreground truncate">
              Portal do Vistoriador (SharePoint)
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4 w-full max-w-md mx-auto">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Nova Vistoria</h1>
                <p className="text-sm text-muted-foreground mt-1">Selecione um imóvel.</p>
              </div>
              <div className="bg-muted p-1 rounded-lg flex items-center border">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list'
                      ? 'bg-background shadow-sm text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'map'
                      ? 'bg-background shadow-sm text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {viewMode === 'list' ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por endereço ou ID..."
                    className="pl-10 h-12 text-base rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="space-y-3 mt-4">
                  {filteredProperties.map((p) => (
                    <Card
                      key={p.id}
                      className="overflow-hidden active:scale-[0.98] transition-transform cursor-pointer border-transparent shadow-sm hover:border-primary/20"
                      onClick={() => {
                        setPropertyId(p.id)
                        setStep(2)
                      }}
                    >
                      <CardContent className="p-0 flex items-stretch">
                        <div className="w-24 h-24 shrink-0 bg-muted relative">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-center">
                          <h3 className="font-semibold text-base line-clamp-1">{p.title}</h3>
                          <div className="flex items-start gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span className="line-clamp-2">{p.address}</span>
                          </div>
                          <Badge variant="secondary" className="w-fit mt-2 text-[10px]">
                            ID: {p.id}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredProperties.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground bg-background rounded-xl border border-dashed">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Nenhuma vistoria pendente encontrada.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-4">
                <InspectionMap
                  properties={filteredProperties}
                  onStartInspection={(id) => {
                    setPropertyId(id)
                    setStep(2)
                  }}
                />
              </div>
            )}
          </div>
        )}

        {step === 2 && selectedProp && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardContent className="p-4 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={selectedProp.image}
                    alt={selectedProp.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{selectedProp.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {selectedProp.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            <h4 className="font-semibold text-foreground px-1 pt-2">Checklist Interativo</h4>

            <Accordion type="single" collapsible className="space-y-3" defaultValue="Paredes">
              {CATEGORIES.map((cat) => {
                const data = checklist[cat]
                const isComplete = data.status && data.photos.length > 0

                return (
                  <AccordionItem
                    key={cat}
                    value={cat}
                    className="bg-background border rounded-xl shadow-sm px-1"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]]:border-b">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="font-semibold text-base">{cat}</span>
                        {isComplete && <Check className="w-5 h-5 text-emerald-500" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 space-y-5">
                      <div className="space-y-3">
                        <Label className="text-sm text-muted-foreground uppercase tracking-wider">
                          Estado de Conservação
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {STATUSES.map((status) => (
                            <Button
                              key={status}
                              type="button"
                              variant={data.status === status ? 'default' : 'outline'}
                              size="sm"
                              className={cn('rounded-full px-4 h-9', {
                                'bg-primary text-primary-foreground': data.status === status,
                              })}
                              onClick={() => handleUpdateCategory(cat, 'status', status)}
                            >
                              {status}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm text-muted-foreground uppercase tracking-wider">
                          Observações
                        </Label>
                        <Textarea
                          placeholder="Detalhes, avarias ou notas..."
                          className="min-h-[80px] text-base resize-none"
                          value={data.notes}
                          onChange={(e) => handleUpdateCategory(cat, 'notes', e.target.value)}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm text-muted-foreground uppercase tracking-wider">
                          Registros Fotográficos
                        </Label>
                        <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                          {data.photos.map((photo, idx) => (
                            <div
                              key={idx}
                              className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border snap-center"
                            >
                              <img
                                src={photo}
                                alt={`Foto ${idx}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => handleRemovePhoto(cat, idx)}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 backdrop-blur-sm"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => handleAddPhoto(cat)}
                            disabled={uploadingCat === cat}
                            className="w-24 h-24 shrink-0 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 transition-colors snap-center"
                          >
                            {uploadingCat === cat ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <>
                                <Camera className="w-6 h-6" />
                                <span className="text-xs font-medium">Adicionar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-10">
              <Button
                size="lg"
                className="w-full max-w-md mx-auto h-14 text-lg"
                onClick={handleSubmit}
              >
                <UploadCloud className="w-5 h-5 mr-2" /> Finalizar e Sincronizar
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <ImageIcon className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Processando Vistoria</h2>
              <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
                O motor OCR está analisando as imagens e sincronizando com o SharePoint...
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full mt-4">
              <CheckCircle2 className="w-4 h-4" /> Conexão M365 Segura
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
