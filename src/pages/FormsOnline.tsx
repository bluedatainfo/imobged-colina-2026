import { useEffect, useState, useMemo, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, RefreshCw, Clock } from 'lucide-react'
import { m365Service } from '@/services/m365Service'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { getExcelTimestamp } from '@/lib/date-utils'
import { syncFormsToPreRegistrations } from '@/services/forms-online-sync'
import {
  FormsOnlineTable,
  type SortColumn,
  type SortDirection,
} from '@/components/FormsOnlineTable'

const TAB_CATEGORY: Record<string, string> = { pf: 'PF', pj: 'PJ', fiador: 'FIADOR' }
const REFRESH_INTERVAL = 15000
const DEFAULT_PF_LINK =
  'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQBNKTCco7MNQ52u0sOI-ypSAZObr3fn7lVuv_RbWiZ94Dg?e=HPD0RS'

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
  const { toast } = useToast()
  const { user } = useAuth()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadData = async (tab: string, silent = false) => {
    if (silent) setAutoRefreshing(true)
    else {
      setLoading(true)
      setError(null)
    }

    try {
      const { data: settings } = await supabase
        .from('app_settings')
        .select('module_settings')
        .maybeSingle()
      const cfg = (settings?.module_settings as any)?.forms_online || {}

      let shareLink = ''
      let sheetName = 'Sheet1'

      if (tab === 'pf') {
        shareLink = cfg.pf_share_link || DEFAULT_PF_LINK
        sheetName = cfg.pf_sheet_name || 'Sheet1'
      } else if (tab === 'pj') {
        shareLink = cfg.pj_share_link || ''
        sheetName = cfg.pj_sheet_name || 'Sheet1'
      } else if (tab === 'fiador') {
        shareLink = cfg.fiador_share_link || ''
        sheetName = cfg.fiador_sheet_name || 'Sheet1'
      }

      let result: { data: any[]; error: string | null }

      if (!shareLink) {
        const label = tab === 'pj' ? 'Pessoa Jurídica' : 'Fiador'
        result = {
          data: [],
          error: `Link de compartilhamento não configurado para a aba "${label}". Acesse as Configurações do sistema para definir o link.`,
        }
      } else {
        result = await m365Service.fetchExcelRowsByShareLink(shareLink, sheetName)
      }

      if (result?.error) {
        setError(result.error)
        if (!silent) toast({ variant: 'destructive', title: 'Erro', description: result.error })
      } else {
        setError(null)
        setLastUpdated(new Date())
        if (!silent)
          toast({
            title: 'Autenticado com sucesso',
            description: `Bem-vindo(a), ${user?.name || 'Usuário'}`,
          })
        const category = TAB_CATEGORY[tab] || 'PF'
        syncFormsToPreRegistrations(result?.data || [], category).then((r) => {
          if (r.error) console.error('Sync error:', r.error)
        })
      }

      setData(result?.data || [])
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Houve um erro ao se comunicar com a API do Microsoft 365. Verifique a sua conexão e configurações.'
      setError(msg)
      if (!silent)
        toast({ variant: 'destructive', title: 'Erro de Rede ou Configuração', description: msg })
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

  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) setSortDirection((p) => (p === 'asc' ? 'desc' : 'asc'))
    else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(search.toLowerCase())),
    )
    return [...filtered].sort((a, b) => {
      const aVal =
        sortColumn === 'nome'
          ? (activeTab === 'pj'
              ? a['Razão Social'] || a['Razao Social'] || ''
              : a['Nome1'] || a.Nome || a.Name || ''
            ).toLowerCase()
          : getExcelTimestamp(a['Hora de início'] || a['Start time'] || a.Data || a.Date || '')
      const bVal =
        sortColumn === 'nome'
          ? (activeTab === 'pj'
              ? b['Razão Social'] || b['Razao Social'] || ''
              : b['Nome1'] || b.Nome || b.Name || ''
            ).toLowerCase()
          : getExcelTimestamp(b['Hora de início'] || b['Start time'] || b.Data || b.Date || '')
      const cmp =
        sortColumn === 'nome'
          ? String(aVal).localeCompare(String(bVal))
          : (aVal as number) - (bVal as number)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [data, search, sortColumn, sortDirection, activeTab])

  const tableProps = {
    data: filteredData,
    loading,
    error,
    activeTab,
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
            Visualize os formulários de cadastro preenchidos no SharePoint.
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
    </div>
  )
}
