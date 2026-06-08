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
import {
  Eye,
  CheckCircle,
  XCircle,
  Home,
  Building,
  FileText,
  Loader2,
  MapPin,
  DollarSign,
  ExternalLink,
  FolderOpen,
  User,
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
import { Textarea } from '@/components/ui/textarea'
import { m365Service } from '@/lib/m365'

const formatCurrency = (amount: number | string | null | undefined) => {
  if (amount === null || amount === undefined || amount === '') return 'Não informado'
  const value = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(value)) return 'Não informado'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
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

export default function ManagerApproval() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [property, setProperty] = useState<any>(null)
  const [loadingProperty, setLoadingProperty] = useState(false)
  const [propertyDocs, setPropertyDocs] = useState<any[]>([])

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [processing, setProcessing] = useState(false)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loadingPreviewId, setLoadingPreviewId] = useState<string | null>(null)

  const fetchCandidates = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('pre_registrations')
        .select('*')
        .eq('status', 'Em Análise da Gerência')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCandidates(data || [])
    } catch (err: any) {
      toast({ title: 'Erro ao buscar dados', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const handleOpenDetails = async (candidate: any) => {
    setSelectedCandidate(candidate)
    setProperty(null)
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
      } else {
        setPropertyDocs([])
      }
    } catch (err: any) {
      console.error('Error fetching property:', err)
      toast({ title: 'Erro ao buscar imóvel', description: err.message, variant: 'destructive' })
    } finally {
      setLoadingProperty(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedCandidate) return
    setProcessing(true)
    try {
      const { error } = await supabase
        .from('pre_registrations')
        .update({ status: 'Aprovado' })
        .eq('id', selectedCandidate.id)

      if (error) throw error

      if (property) {
        const { error: propError } = await supabase
          .from('properties')
          .update({ status: 'Confecção de Contrato' })
          .eq('id', property.id)
        if (propError) throw propError
      }

      toast({
        title: 'Dossiê Aprovado',
        description: 'O processo foi movido para Confecção de Contrato.',
      })
      setSelectedCandidate(null)
      fetchCandidates()
    } catch (err: any) {
      toast({ title: 'Erro ao aprovar', description: err.message, variant: 'destructive' })
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedCandidate || !rejectReason.trim()) return
    setProcessing(true)
    try {
      const { error } = await supabase
        .from('pre_registrations')
        .update({ status: 'Rejeitado' })
        .eq('id', selectedCandidate.id)

      if (error) throw error

      if (property) {
        const { error: propError } = await supabase
          .from('properties')
          .update({ status: 'Disponível' })
          .eq('id', property.id)
        if (propError) throw propError
      }

      await supabase.functions.invoke('send-rejection-email', {
        body: { candidateId: selectedCandidate.id, reason: rejectReason },
      })

      toast({ title: 'Dossiê Rejeitado', description: 'O interessado foi notificado.' })
      setRejectDialogOpen(false)
      setSelectedCandidate(null)
      setRejectReason('')
      fetchCandidates()
    } catch (err: any) {
      toast({ title: 'Erro ao rejeitar', description: err.message, variant: 'destructive' })
    } finally {
      setProcessing(false)
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

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <CheckCircle className="w-8 h-8" />
          Hub de Validação Gerencial
        </h1>
        <p className="text-muted-foreground">Analise e aprove os dossiês de locação submetidos.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dossiês Pendentes</CardTitle>
          <CardDescription>Lista de interessados aguardando análise para locação</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Nenhum dossiê pendente no momento.</p>
            </div>
          ) : (
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
                  {candidates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.full_name}</TableCell>
                      <TableCell>{formatCpfCnpj(c.cpf || c.cnpj)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{c.email || '-'}</div>
                        <div className="text-xs text-muted-foreground">{c.phone || '-'}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(c.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-600 border-amber-200"
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(c)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ficha Detalhada
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selectedCandidate} onOpenChange={(val) => !val && setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col p-0 border-l">
          <div className="p-6 border-b bg-muted/30">
            <SheetHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <SheetTitle className="text-2xl">Ficha Detalhada</SheetTitle>
                  <SheetDescription className="mt-1">Análise de Dossiê de Locação</SheetDescription>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  {selectedCandidate?.status}
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
                  <div className="mt-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a
                        href={selectedCandidate.documents_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Documentos Anexados
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Property Details Section */}
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

              {/* Documentação GED SharePoint */}
              {property && (
                <div className="space-y-4 bg-muted/20 p-5 rounded-lg border">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 border-border/50">
                    <FolderOpen className="w-5 h-5 text-primary" /> Documentos GED (SharePoint)
                  </h3>
                  {loadingProperty ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-4 justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" /> Carregando documentos...
                    </div>
                  ) : propertyDocs.length === 0 ? (
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
                        'Documentos GED-Ciclo',
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

              {selectedCandidate?.form_data &&
                Object.keys(selectedCandidate.form_data).length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                      <FileText className="w-5 h-5 text-primary" /> Dados do Formulário
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-md text-xs font-mono overflow-auto max-h-[200px] border">
                      <pre>{JSON.stringify(selectedCandidate.form_data, null, 2)}</pre>
                    </div>
                  </div>
                )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t bg-background flex gap-3 justify-end">
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setRejectDialogOpen(true)}
            >
              <XCircle className="w-4 h-4 mr-2" /> Rejeitar
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
              disabled={processing}
            >
              {processing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Aprovar Dossiê
            </Button>
          </div>
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

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Dossiê</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição. O interessado receberá um email com estas informações.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Motivo da Rejeição / Ajustes Necessários</Label>
              <Textarea
                placeholder="Ex: Faltam comprovantes de renda dos últimos 3 meses..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={processing}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processing || !rejectReason.trim()}
            >
              {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
