import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { m365Service } from '@/services/m365Service'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function FormsOnline() {
  const [activeTab, setActiveTab] = useState('pf')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const loadData = async (tab: string) => {
    setLoading(true)
    setError(null)
    try {
      let result: { data: any[]; error: string | null }

      if (tab === 'pf') {
        const { data: pfSettings } = await supabase
          .from('app_settings')
          .select('module_settings')
          .maybeSingle()
        const pfFormsConfig = (pfSettings?.module_settings as any)?.forms_online || {}
        const pfShareLink =
          pfFormsConfig.pf_share_link ||
          'https://ismailabdo-my.sharepoint.com/:x:/g/personal/administracao_imobiliariacolina_com_br/IQAhJ40nkv8qT4sJgvSRuZewAZZfmbnW1eYpXf12tbKU4t0'
        const pfSheetName = pfFormsConfig.pf_sheet_name || 'Sheet1'
        result = await m365Service.fetchExcelRowsByShareLink(pfShareLink, pfSheetName)
      } else {
        const { data: settings } = await supabase
          .from('app_settings')
          .select('module_settings')
          .maybeSingle()
        const formsConfig = (settings?.module_settings as any)?.forms_online || {}

        let shareLink = ''
        let sheetName = ''

        if (tab === 'pj') {
          shareLink = formsConfig.pj_share_link || ''
          sheetName = formsConfig.pj_sheet_name || 'Sheet1'
        } else if (tab === 'fiador') {
          shareLink = formsConfig.fiador_share_link || ''
          sheetName = formsConfig.fiador_sheet_name || 'Sheet1'
        }

        if (!shareLink) {
          const tabLabel = tab === 'pj' ? 'Pessoa Jurídica' : 'Fiador'
          result = {
            data: [],
            error: `Link de compartilhamento não configurado para a aba "${tabLabel}". Acesse as Configurações do sistema para definir o link.`,
          }
        } else {
          result = await m365Service.fetchExcelRowsByShareLink(shareLink, sheetName)
        }
      }

      if (result?.error) {
        setError(result.error)
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        })
      } else {
        setError(null)
        toast({
          title: 'Autenticado com sucesso',
          description: `Bem-vindo(a), ${user?.name || 'Usuário'}`,
        })
      }

      setData(result?.data || [])
    } catch (err) {
      console.error('Error fetching SharePoint data:', err)
      const errMsg =
        err instanceof Error
          ? err.message
          : 'Houve um erro ao se comunicar com a API do Microsoft 365. Verifique a sua conexão e configurações.'
      setError(errMsg)
      toast({
        variant: 'destructive',
        title: 'Erro de Rede ou Configuração',
        description: errMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(activeTab)
    setSearch('')
  }, [activeTab])

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(search.toLowerCase())),
  )

  const renderTable = () => (
    <div className="bg-white border rounded-md shadow-sm">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
          <p className="text-sm font-medium text-gray-700 max-w-md">{error}</p>
          <Button
            onClick={() => loadData(activeTab)}
            variant="outline"
            size="sm"
            className="mt-4 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-gray-500">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {row.Nome || row.Name || row.nome || row.Title || 'N/A'}
                  </TableCell>
                  <TableCell>{row.Data || row.Date || row.data || row.Created || 'N/A'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (row.Status || row.status || '').toLowerCase() === 'aprovado'
                          ? 'bg-green-100 text-green-800'
                          : (row.Status || row.status || '').toLowerCase() === 'reprovado'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {row.Status || row.status || 'Recebido'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRow(row)}>
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Formulário</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-1">
                          {Object.entries(selectedRow || {}).map(([key, value]) => {
                            if (key.startsWith('@odata') || key.startsWith('ItemInternalId'))
                              return null
                            if (typeof value === 'object' && value !== null) return null
                            return (
                              <div key={key} className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">{key}</p>
                                <p className="text-sm text-gray-900 break-words">
                                  {value !== null && value !== undefined ? String(value) : '-'}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Formulários OnLine</h1>
          <p className="text-gray-500 mt-2">
            Visualize os formulários de cadastro preenchidos no SharePoint.
          </p>
        </div>
        <Button onClick={() => loadData(activeTab)} variant="outline" size="sm" className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
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
          {renderTable()}
        </TabsContent>
        <TabsContent value="pj" className="mt-6">
          {renderTable()}
        </TabsContent>
        <TabsContent value="fiador" className="mt-6">
          {renderTable()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
