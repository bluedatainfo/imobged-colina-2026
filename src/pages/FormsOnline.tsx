import { useEffect, useState, useMemo, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, RefreshCw, Clock, FileSpreadsheet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase/client'
import { m365Service } from '@/services/m365Service'
import { getExcelTimestamp } from '@/lib/date-utils'
import {
  FormsOnlineTable,
  type SortColumn,
  type SortDirection,
} from '@/components/FormsOnlineTable'
import { SyncPreviewTable } from '@/components/SyncPreviewTable'

const REFRESH_INTERVAL = 15000

interface TabConfig {
  shareLinkKey: string
  sheetNameKey: string
  category: string
}

const TAB_CONFIGS: Record<string, TabConfig> = {
  pf: { shareLinkKey: 'pf_share_link', sheetNameKey: 'pf_sheet_name', category: 'PF' },
  pj: { shareLinkKey: 'pj_share_link', sheetNameKey: 'pj_sheet_name', category: 'PJ' },
  fiador: {
    shareLinkKey: 'fiador_share_link',
    sheetNameKey: 'fiador_sheet_name',
    category: 'FIADOR',
  },
}

const COLUMN_MAPPINGS: Record<string, string> = {
  'nome completo': 'full_name',
  nome: 'full_name',
  nome1: 'full_name',
  name: 'full_name',
  cpf: 'cpf',
  cnpj: 'cnpj',
  email: 'email',
  'e-mail': 'email',
  telefone: 'phone',
  celular: 'phone',
  phone: 'phone',
  endereço: 'address',
  endereco: 'address',
  address: 'address',
  status: 'status',
  'data de envio': 'created_at',
  data: 'created_at',
  'data/hora': 'created_at',
  'data de início': 'created_at',
  'data de inicio': 'created_at',
  'data inicio': 'created_at',
  'data/hora de início': 'created_at',
  'hora de inicio': 'created_at',
  'hora de início': 'created_at',
  'hora de início do formulário': 'created_at',
  'hora de inicio do formulario': 'created_at',
  'start time': 'created_at',
  starttime: 'created_at',
  'link dos documentos': 'documents_link',
  documentos: 'documents_link',
  código: 'code',
  codigo: 'code',
  code: 'code',
  categoria: 'category',
  category: 'category',
}

function normalizeExcelRow(row: Record<string, any>, category: string, index: number): any {
  const normalized: any = {
    form_data: {} as Record<string, any>,
    category,
    status: 'Novo',
    id: `${category}-${index}`,
  }

  const unmappedFields: Record<string, any> = {}

  for (const [key, value] of Object.entries(row)) {
    const normalizedKey = key?.toLowerCase()?.trim() || ''
    const mappedField = COLUMN_MAPPINGS[normalizedKey]

    if (mappedField) {
      normalized[mappedField] = value
    } else if (key) {
      unmappedFields[key] = value
    }
  }

  normalized.form_data = unmappedFields

  const nome1Key = Object.keys(row).find((k) => k?.toLowerCase()?.trim() === 'nome1')
  if (nome1Key && row[nome1Key] != null && row[nome1Key] !== '') {
    normalized.full_name = row[nome1Key]
  }

  const horaInicioKey = Object.keys(row).find((k) => k?.toLowerCase()?.trim() === 'hora de início')
  if (horaInicioKey && row[horaInicioKey] != null && row[horaInicioKey] !== '') {
    normalized.created_at = row[horaInicioKey]
  }

  if (!normalized.full_name) {
    normalized.full_name = normalized.email || `Registro ${index + 1}`
  }

  return normalized
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour12: false })
}

