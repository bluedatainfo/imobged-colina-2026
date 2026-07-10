import { useEffect, useState, useMemo, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, RefreshCw, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import {
  FormsOnlineTable,
  type SortColumn,
  type SortDirection,
} from '@/components/FormsOnlineTable'

const TAB_CATEGORIES: Record<string, string[]> = {
  pf: ['PF', 'Pessoa Física'],
  pj: ['PJ', 'Pessoa Jurídica'],
  fiador: ['FIADOR', 'Fiador'],
}
const REFRESH_INTERVAL = 15000

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadData = async (tab: string, silent = false) => {
    if (silent) setAutoRefreshing(true)
    else {
      setLoading(true)
      setError(null)
    }

    try {
      const categories = TAB_CATEGORIES[tab] || ['PF']
      const { data: rows, error: fetchError } = await supabase
        .from('pre_registrations')
        .select('*')
        .in('category', categories)
        .order('created_at', { ascending: false })

      if (fetchError) throw new Error(fetchError.message)

      setError(null)
      setLastUpdated(new Date())
      if (!silent) {
        toast({
          title: 'Dados carregados',
          description: `${rows?.length || 0} formulário(s) encontrado(s).`,
        })
      }
      setData(rows || [])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao buscar dados do banco de dados.'
      if (!silent) {
        setError(msg)
        toast({ variant: 'destructive', title: 'Erro', description: msg })
      } else {
        setError(msg)
      }
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
        sortColumn === 'nome'
          ? (a.full_name || '').toLowerCase()
          : new Date(a.created_at || 0).getTime()
      const bVal =
        sortColumn === 'nome'
          ? (b.full_name || '').toLowerCase()
          : new Date(b.created_at || 0).getTime()
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
