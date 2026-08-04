import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  candidatesService,
  PreRegistration,
  PreRegistrationStatus,
  PreRegistrationCategory,
} from '@/services/candidates'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  ExternalLink,
  Loader2,
  RefreshCw,
  ClipboardList,
  Search,
  FileSearch,
} from 'lucide-react'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { ptBR } from 'date-fns/locale'
import { StartLeaseProcessDialog } from '@/components/StartLeaseProcessDialog'

const STATUS_COLORS: Record<PreRegistrationStatus, string> = {
  Novo: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'Documentação Pendente': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  'Em Análise da Gerência': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  'Aguardando Vistoria': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  Aprovado: 'bg-green-100 text-green-800 hover:bg-green-100',
  Reprovado: 'bg-red-100 text-red-800 hover:bg-red-100',
}

const STATUS_OPTIONS: PreRegistrationStatus[] = [
  'Novo',
  'Documentação Pendente',
  'Em Análise da Gerência',
  'Aguardando Vistoria',
  'Aprovado',
  'Reprovado',
]

type SortDirection = 'desc' | 'asc' | null

export default function Candidates() {
  const [candidates, setCandidates] = useState<PreRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<PreRegistration | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState<PreRegistrationCategory>('PF')
  const [processDialogOpen, setProcessDialogOpen] = useState(false)
  const [existingProcessDialogOpen, setExistingProcessDialogOpen] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [docFilter, setDocFilter] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const fetchCandidates = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true)
      else setIsRefreshing(true)
      const data = await candidatesService.getCandidates()
      setCandidates(data)
    } catch (error) {
      console.error(error)
      if (!silent) toast.error('Erro ao carregar interessados')
    } finally {
      if (!silent) setLoading(false)
      else setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  // 15-second silent auto-refresh cycle
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCandidates(true)
    }, 15000)
    return () => clearInterval(interval)
  }, [fetchCandidates])

  const scrollToLeft = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    // In RTL scroll containers (which keep vertical scrollbar on left),
    // a large negative scrollLeft moves the viewport to the far left (Column 1 - Código)
    container.scrollLeft = -Math.max(container.scrollWidth, 99999)
    if (container.scrollLeft > 0) {
      container.scrollLeft = 0
    }
  }, [])

  const resetScrollPosition = useCallback(() => {
    // Double requestAnimationFrame ensures React DOM commit and browser reflow are completed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToLeft()
      })
    })
  }, [scrollToLeft])

  // Reset horizontal scroll to far-left on tab changes and initial load completion only
  // Silent auto-refresh does not trigger this effect, keeping user scroll position intact
  useEffect(() => {
    if (!loading) {
      resetScrollPosition()
    }
  }, [activeTab, loading, resetScrollPosition])

  const handleSync = async () => {
    try {
      setSyncing(true)
      const count = await candidatesService.syncFromSharePoint()
      if (count > 0) {
        toast.success(`${count} novos interessados sincronizados com sucesso!`)
      } else {
        toast.info('Nenhum novo registro encontrado no SharePoint.')
      }
      await fetchCandidates(true)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao sincronizar com o SharePoint.')
    } finally {
      setSyncing(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: PreRegistrationStatus) => {
    try {
      setUpdating(true)
      const updated = await candidatesService.updateStatus(id, newStatus)
      setCandidates(candidates.map((c) => (c.id === id ? updated : c)))
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(updated)
      }
      toast.success('Status atualizado com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar status')
    } finally {
      setUpdating(false)
    }
  }

  const handleExportJSON = (candidate: PreRegistration) => {
    const exportData = {
      id: candidate.code || candidate.id,
      nome: candidate.full_name,
      cpf: candidate.cpf,
      cnpj: candidate.cnpj,
      endereco: candidate.address,
      email: candidate.email,
      telefone: candidate.phone,
      categoria: candidate.category,
      status: candidate.status,
      dados_adicionais: candidate.form_data,
      data_cadastro: candidate.created_at,
      data_aprovacao: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `interessado_${candidate.code || candidate.cpf?.replace(/\D/g, '') || candidate.cnpj?.replace(/\D/g, '') || candidate.id}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Arquivo JSON gerado com sucesso')
  }

  const openCandidateDetails = (candidate: PreRegistration) => {
    setSelectedCandidate(candidate)
    setIsDrawerOpen(true)
  }

  const toggleSort = () => {
    setSortDirection((prev) => {
      if (prev === null) return 'desc'
      if (prev === 'desc') return 'asc'
      return 'desc'
    })
  }

  const handleTabChange = (v: string) => {
    setActiveTab(v as PreRegistrationCategory)
    setNameFilter('')
    setDocFilter('')
  }

  const docLabel = activeTab === 'PJ' ? 'CNPJ' : 'CPF'

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if ((c.category || 'PF') !== activeTab) return false

      if (nameFilter.trim()) {
        const name = c.full_name?.toLowerCase() || ''
        if (!name.includes(nameFilter.trim().toLowerCase())) return false
      }

      if (docFilter.trim()) {
        const rawFilter = docFilter.trim().toLowerCase()
        const cleanFilter = rawFilter.replace(/\D/g, '')
        const docValue = activeTab === 'PJ' ? c.cnpj : c.cpf
        const rawDoc = docValue?.toLowerCase() || ''
        const cleanDoc = rawDoc.replace(/\D/g, '')

        if (cleanFilter && cleanDoc) {
          if (!cleanDoc.includes(cleanFilter) && !rawDoc.includes(rawFilter)) return false
        } else {
          if (!rawDoc.includes(rawFilter)) return false
        }
      }
      return true
    })
  }, [candidates, activeTab, nameFilter, docFilter])

  const sortedCandidates = useMemo(() => {
    if (!sortDirection) return filteredCandidates
    const sorted = [...filteredCandidates]
    sorted.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB
    })
    return sorted
  }, [filteredCandidates, sortDirection])

  if (loading && candidates.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 relative">
      {/* Subtle top indicator bar during 15s auto-refresh */}
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-pulse" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Gestão de Interessados
          </h2>
          {isRefreshing && (
            <span className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full animate-pulse font-medium">
              <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
              Atualizando...
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-2">
          <Button onClick={handleSync} disabled={syncing || loading} className="w-full sm:w-auto">
            {syncing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Sincronizar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="PF">Pessoa Física</TabsTrigger>
          <TabsTrigger value="PJ">Pessoa Jurídica</TabsTrigger>
          <TabsTrigger value="Fiador">Fiador</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar por nome..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Filtrar por ${docLabel}...`}
                value={docFilter}
                onChange={(e) => setDocFilter(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>

          <div className="rounded-md border bg-card overflow-hidden">
            {/*
              direction: rtl on container places vertical scrollbar on the left.
              Table uses direction: ltr so columns read standard left-to-right.
            */}
            <div
              ref={scrollContainerRef}
              style={{ direction: 'rtl' }}
              className="overflow-y-auto overflow-x-auto max-h-[60vh] scrollbar-thin"
            >
              <Table style={{ direction: 'ltr' }} className="w-full min-w-[750px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[110px] min-w-[100px]">Código</TableHead>
                    <TableHead
                      className="cursor-pointer select-none hover:bg-muted/50 w-[160px] min-w-[150px]"
                      onClick={toggleSort}
                    >
                      <div className="flex items-center gap-1">
                        Data de Entrada
                        {sortDirection === 'desc' && (
                          <ArrowDown className="h-3.5 w-3.5 text-primary font-bold" />
                        )}
                        {sortDirection === 'asc' && (
                          <ArrowUp className="h-3.5 w-3.5 text-primary font-bold" />
                        )}
                        {sortDirection === null && (
                          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[180px]">
                      {activeTab === 'PJ' ? 'Razão Social' : 'Nome'}
                    </TableHead>
                    <TableHead className="min-w-[140px]">
                      {activeTab === 'PJ' ? 'CNPJ' : 'CPF'}
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      {activeTab === 'PJ' ? 'Endereço' : 'Contato'}
                    </TableHead>
                    <TableHead className="w-[130px] min-w-[120px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCandidates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum registro encontrado nesta categoria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCandidates.map((candidate) => (
                      <TableRow
                        key={candidate.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => openCandidateDetails(candidate)}
                      >
                        <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                          {candidate.code || '-'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-slate-700">
                          {format(new Date(candidate.created_at), 'dd/MM/yyyy HH:mm', {
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {candidate.full_name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-mono text-sm">
                          {activeTab === 'PJ' ? candidate.cnpj || '-' : candidate.cpf || '-'}
                        </TableCell>
                        <TableCell>
                          {activeTab === 'PJ' ? (
                            <span
                              className="text-sm truncate max-w-[220px] block"
                              title={candidate.address || ''}
                            >
                              {candidate.address || '-'}
                            </span>
                          ) : (
                            <div className="flex flex-col text-sm">
                              <span
                                className="truncate max-w-[220px]"
                                title={candidate.email || ''}
                              >
                                {candidate.email || '-'}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {candidate.phone || '-'}
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge className={STATUS_COLORS[candidate.status]}>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95vh]">
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">
                {selectedCandidate?.code ? `${selectedCandidate.code} - ` : ''}
                {selectedCandidate?.full_name}
              </DrawerTitle>
              <DrawerDescription>
                Ficha detalhada do registro importado (Categoria: {selectedCandidate?.category})
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-6 overflow-y-auto max-h-[65vh]">
              {selectedCandidate && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg border">
                    {selectedCandidate.category === 'PJ' ? (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
                          <p className="font-medium">{selectedCandidate.cnpj || 'Não informado'}</p>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                          <p className="font-medium break-words">
                            {selectedCandidate.address || 'Não informado'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                          <p className="font-medium break-all">
                            {selectedCandidate.email || 'Não informado'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">CPF</p>
                          <p className="font-medium">{selectedCandidate.cpf || 'Não informado'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                          <p className="font-medium break-all">
                            {selectedCandidate.email || 'Não informado'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                          <p className="font-medium break-words">
                            {selectedCandidate.phone || 'Não informado'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            Data do Cadastro
                          </p>
                          <p className="font-medium">
                            {format(
                              new Date(selectedCandidate.created_at),
                              "dd/MM/yyyy 'às' HH:mm",
                              {
                                locale: ptBR,
                              },
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-800">
                      Endereço e Dados Pessoais
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-muted/20 p-4 rounded-lg border">
                      <div className="space-y-1 lg:col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                        <p
                          className="font-medium break-words"
                          title={
                            selectedCandidate.form_data?.Endereco ||
                            selectedCandidate.form_data?.Endereço ||
                            selectedCandidate.address ||
                            'Não informado'
                          }
                        >
                          {selectedCandidate.form_data?.Endereco ||
                            selectedCandidate.form_data?.Endereço ||
                            selectedCandidate.address ||
                            'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">CEP</p>
                        <p className="font-medium break-words">
                          {selectedCandidate.form_data?.CEP || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Bairro</p>
                        <p
                          className="font-medium break-words"
                          title={selectedCandidate.form_data?.Bairro || 'Não informado'}
                        >
                          {selectedCandidate.form_data?.Bairro || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Cidade</p>
                        <p
                          className="font-medium break-words"
                          title={selectedCandidate.form_data?.Cidade || 'Não informado'}
                        >
                          {selectedCandidate.form_data?.Cidade || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">UF</p>
                        <p className="font-medium break-words">
                          {(() => {
                            const formData = selectedCandidate.form_data || {}
                            const val =
                              formData.UF ||
                              formData.Uf ||
                              formData.Estado ||
                              formData.Estado_x002f_Provincia ||
                              Object.entries(formData).find(([k, v]) => {
                                const lower = k
                                  .toLowerCase()
                                  .replace(/_x[0-9a-f]{4}_/gi, ' ')
                                  .trim()
                                return (
                                  (lower === 'uf' ||
                                    lower.includes('estado') ||
                                    lower.includes('província') ||
                                    lower.includes('provincia')) &&
                                  v
                                )
                              })?.[1]
                            return val || 'Não informado'
                          })()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Dt Nasc</p>
                        <p className="font-medium break-words">
                          {(() => {
                            const formData = selectedCandidate.form_data || {}
                            const val =
                              formData.DataNascimento ||
                              formData.DtNasc ||
                              formData.Data_Nascimento ||
                              formData.DataNasc ||
                              formData.Nascimento ||
                              formData.Dt_Nasc ||
                              formData.Data_x0020_de_x0020_Nascimento ||
                              formData.Data_x0020_Nascimento ||
                              Object.entries(formData).find(([k, v]) => {
                                const lower = k
                                  .toLowerCase()
                                  .replace(/_x[0-9a-f]{4}_/gi, ' ')
                                  .trim()
                                return (
                                  (lower.includes('nasc') ||
                                    lower.includes('aniversario') ||
                                    lower.includes('aniversário')) &&
                                  v
                                )
                              })?.[1]

                            if (!val) return 'Não informado'
                            if (typeof val === 'string' && val.includes('T')) {
                              const [datePart] = val.split('T')
                              const parts = datePart.split('-')
                              if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
                            }
                            return val
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedCandidate.form_data &&
                    Object.keys(selectedCandidate.form_data).length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">
                          Dados Completos do Formulário
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-white p-5 rounded-lg border shadow-sm">
                          {Object.entries(selectedCandidate.form_data)
                            .filter(([key, value]) => {
                              if (value === null || value === undefined || value === '')
                                return false
                              if (typeof value === 'object') return false
                              const lower = key.toLowerCase()
                              if (
                                lower.startsWith('@odata') ||
                                lower === 'id' ||
                                lower === 'iteminternalid' ||
                                lower.startsWith('odata_')
                              )
                                return false
                              return true
                            })
                            .map(([key, value]) => {
                              const cleanKey = key
                                .replace(/_x[0-9a-fA-F]{4}_/g, ' ')
                                .replace(/([a-z])([A-Z])/g, '$1 $2')
                                .trim()
                              return (
                                <div key={key} className="space-y-1">
                                  <p className="text-sm font-medium text-muted-foreground capitalize">
                                    {cleanKey}
                                  </p>
                                  <p className="font-medium text-sm break-words whitespace-pre-wrap">
                                    {String(value)}
                                  </p>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}

                  <div className="space-y-4 bg-white p-5 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-lg flex items-center justify-between text-slate-800">
                      Controle e Andamento
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1 w-full max-w-xs">
                        <Select
                          disabled={
                            updating ||
                            ['Em Análise da Gerência', 'Aprovado'].includes(
                              selectedCandidate.status,
                            )
                          }
                          value={selectedCandidate.status}
                          onValueChange={(val: PreRegistrationStatus) =>
                            handleStatusChange(selectedCandidate.id, val)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCandidate.status === 'Aprovado' && (
                        <Button
                          onClick={() => handleExportJSON(selectedCandidate)}
                          className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Gerar JSON
                        </Button>
                      )}

                      {selectedCandidate.category !== 'Fiador' && (
                        <Button
                          disabled={
                            !['Novo', 'Documentação Pendente', 'Reprovado'].includes(
                              selectedCandidate.status,
                            )
                          }
                          onClick={() => setProcessDialogOpen(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                          title={
                            !['Novo', 'Documentação Pendente', 'Reprovado'].includes(
                              selectedCandidate.status,
                            )
                              ? 'Status atual não permite iniciar nova análise para evitar duplicidade'
                              : ''
                          }
                        >
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Iniciar Análise para Locação
                        </Button>
                      )}

                      {selectedCandidate.category !== 'Fiador' && (
                        <Button
                          onClick={() => setExistingProcessDialogOpen(true)}
                          className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                          title="Iniciar nova análise de locação para um imóvel diferente, reutilizando os dados cadastrais existentes"
                        >
                          <FileSearch className="mr-2 h-4 w-4" />
                          Análise de Ficha já existente PF, PJ
                        </Button>
                      )}
                    </div>
                  </div>

                  {selectedCandidate.documents_link && (
                    <div className="space-y-2 p-5 bg-blue-50/50 rounded-lg border border-blue-100">
                      <p className="text-sm font-semibold text-blue-900">Análise Documental</p>
                      <p className="text-sm text-blue-700 mb-3">
                        Acesse os arquivos enviados diretamente na nuvem.
                      </p>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full sm:w-auto border-blue-200 hover:bg-blue-50"
                      >
                        <a
                          href={selectedCandidate.documents_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Abrir Pasta no SharePoint / OneDrive
                        </a>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <DrawerFooter className="pt-2 border-t mt-4">
              <DrawerClose asChild>
                <Button variant="outline">Fechar Visualização</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <StartLeaseProcessDialog
        open={processDialogOpen}
        onClose={() => setProcessDialogOpen(false)}
        candidate={selectedCandidate}
        onSuccess={() => {
          setProcessDialogOpen(false)
          fetchCandidates(true)
        }}
      />

      <StartLeaseProcessDialog
        open={existingProcessDialogOpen}
        onClose={() => setExistingProcessDialogOpen(false)}
        candidate={selectedCandidate}
        onSuccess={() => {
          setExistingProcessDialogOpen(false)
          fetchCandidates(true)
        }}
      />
    </div>
  )
}