export default function FormsOnline() {
  const [activeTab, setActiveTab] = useState('pf')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sortColumn, setSortColumn] = useState<SortColumn>('datetime')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [autoRefreshing, setAutoRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [syncDialogOpen, setSyncDialogOpen] = useState(false)
  const [currentShareLink, setCurrentShareLink] = useState<string | null>(null)
  const [currentSheetName, setCurrentSheetName] = useState<string>('Sheet1')
  const [syncedData, setSyncedData] = useState<any[] | null>(null)
  const [syncLoading, setSyncLoading] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const { toast } = useToast()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadData = async (tab: string, silent = false) => {
    if (silent) setAutoRefreshing(true)
    else {
      setLoading(true)
      setError(null)
    }

    try {
      const tabConfig = TAB_CONFIGS[tab]
      if (!tabConfig) {
        setError('Configuração de aba não encontrada.')
        setData([])
        return
      }

      if (!m365Service.isAuthenticated()) {
        setError(
          'Conexão com Microsoft 365 não encontrada. Por favor, realize o login em Configurações.',
        )
        setData([])
        return
      }

      const { data: settings } = await supabase
        .from('app_settings')
        .select('module_settings')
        .maybeSingle()

      const formsConfig = (settings?.module_settings as any)?.forms_online || {}
      const shareLink = formsConfig[tabConfig.shareLinkKey]
      const sheetName = formsConfig[tabConfig.sheetNameKey] || 'Sheet1'
      setCurrentShareLink(shareLink || null)
      setCurrentSheetName(sheetName)

      if (!shareLink) {
        setError(
          `Link de compartilhamento não configurado para ${tabConfig.category}. Acesse as Configurações para configurar.`,
        )
        setData([])
        return
      }

      const result = await m365Service.fetchExcelRowsByShareLink(shareLink, sheetName)

      if (result.error) {
        setError(result.error)
        if (!silent) {
          toast({ variant: 'destructive', title: 'Erro', description: result.error })
        }
        setData([])
      } else {
        const normalizedData = (result.data || []).map((row, idx) =>
          normalizeExcelRow(row, tabConfig.category, idx),
        )
        setError(null)
        setLastUpdated(new Date())
        setData(normalizedData)
        if (!silent) {
          toast({
            title: 'Dados carregados',
            description: `${normalizedData.length} formulário(s) encontrado(s).`,
          })
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao buscar dados da planilha Excel.'
      if (!silent) {
        setError(msg)
        toast({ variant: 'destructive', title: 'Erro', description: msg })
      } else {
        setError(msg)
      }
      setData([])
    } finally {
      setLoading(false)
      setAutoRefreshing(false)
    }
  }

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => loadData(activeTab, true), REFRESH_INTERVAL)
  }

  useEffect(() => {
    loadData(activeTab)
    setSearch('')
    setSyncedData(null)
    setSyncError(null)
  }, [activeTab])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [activeTab])

  const handleManualRefresh = () => {
    loadData(activeTab)
    startInterval()
  }

  const handleSyncClick = async () => {
    if (!currentShareLink) {
      toast({
        variant: 'destructive',
        title: 'Link não configurado',
        description: 'Não há link de compartilhamento configurado para esta aba.',
      })
      return
    }
    setSyncDialogOpen(true)
    setSyncLoading(true)
    setSyncError(null)
    setSyncedData(null)

    const result = await m365Service.syncWithSession(currentShareLink, currentSheetName)
    if (result.error) {
      setSyncError(result.error)
    } else {
      setSyncedData(result.data || [])
    }
    setSyncLoading(false)
  }

  const handleSyncDialogClose = (open: boolean) => {
    setSyncDialogOpen(open)
    if (!open) {
      if (syncedData && syncedData.length > 0) {
        const tabConfig = TAB_CONFIGS[activeTab]
        const normalizedData = syncedData.map((row, idx) =>
          normalizeExcelRow(row, tabConfig.category, idx),
        )
        setError(null)
        setLastUpdated(new Date())
        setData(normalizedData)
        toast({
          title: 'Dados sincronizados',
          description: `${normalizedData.length} formulário(s) encontrado(s).`,
        })
      }
      handleManualRefresh()
    }
  }

  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) setSortDirection((p) => (p === 'asc' ? 'desc' : 'asc'))
    else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase()
    const filtered = data.filter((item) => {
      const flatValues = [
        ...Object.values(item).filter((v) => typeof v !== 'object' || v === null),
        JSON.stringify(item.form_data || {}),
      ]
      return flatValues.some((val) => String(val).toLowerCase().includes(searchLower))
    })
    return [...filtered].sort((a, b) => {
      const aVal =
        sortColumn === 'nome' ? (a.full_name || '').toLowerCase() : getExcelTimestamp(a.created_at)
      const bVal =
        sortColumn === 'nome' ? (b.full_name || '').toLowerCase() : getExcelTimestamp(b.created_at)
      const cmp =
        sortColumn === 'nome'
          ? String(aVal).localeCompare(String(bVal))
          : (aVal as number) - (bVal as number)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [data, search, sortColumn, sortDirection])

  const tableProps = {
    data: filteredData,
    loading,
    error,
    sortColumn,
    sortDirection,
    onToggleSort: toggleSort,
    onRetry: handleManualRefresh,
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Formulários OnLine</h1>
          <p className="text-gray-500 mt-2">
            Visualize os formulários de cadastro recebidos em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {lastUpdated && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              Última atualização: {formatTime(lastUpdated)}
            </span>
          )}
          {autoRefreshing && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 animate-fade-in">
              <Loader2 className="h-3 w-3 animate-spin" />
              Sincronizando...
            </span>
          )}
          <Button onClick={handleSyncClick} variant="default" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Sincronizar Dados
          </Button>
          <Button onClick={handleManualRefresh} variant="outline" size="sm" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar nos formulários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="pf">Pessoa Física</TabsTrigger>
          <TabsTrigger value="pj">Pessoa Jurídica</TabsTrigger>
          <TabsTrigger value="fiador">Fiador</TabsTrigger>
        </TabsList>
        <TabsContent value="pf" className="mt-6">
          <FormsOnlineTable {...tableProps} />
        </TabsContent>
        <TabsContent value="pj" className="mt-6">
          <FormsOnlineTable {...tableProps} />
        </TabsContent>
        <TabsContent value="fiador" className="mt-6">
          <FormsOnlineTable {...tableProps} />
        </TabsContent>
      </Tabs>

      <Dialog open={syncDialogOpen} onOpenChange={handleSyncDialogClose}>
        <DialogContent className="max-w-5xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Sincronizar Dados — {TAB_CONFIGS[activeTab]?.category}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Aguarde o carregamento completo da planilha para garantir a sincronização dos dados.
            Após o carregamento, você pode fechar esta janela para ver a lista atualizada.
          </p>
          <SyncPreviewTable
            data={syncedData}
            loading={syncLoading}
            error={syncError}
            onRetry={handleSyncClick}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
