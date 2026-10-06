import { useState, useEffect, useTransition } from 'react'
import {
  ClipboardCheck,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Home,
  User,
  ArrowRight,
  Loader2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { inspectionsService, InspectionRecord, InspectionPhotoRecord } from '@/services/inspections'
import { StartInspectionDialog } from '@/components/inspections/StartInspectionDialog'
import { InspectionWorkspace } from '@/components/inspections/InspectionWorkspace'

export default function Inspections() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [, startTransition] = useTransition()

  // Lista de vistorias
  const [inspections, setInspections] = useState<InspectionRecord[]>([])
  const [loading, setLoading] = useState(true)

  // Filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'MOVE_IN' | 'MOVE_OUT'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Aberta' | 'Finalizada'>('ALL')

  // Modais e Visão ativa
  const [startModalOpen, setStartModalOpen] = useState(false)
  const [activeInspectionId, setActiveInspectionId] = useState<string | null>(null)
  const [activeInspection, setActiveInspection] = useState<InspectionRecord | null>(null)
  const [activePhotos, setActivePhotos] = useState<InspectionPhotoRecord[]>([])
  const [loadingActive, setLoadingActive] = useState(false)

  // Carregar vistorias
  const loadInspections = async () => {
    setLoading(true)
    try {
      const data = await inspectionsService.listInspections()
      setInspections(data)
    } catch (err: any) {
      console.error('Erro ao carregar vistorias:', err)
      toast({
        title: 'Erro ao carregar vistorias',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInspections()
  }, [])

  // Carregar vistoria ativa e suas fotos
  const loadActiveInspection = async (id: string) => {
    setLoadingActive(true)
    try {
      const [insp, photos] = await Promise.all([
        inspectionsService.getInspectionById(id),
        inspectionsService.listPhotos(id),
      ])
      setActiveInspection(insp)
      setActivePhotos(photos)
    } catch (err: any) {
      console.error('Erro ao carregar vistoria ativa:', err)
      toast({
        title: 'Erro ao abrir vistoria',
        description: err.message,
        variant: 'destructive',
      })
      setActiveInspectionId(null)
    } finally {
      setLoadingActive(false)
    }
  }

  const handleOpenInspection = (id: string) => {
    setActiveInspectionId(id)
    loadActiveInspection(id)
  }

  const handleBackToList = () => {
    setActiveInspectionId(null)
    setActiveInspection(null)
    setActivePhotos([])
    loadInspections()
  }

  const handlePhotosChange = () => {
    if (activeInspectionId) {
      inspectionsService.listPhotos(activeInspectionId).then((photos) => {
        startTransition(() => {
          setActivePhotos(photos)
        })
      })
    }
  }

  const handleInspectionUpdated = () => {
    if (activeInspectionId) {
      inspectionsService.getInspectionById(activeInspectionId).then((insp) => {
        startTransition(() => {
          setActiveInspection(insp)
        })
      })
    }
    loadInspections()
  }

  // Filtragem da lista
  const filteredInspections = inspections.filter((insp) => {
    // Filtro de tipo
    if (typeFilter !== 'ALL' && insp.type !== typeFilter) return false
    // Filtro de status
    if (statusFilter !== 'ALL' && insp.status !== statusFilter) return false

    // Busca textual
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    const propId = (insp.property_id || '').toLowerCase()
    const propTitle = (insp.property?.title || '').toLowerCase()
    const propAddress = (insp.property?.address || '').toLowerCase()
    const inspector = (insp.inspector_name || '').toLowerCase()
    const contract = (insp.contract_number || '').toLowerCase()
    const tenant = (insp.candidate?.full_name || insp.property?.tenant || '').toLowerCase()

    return (
      propId.includes(q) ||
      propTitle.includes(q) ||
      propAddress.includes(q) ||
      inspector.includes(q) ||
      contract.includes(q) ||
      tenant.includes(q)
    )
  })

  // Se estiver na tela da vistoria ativa
  if (activeInspectionId) {
    if (loadingActive || !activeInspection) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Carregando detalhes e fotos da vistoria...
          </p>
        </div>
      )
    }

    return (
      <InspectionWorkspace
        inspection={activeInspection}
        photos={activePhotos}
        onPhotosChange={handlePhotosChange}
        onBack={handleBackToList}
        onInspectionUpdated={handleInspectionUpdated}
        currentUserName={user?.name || 'Vistoriador'}
        currentUserEmail={user?.email || undefined}
      />
    )
  }

  // Contadores de resumo
  const totalCount = inspections.length
  const openCount = inspections.filter((i) => i.status === 'Aberta').length
  const finalizedCount = inspections.filter((i) => i.status === 'Finalizada').length
  const moveInCount = inspections.filter((i) => i.type === 'MOVE_IN').length
  const moveOutCount = inspections.filter((i) => i.type === 'MOVE_OUT').length

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-primary" /> Módulo de Vistoria
          </h1>
          <p className="text-muted-foreground text-sm">
            Gestão fotográfica e laudos de vistoria de Entrada e Saída integrados ao SharePoint e
            Dossiê.
          </p>
        </div>

        <Button
          onClick={() => setStartModalOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
        >
          <Plus className="w-4 h-4" /> Iniciar Vistoria
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Vistorias Abertas</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{openCount}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Em campo / Galeria ativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Finalizadas</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {finalizedCount}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Sincronizadas no SharePoint</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Entrada (Novos)</span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{moveInCount}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Análises aprovadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Saída (Em Andamento)</span>
              <Layers className="w-4 h-4 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {moveOutCount}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Rescisões e entregas</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por imóvel, contrato, locatário ou vistoriador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-40">
                <Select value={typeFilter} onValueChange={(val: any) => setTypeFilter(val)}>
                  <SelectTrigger>
                    <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos os Tipos</SelectItem>
                    <SelectItem value="MOVE_IN">Entrada</SelectItem>
                    <SelectItem value="MOVE_OUT">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-36">
                <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos os Status</SelectItem>
                    <SelectItem value="Aberta">Abertas</SelectItem>
                    <SelectItem value="Finalizada">Finalizadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(searchQuery || typeFilter !== 'ALL' || statusFilter !== 'ALL') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setTypeFilter('ALL')
                    setStatusFilter('ALL')
                  }}
                  className="text-xs"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs / Tabela de Vistorias */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setStatusFilter('ALL')}>
            Todas ({totalCount})
          </TabsTrigger>
          <TabsTrigger value="open" onClick={() => setStatusFilter('Aberta')}>
            Abertas ({openCount})
          </TabsTrigger>
          <TabsTrigger value="finalized" onClick={() => setStatusFilter('Finalizada')}>
            Finalizadas ({finalizedCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Listagem Geral de Vistorias</CardTitle>
              <CardDescription>
                Selecione uma vistoria para gerenciar a Galeria de Trabalho, marcar fotos ou enviar
                ao SharePoint.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center p-12 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" /> Carregando
                  vistorias...
                </div>
              ) : filteredInspections.length === 0 ? (
                <div className="text-center py-12 p-4 text-muted-foreground space-y-3">
                  <ClipboardCheck className="w-12 h-12 mx-auto opacity-20" />
                  <p className="font-medium">Nenhuma vistoria encontrada com os filtros atuais.</p>
                  <Button variant="outline" size="sm" onClick={() => setStartModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-1" /> Iniciar Primeira Vistoria
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Imóvel / Endereço</TableHead>
                        <TableHead>Contrato</TableHead>
                        <TableHead>Locatário</TableHead>
                        <TableHead>Vistoriador</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInspections.map((insp) => {
                        const isMoveIn = insp.type === 'MOVE_IN'
                        const isFinished = insp.status === 'Finalizada'

                        return (
                          <TableRow key={insp.id} className="hover:bg-muted/40 transition-colors">
                            <TableCell>
                              <Badge
                                variant={isMoveIn ? 'default' : 'secondary'}
                                className={
                                  isMoveIn
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                                }
                              >
                                {isMoveIn ? 'Entrada' : 'Saída'}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <div className="font-semibold text-sm flex items-center gap-1.5">
                                <Home className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span
                                  className="truncate max-w-[220px]"
                                  title={insp.property?.title}
                                >
                                  {insp.property?.title || insp.property_id}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground truncate max-w-[240px]">
                                {insp.property?.address || `Cód. ${insp.property_id}`}
                              </div>
                            </TableCell>

                            <TableCell className="font-mono text-xs font-semibold">
                              {insp.contract_number || insp.property_id}
                            </TableCell>

                            <TableCell>
                              <div className="text-xs font-medium flex items-center gap-1">
                                <User className="w-3 h-3 text-muted-foreground" />
                                <span
                                  className="truncate max-w-[160px]"
                                  title={insp.candidate?.full_name || insp.property?.tenant}
                                >
                                  {insp.candidate?.full_name ||
                                    insp.property?.tenant ||
                                    'Não informado'}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell className="text-xs">
                              {insp.inspector_name || 'Vistoriador'}
                            </TableCell>

                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(insp.started_at).toLocaleDateString('pt-BR')}
                              </span>
                            </TableCell>

                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  isFinished
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40'
                                    : 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40'
                                }
                              >
                                {insp.status}
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant={isFinished ? 'outline' : 'default'}
                                className="gap-1 h-8 text-xs"
                                onClick={() => handleOpenInspection(insp.id)}
                              >
                                {isFinished ? 'Ver Galeria' : 'Abrir Galeria'}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para Iniciar Vistoria */}
      <StartInspectionDialog
        open={startModalOpen}
        onClose={() => setStartModalOpen(false)}
        onCreated={(id) => {
          handleOpenInspection(id)
        }}
        currentUserName={user?.name || 'Vistoriador'}
        currentUserEmail={user?.email || undefined}
      />
    </div>
  )
}
