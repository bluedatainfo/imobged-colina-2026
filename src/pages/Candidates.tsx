import { useEffect, useState } from 'react'
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
import { Download, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

export default function Candidates() {
  const [candidates, setCandidates] = useState<PreRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<PreRegistration | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState<PreRegistrationCategory>('PF')

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidatesService.getCandidates()
      setCandidates(data)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar interessados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const handleSync = async () => {
    try {
      setSyncing(true)
      const count = await candidatesService.syncFromSharePoint()
      if (count > 0) {
        toast.success(`${count} novos interessados sincronizados com sucesso!`)
      } else {
        toast.info('Nenhum novo registro encontrado no SharePoint.')
      }
      await fetchCandidates()
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
      id: candidate.id,
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
    a.download = `interessado_${candidate.cpf?.replace(/\D/g, '') || candidate.cnpj?.replace(/\D/g, '') || candidate.id}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Arquivo JSON gerado com sucesso')
  }

  const openCandidateDetails = (candidate: PreRegistration) => {
    setSelectedCandidate(candidate)
    setIsDrawerOpen(true)
  }

  const filteredCandidates = candidates.filter((c) => (c.category || 'PF') === activeTab)

  if (loading && candidates.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Gestão de Interessados</h2>
        <Button onClick={handleSync} disabled={syncing || loading} className="w-full sm:w-auto">
          {syncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Sincronizar SharePoint
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as PreRegistrationCategory)}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="PF">Pessoa Física</TabsTrigger>
          <TabsTrigger value="PJ">Pessoa Jurídica</TabsTrigger>
          <TabsTrigger value="Fiador">Fiador</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data de Entrada</TableHead>
                  <TableHead>{activeTab === 'PJ' ? 'Razão Social' : 'Nome'}</TableHead>
                  <TableHead>{activeTab === 'PJ' ? 'CNPJ' : 'CPF'}</TableHead>
                  <TableHead>{activeTab === 'PJ' ? 'Endereço' : 'Contato'}</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum registro encontrado nesta categoria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => openCandidateDetails(candidate)}
                    >
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(candidate.created_at), 'dd/MM/yyyy HH:mm', {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell className="font-medium">{candidate.full_name}</TableCell>
                      <TableCell>
                        {activeTab === 'PJ' ? candidate.cnpj || '-' : candidate.cpf || '-'}
                      </TableCell>
                      <TableCell>
                        {activeTab === 'PJ' ? (
                          <span className="text-sm truncate max-w-[200px] block">
                            {candidate.address || '-'}
                          </span>
                        ) : (
                          <div className="flex flex-col text-sm">
                            <span>{candidate.email || '-'}</span>
                            <span className="text-muted-foreground">{candidate.phone || '-'}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
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
        </TabsContent>
      </Tabs>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95vh]">
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">{selectedCandidate?.full_name}</DrawerTitle>
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
                          <p className="font-medium">
                            {selectedCandidate.address || 'Não informado'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                          <p className="font-medium">
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
                          <p className="font-medium">
                            {selectedCandidate.email || 'Não informado'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                          <p className="font-medium">
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
                          className="font-medium truncate"
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
                        <p className="font-medium">
                          {selectedCandidate.form_data?.CEP || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Bairro</p>
                        <p
                          className="font-medium truncate"
                          title={selectedCandidate.form_data?.Bairro || 'Não informado'}
                        >
                          {selectedCandidate.form_data?.Bairro || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Cidade</p>
                        <p
                          className="font-medium truncate"
                          title={selectedCandidate.form_data?.Cidade || 'Não informado'}
                        >
                          {selectedCandidate.form_data?.Cidade || 'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">UF</p>
                        <p className="font-medium">
                          {selectedCandidate.form_data?.UF ||
                            selectedCandidate.form_data?.Estado ||
                            'Não informado'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Dt Nasc</p>
                        <p className="font-medium">
                          {(() => {
                            const val =
                              selectedCandidate.form_data?.DataNascimento ||
                              selectedCandidate.form_data?.DtNasc ||
                              selectedCandidate.form_data?.Data_x0020_de_x0020_Nascimento
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

                  <div className="space-y-4 bg-white p-5 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-lg flex items-center justify-between text-slate-800">
                      Controle e Andamento
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1 w-full max-w-xs">
                        <Select
                          disabled={updating}
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

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-800">
                      Dados Adicionais do Formulário
                    </p>
                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(selectedCandidate.form_data, null, 2)}
                    </pre>
                  </div>
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
    </div>
  )
}
