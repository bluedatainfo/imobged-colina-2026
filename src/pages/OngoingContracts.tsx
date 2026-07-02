import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Eye,
  CheckCircle,
  Building,
  FileText,
  Loader2,
  MapPin,
  DollarSign,
  User,
  FolderOpen,
  Home,
  ExternalLink,
  CheckCheck,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { m365Service } from '@/lib/m365'

const formatCurrency = (amount: number | string | null | undefined) => {
  if (amount === null || amount === undefined || amount === '') return 'Não informado'
  const value = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(value)) return 'Não informado'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const formatCpfCnpj = (v: string | null | undefined) => {
  if (!v) return 'Não informado'
  const numbers = v.replace(/\D/g, '')
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14)
  }
  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18)
}

const FINALIZED_STATUS = 'Contrato Finalizado'

export default function OngoingContracts() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [propertyStatuses, setPropertyStatuses] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active')
  const [finalizingId, setFinalizingId] = useState<string | null>(null)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [property, setProperty] = useState<any>(null)
  const [loadingProperty, setLoadingProperty] = useState(false)
  const [propertyDocs, setPropertyDocs] = useState<any[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loadingPreviewId, setLoadingPreviewId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data, error } = await supabase
          .from('pre_registrations')
          .select('*')
          .eq('status', 'Aprovado')
          .order('updated_at', { ascending: false })
        if (error) throw error
        setCandidates(data || [])

        if (data && data.length > 0) {
          const candidateIds = data.map((c) => c.id)
          const { data: props, error: propError } = await supabase
            .from('properties')
            .select('id, tenant_id, status')
            .in('tenant_id', candidateIds)

          if (!propError && props) {
            const statusMap: Record<string, string> = {}
            props.forEach((p) => {
              if (p.tenant_id) statusMap[p.tenant_id] = p.status
            })
            setPropertyStatuses(statusMap)
          }
        }
      } catch (err: any) {
        toast({ title: 'Erro ao buscar dados', description: err.message, variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [])

  const handleFinalizeContract = async (candidate: any) => {
    setFinalizingId(candidate.id)
    try {
      const { data: prop, error: propError } = await supabase
        .from('properties')
        .select('id')
        .eq('tenant_id', candidate.id)
        .maybeSingle()

      if (propError) throw propError
      if (!prop) {
        toast({
          title: 'Erro',
          description: 'Nenhum imóvel vinculado encontrado para finalizar o contrato.',
          variant: 'destructive',
        })
        return
      }

      const { error: updateError } = await supabase
        .from('properties')
        .update({ status: FINALIZED_STATUS, updated_at: new Date().toISOString() })
        .eq('id', prop.id)

      if (updateError) throw updateError

      setPropertyStatuses((prev) => ({ ...prev, [candidate.id]: FINALIZED_STATUS }))
      toast({
        title: 'Contrato Finalizado',
        description: `O contrato de ${candidate.full_name} foi marcado como finalizado.`,
      })
    } catch (err: any) {
      toast({
        title: 'Erro ao finalizar contrato',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setFinalizingId(null)
    }
  }

  const handleOpenDetails = async (candidate: any) => {
    setSelectedCandidate(candidate)
    setProperty(null)
    setPropertyDocs([])
    setLoadingProperty(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*, owners(*)')
        .eq('tenant_id', candidate.id)
        .maybeSingle()
      if (error) throw error
      setProperty(data)
      if (data) {
        const { data: docs } = await supabase
          .from('property_documents')
          .select('*')
          .eq('property_id', data.id)
        setPropertyDocs(docs || [])
      }
    } catch (err: any) {
      toast({ title: 'Erro ao buscar imóvel', description: err.message, variant: 'destructive' })
    } finally {
      setLoadingProperty(false)
    }
  }

  const handlePreviewDoc = async (doc: any) => {
    setLoadingPreviewId(doc.id)
    try {
      const url = await m365Service.getFilePreviewUrl(doc.file_path, doc.category)
      if (url) {
        setPreviewUrl(url)
      } else {
        toast({
          title: 'Aviso',
          description: 'Não foi possível gerar preview do arquivo.',
          variant: 'destructive',
        })
      }
    } catch (err: any) {
      toast({ title: 'Erro ao abrir documento', description: err.message, variant: 'destructive' })
    } finally {
      setLoadingPreviewId(null)
    }
  }

  const renderDocGroup = (title: string, docs: any[]) => {
    if (docs.length === 0) return null
    return (
      <div className="space-y-2 mt-4">
        <Label className="text-muted-foreground text-xs font-semibold uppercase">{title}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2 bg-background border rounded-md shadow-sm hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-sm truncate font-medium" title={doc.name}>
                  {doc.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 shrink-0"
                onClick={() => handlePreviewDoc(doc)}
              >
                {loadingPreviewId === doc.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const isFinalized = (candidateId: string) => propertyStatuses[candidateId] === FINALIZED_STATUS

  const displayedCandidates = candidates.filter((c) =>
    activeTab === 'active' ? !isFinalized(c.id) : isFinalized(c.id),
  )

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )
    }

    if (displayedCandidates.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>
            {activeTab === 'active'
              ? 'Nenhum dossiê em andamento encontrado.'
              : 'Nenhum dossiê finalizado encontrado.'}
          </p>
        </div>
      )
    }

    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCandidates.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.full_name}</TableCell>
                <TableCell>{formatCpfCnpj(c.cpf || c.cnpj)}</TableCell>
                <TableCell>
                  <div className="text-sm">{c.email || '-'}</div>
                  <div className="text-xs text-muted-foreground">{c.phone || '-'}</div>
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(c.updated_at || c.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      isFinalized(c.id)
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-green-50 text-green-600 border-green-200'
                    }
                  >
                    {isFinalized(c.id) ? FINALIZED_STATUS : c.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(c)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ficha Detalhada
                    </Button>
                    {activeTab === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFinalizeContract(c)}
                        disabled={finalizingId === c.id}
                      >
                        {finalizingId === c.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCheck className="w-4 h-4 mr-2" />
                        )}
                        Contrato Finalizado
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <CheckCircle className="w-8 h-8" />
          Contratos em Andamento
        </h1>
        <p className="text-muted-foreground">
          Visualize os dossiês aprovados e contratos em andamento.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Em Andamento</TabsTrigger>
          <TabsTrigger value="finished">Finalizados</TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>
              {activeTab === 'active' ? 'Dossiês em Andamento' : 'Dossiês Finalizados'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'active'
                ? 'Lista de interessados com dossiê aprovado e contrato ativo'
                : 'Lista de contratos que foram finalizados'}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderTable()}</CardContent>
        </Card>
      </Tabs>

      <Sheet open={!!selectedCandidate} onOpenChange={(val) => !val && setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col p-0 border-l">
          <div className="p-6 border-b bg-muted/30">
            <SheetHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <SheetTitle className="text-2xl">Ficha Detalhada</SheetTitle>
                  <SheetDescription className="mt-1">
                    Visualização de Dossiê de Locação (Somente Leitura)
                  </SheetDescription>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedCandidate && isFinalized(selectedCandidate.id)
                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                      : 'bg-green-50 text-green-600 border-green-200'
                  }
                >
                  {selectedCandidate && isFinalized(selectedCandidate.id)
                    ? FINALIZED_STATUS
                    : selectedCandidate?.status}
                </Badge>
              </div>
            </SheetHeader>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <FileText className="w-5 h-5 text-primary" /> Informações do Interessado
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Nome / Razão Social</Label>
                    <div className="font-medium">{selectedCandidate?.full_name}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">CPF / CNPJ</Label>
                    <div className="font-medium">
                      {formatCpfCnpj(selectedCandidate?.cpf || selectedCandidate?.cnpj)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <div className="font-medium truncate" title={selectedCandidate?.email || '-'}>
                      {selectedCandidate?.email || '-'}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Telefone</Label>
                    <div className="font-medium">{selectedCandidate?.phone || '-'}</div>
                  </div>
                </div>
                {selectedCandidate?.documents_link && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a
                      href={selectedCandidate.documents_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="w-4 h-4 mr-2" /> Ver Documentos Anexados
                    </a>
                  </Button>
                )}
              </div>

              <div className="space-y-4 bg-muted/20 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 border-border/50">
                  <Building className="w-5 h-5 text-primary" /> Imóvel Pretendido
                </h3>
                {loadingProperty ? (
                  <div className="flex items-center gap-2 text-muted-foreground py-4 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" /> Buscando imóvel vinculado...
                  </div>
                ) : property ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-lg">{property.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{property.address}</span>
                        </div>
                      </div>
                      <Badge>{property.type}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded-md border shadow-sm mb-4">
                      <div>
                        <Label className="text-muted-foreground text-xs flex items-center gap-1">
                          <User className="w-3 h-3" /> Proprietário
                        </Label>
                        <div
                          className="font-medium mt-0.5 text-sm truncate"
                          title={
                            (Array.isArray(property.owners)
                              ? property.owners[0]?.full_name
                              : property.owners?.full_name) ||
                            property.details?.ownerName ||
                            'Não informado'
                          }
                        >
                          {(Array.isArray(property.owners)
                            ? property.owners[0]?.full_name
                            : property.owners?.full_name) ||
                            property.details?.ownerName ||
                            'Não informado'}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> CPF do Proprietário
                        </Label>
                        <div className="font-medium mt-0.5 text-sm">
                          {formatCpfCnpj(
                            (Array.isArray(property.owners)
                              ? property.owners[0]?.cpf
                              : property.owners?.cpf) || property.details?.ownerCpf,
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded-md border shadow-sm">
                      <div>
                        <Label className="text-muted-foreground text-xs flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> Valor do Aluguel
                        </Label>
                        <div className="font-semibold text-lg text-primary mt-0.5">
                          {formatCurrency(property.rent_value)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Status do Imóvel
                        </Label>
                        <div className="font-medium mt-0.5">{property.status}</div>
                      </div>
                    </div>

                    {property.details && Object.keys(property.details).length > 0 && (
                      <div className="pt-2 border-t border-border/50">
                        <Label className="text-muted-foreground text-xs mb-2 block">
                          Detalhes Adicionais
                        </Label>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          {property.details.condo !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Condomínio:</span>
                              <span className="font-medium">
                                {formatCurrency(property.details.condo)}
                              </span>
                            </div>
                          )}
                          {property.details.iptu !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">IPTU:</span>
                              <span className="font-medium">
                                {formatCurrency(property.details.iptu)}
                              </span>
                            </div>
                          )}
                          {property.details.contractTerm && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Prazo:</span>
                              <span className="font-medium">{property.details.contractTerm}</span>
                            </div>
                          )}
                          {property.details.gestaoRealCode && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cód. Gestão Real:</span>
                              <span className="font-medium">{property.details.gestaoRealCode}</span>
                            </div>
                          )}
                          {property.details.proposal !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Proposta:</span>
                              <span className="font-medium">{property.details.proposal}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground bg-background rounded-md border border-dashed">
                    <Home className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p>Nenhum imóvel vinculado</p>
                  </div>
                )}
              </div>

              {property && (
                <div className="space-y-4 bg-muted/20 p-5 rounded-lg border">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 border-border/50">
                    <FolderOpen className="w-5 h-5 text-primary" /> Documentos do Imóvel
                  </h3>
                  {propertyDocs.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground bg-background rounded-md border border-dashed">
                      <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p>Nenhum documento anexado ao imóvel</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in">
                      {renderDocGroup(
                        'Proprietário',
                        propertyDocs.filter((d) => d.category === 'OWNER_DOCUMENT'),
                      )}
                      {renderDocGroup(
                        'Interessado/Locatário',
                        propertyDocs.filter((d) => d.category === 'TENANT_DOCUMENT'),
                      )}
                      {renderDocGroup(
                        'Fiador',
                        propertyDocs.filter((d) => d.category === 'GUARANTEE_DOCUMENT'),
                      )}
                      {renderDocGroup(
                        'Documentos do Imóvel',
                        propertyDocs.filter(
                          (d) =>
                            !['OWNER_DOCUMENT', 'TENANT_DOCUMENT', 'GUARANTEE_DOCUMENT'].includes(
                              d.category,
                            ),
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Dialog open={!!previewUrl} onOpenChange={(val) => !val && setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Visualização de Documento
            </DialogTitle>
            <DialogDescription>
              Documento visualizado diretamente do SharePoint Online
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden bg-muted/10 relative">
            {previewUrl && (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0 bg-white"
                title="Document Preview"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            )}
          </div>
          <DialogFooter className="p-4 border-t bg-background shrink-0 sm:justify-end">
            <Button variant="outline" onClick={() => window.open(previewUrl!, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" /> Abrir em Nova Guia
            </Button>
            <Button onClick={() => setPreviewUrl(null)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
