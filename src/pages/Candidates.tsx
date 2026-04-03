import { useEffect, useState } from 'react'
import { candidatesService, PreRegistration, PreRegistrationStatus } from '@/services/candidates'
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
import { toast } from 'sonner'
import { Download, ExternalLink, Loader2 } from 'lucide-react'
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
  const [selectedCandidate, setSelectedCandidate] = useState<PreRegistration | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidatesService.getCandidates()
      setCandidates(data)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar candidatos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

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
      email: candidate.email,
      telefone: candidate.phone,
      status: candidate.status,
      dados_adicionais: candidate.form_data,
      data_cadastro: candidate.created_at,
      data_aprovacao: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `candidato_${candidate.cpf?.replace(/\D/g, '') || candidate.id}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Arquivo JSON gerado com sucesso')
  }

  const openCandidateDetails = (candidate: PreRegistration) => {
    setSelectedCandidate(candidate)
    setIsDrawerOpen(true)
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Gestão de Candidatos</h2>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data de Entrada</TableHead>
              <TableHead>Nome do Candidato</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum candidato na fila no momento.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openCandidateDetails(candidate)}
                >
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(candidate.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="font-medium">{candidate.full_name}</TableCell>
                  <TableCell>{candidate.cpf || '-'}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{candidate.email}</span>
                      <span className="text-muted-foreground">{candidate.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[candidate.status]}>{candidate.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[95vh]">
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">{selectedCandidate?.full_name}</DrawerTitle>
              <DrawerDescription>
                Ficha detalhada do pré-cadastro recebido via Microsoft Forms
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-6 overflow-y-auto max-h-[65vh]">
              {selectedCandidate && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg border">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">CPF</p>
                      <p className="font-medium">{selectedCandidate.cpf || 'Não informado'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                      <p className="font-medium">{selectedCandidate.email || 'Não informado'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedCandidate.phone || 'Não informado'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Data do Cadastro</p>
                      <p className="font-medium">
                        {format(new Date(selectedCandidate.created_at), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
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
                          Gerar JSON para Sistema Local
                        </Button>
                      )}
                    </div>
                  </div>

                  {selectedCandidate.documents_link && (
                    <div className="space-y-2 p-5 bg-blue-50/50 rounded-lg border border-blue-100">
                      <p className="text-sm font-semibold text-blue-900">Análise Documental</p>
                      <p className="text-sm text-blue-700 mb-3">
                        Acesse os arquivos enviados pelo candidato diretamente na nuvem.
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
                      Respostas Adicionais do Formulário
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
