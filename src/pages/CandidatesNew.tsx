import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  Link as LinkIcon,
  Copy,
  Send,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { StartLeaseProcessDialog } from '@/components/StartLeaseProcessDialog'
import { IncludeErpTenantDialog } from '@/components/IncludeErpTenantDialog'
import { getCurrentOperator } from '@/lib/operator'
import {
  candidatesService,
  PreRegistration,
  PreRegistrationStatus,
  PreRegistrationCategory,
} from '@/services/candidates'
import { CandidateDetailView } from '@/components/CandidateDetailView'
import { formatPhoneForWhatsApp } from '@/lib/boletoParser'
import { buildWhatsAppLink } from '@/lib/whatsappAndExcel'

export function CandidatesNew() {
  const [candidates, setCandidates] = useState<PreRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCandidate, setSelectedCandidate] = useState<PreRegistration | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isIncludeDialogOpen, setIsIncludeDialogOpen] = useState(false)
  const [candidateToDelete, setCandidateToDelete] = useState<PreRegistration | null>(null)
  const [activeTab, setActiveTab] = useState<'PF' | 'PJ' | 'Fiador'>('PF')

  // Estado para modal de envio WhatsApp
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)
  const [whatsAppTarget, setWhatsAppTarget] = useState<{
    type: 'PF' | 'PJ' | 'Fiador'
    phone: string
    name: string
  }>({
    type: 'PF',
    phone: '',
    name: '',
  })

  // Start Lease Process Dialog State
  const [isStartLeaseOpen, setIsStartLeaseOpen] = useState(false)
  const [candidateForLease, setCandidateForLease] = useState<PreRegistration | null>(null)

  const { toast } = useToast()

  const loadCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidatesService.getCandidates()
      setCandidates(data)
    } catch (error) {
      console.error('Erro ao carregar pré-cadastros:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pré-cadastros.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCandidates()
  }, [])

  const handleDelete = async () => {
    if (!candidateToDelete) return
    try {
      await candidatesService.delete(candidateToDelete.id)
      toast({
        title: 'Sucesso',
        description: 'Pré-cadastro excluído com sucesso.',
      })
      if (selectedCandidate?.id === candidateToDelete.id) {
        setIsDetailOpen(false)
        setSelectedCandidate(null)
      }
      loadCandidates()
    } catch (error) {
      console.error('Erro ao excluir pré-cadastro:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o pré-cadastro.',
        variant: 'destructive',
      })
    } finally {
      setCandidateToDelete(null)
    }
  }

  const getPublicLink = (type: 'PF' | 'PJ' | 'Fiador') => {
    const slug = type.toLowerCase()
    return `${window.location.origin}/public/application/${slug}`
  }

  const handleCopyLink = async (type: 'PF' | 'PJ' | 'Fiador') => {
    const url = getPublicLink(type)
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        const input = document.createElement('input')
        input.value = url
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
      toast({
        title: 'Link copiado!',
        description: `Link da ficha ${type} copiado para a área de transferência.`,
      })
    } catch (e) {
      toast({
        title: 'Erro ao copiar',
        description: url,
      })
    }
  }

  const handleOpenWhatsAppModal = (type: 'PF' | 'PJ' | 'Fiador', candidate?: PreRegistration) => {
    setWhatsAppTarget({
      type,
      phone: candidate?.phone || '',
      name: candidate?.full_name || '',
    })
    setIsWhatsAppModalOpen(true)
  }

  const handleSendWhatsApp = () => {
    if (!whatsAppTarget.phone) {
      toast({
        title: 'Telefone obrigatório',
        description: 'Por favor, informe o telefone celular com DDD.',
        variant: 'destructive',
      })
      return
    }

    const cleanPhone = formatPhoneForWhatsApp(whatsAppTarget.phone)
    if (!cleanPhone) {
      toast({
        title: 'Telefone inválido',
        description: 'Por favor, informe um número de celular válido com DDD.',
        variant: 'destructive',
      })
      return
    }

    const link = getPublicLink(whatsAppTarget.type)
    const typeLabel =
      whatsAppTarget.type === 'PJ'
        ? 'Pessoa Juridica'
        : whatsAppTarget.type === 'Fiador'
          ? 'Fiador'
          : 'Pessoa Fisica'

    const candidateName = whatsAppTarget.name ? whatsAppTarget.name.trim() : ''
    const greetingLine = candidateName ? `Olá, ${candidateName} !` : 'Olá!'

    const message = `${greetingLine}

Para darmos andamento ao seu processo de análise da locação, por favor preencha nossa ficha cadastral digital no link abaixo:

${link}

Ficha: ${typeLabel}

Qualquer dúvida, estamos à disposição!!

IMOBILIÁRIA COLINA 
RECEPÇÃO DE DOCUMENTOS`

    const waLink = buildWhatsAppLink(cleanPhone, message)
    window.open(waLink, '_blank', 'noopener,noreferrer')
    setIsWhatsAppModalOpen(false)
  }

  const getStatusBadge = (status: PreRegistrationStatus) => {
    const config: Record<
      PreRegistrationStatus,
      {
        label: string
        className: string
        icon: React.ComponentType<{ className?: string }>
      }
    > = {
      Novo: {
        label: 'Novo',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Clock,
      },
      'Em Análise': {
        label: 'Em Análise',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertCircle,
      },
      Aprovado: {
        label: 'Aprovado',
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
      },
      Reprovado: {
        label: 'Reprovado',
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
      },
      'Em Contrato': {
        label: 'Em Contrato',
        className: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FileText,
      },
    }

    const {
      label,
      className,
      icon: Icon,
    } = config[status] || {
      label: status,
      className: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: Clock,
    }

    return (
      <Badge variant="outline" className={`${className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    )
  }

  const getCategoryBadge = (category: PreRegistrationCategory) => {
    const isPF = category === 'PF'
    const isPJ = category === 'PJ'
    const isFiador = category === 'Fiador'

    return (
      <Badge
        variant="secondary"
        className={`flex items-center gap-1 text-xs ${
          isPF
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : isPJ
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}
      >
        {isPF ? (
          <User className="w-3 h-3" />
        ) : isPJ ? (
          <Building2 className="w-3 h-3" />
        ) : (
          <Shield className="w-3 h-3" />
        )}
        {category}
      </Badge>
    )
  }

  // Filtragem
  const filteredCandidates = candidates.filter((c) => {
    // Aba ativa: PF, PJ, Fiador
    const matchCategory = (c.category || 'PF').toUpperCase() === activeTab.toUpperCase()
    if (!matchCategory) return false

    // Busca textual
    const matchesSearch =
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.cpf && c.cpf.includes(searchTerm)) ||
      (c.cnpj && c.cnpj.includes(searchTerm)) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.phone && c.phone.includes(searchTerm)) ||
      (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase()))

    // Status
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const currentOperatorName = getCurrentOperator() || 'Não Definido'

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Gestão de Interessados</span>
            <Badge
              variant="outline"
              className="text-xs bg-emerald-50 text-emerald-700 border-emerald-300"
            >
              Novo Módulo
            </Badge>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fichas cadastrais nativas (PF, PJ e Fiador) com links públicos e envio via WhatsApp
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={loadCandidates}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => setIsIncludeDialogOpen(true)}
            className="flex items-center gap-2 bg-primary"
          >
            <Plus className="w-4 h-4" />
            Cadastrar Manualmente
          </Button>
        </div>
      </div>

      {/* Abas PF / PJ / Fiador */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as 'PF' | 'PJ' | 'Fiador')}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b pb-3">
          <TabsList className="grid grid-cols-3 w-full md:w-[480px]">
            <TabsTrigger value="PF" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Pessoa Física</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200">
                {candidates.filter((c) => (c.category || 'PF').toUpperCase() === 'PF').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="PJ" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Pessoa Jurídica</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200">
                {candidates.filter((c) => c.category === 'PJ').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="Fiador" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Fiador</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200">
                {candidates.filter((c) => c.category === 'Fiador').length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Botões de Ação do Link Público da Aba Ativa */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyLink(activeTab)}
              className="flex items-center gap-2 text-slate-700 hover:text-primary hover:border-primary"
            >
              <Copy className="w-4 h-4 text-primary" />
              Copiar Link da Ficha ({activeTab})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenWhatsAppModal(activeTab)}
              className="flex items-center gap-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Enviar Ficha por WhatsApp
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(getPublicLink(activeTab), '_blank')}
              className="flex items-center gap-1 text-xs text-slate-500"
              title="Abrir em nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Filtros de Busca */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder={`Buscar em ${activeTab} por nome, CPF/CNPJ, e-mail ou código...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Em Análise">Em Análise</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Reprovado">Reprovado</SelectItem>
                <SelectItem value="Em Contrato">Em Contrato</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conteúdo das Abas (renderizado via lista unificada filtrada) */}
        <div className="mt-6">
          {loading ? (
            <div className="p-12 text-center bg-white rounded-xl border">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
              <p className="text-sm text-slate-500">Carregando candidatos...</p>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-semibold text-slate-800">
                Nenhum candidato de {activeTab} encontrado
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? 'Nenhum resultado corresponde aos filtros aplicados.'
                  : `Compartilhe o link da ficha de ${activeTab} com seus clientes para receber novos cadastros.`}
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyLink(activeTab)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Link da Ficha
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleOpenWhatsAppModal(activeTab)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar via WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCandidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className="hover:shadow-md transition-shadow cursor-pointer border bg-white flex flex-col justify-between"
                  onClick={() => {
                    setSelectedCandidate(candidate)
                    setIsDetailOpen(true)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {candidate.code || 'S/C'}
                          </span>
                          {getCategoryBadge(candidate.category)}
                        </div>
                        <CardTitle className="text-base font-bold text-slate-900 line-clamp-1 mt-1">
                          {candidate.full_name}
                        </CardTitle>
                      </div>
                      <div>{getStatusBadge(candidate.status)}</div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-slate-600 pt-0">
                    {(candidate.cpf || candidate.cnpj) && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-500">
                          {candidate.category === 'PJ' ? 'CNPJ:' : 'CPF:'}
                        </span>
                        <span>{candidate.cpf || candidate.cnpj}</span>
                      </div>
                    )}

                    {candidate.email && (
                      <div className="flex items-center gap-2 text-xs truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{candidate.email}</span>
                      </div>
                    )}

                    {candidate.phone && (
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{candidate.phone}</span>
                      </div>
                    )}

                    {candidate.created_at && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t mt-2">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Enviado em {new Date(candidate.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between border-t gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary p-0 h-auto font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCandidate(candidate)
                          setIsDetailOpen(true)
                        }}
                      >
                        Ver Ficha Completa →
                      </Button>

                      {candidate.phone && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-emerald-600 p-1 h-7 flex items-center gap-1 hover:bg-emerald-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenWhatsAppModal(candidate.category, candidate)
                          }}
                          title="Enviar mensagem WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Tabs>

      {/* ======================================================== */}
      {/* MODAL DA FICHA DETALHADA                                 */}
      {/* ======================================================== */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCandidate && (
            <div className="space-y-4">
              {/* OPERADOR ACIMA DA FICHA DETALHADA (Exigência do Usuário) */}
              <div className="bg-slate-900 text-white px-4 py-2.5 rounded-lg flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                  <span className="text-slate-400 text-xs uppercase">OPERADOR:</span>
                  <span className="text-emerald-400 font-bold uppercase">
                    {currentOperatorName}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Código:{' '}
                  <span className="text-white font-mono">{selectedCandidate.code || '-'}</span>
                </div>
              </div>

              {/* Topo do Diálogo */}
              <DialogHeader className="border-b pb-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <span>{selectedCandidate.full_name}</span>
                      {getCategoryBadge(selectedCandidate.category)}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 mt-0.5">
                      Ficha cadastral completa preenchida pelo pretendente
                    </DialogDescription>
                  </div>
                  <div>{getStatusBadge(selectedCandidate.status)}</div>
                </div>
              </DialogHeader>

              {/* Botões de Ação Principais no Topo da Ficha */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2"
                    onClick={() => {
                      setCandidateForLease(selectedCandidate)
                      setIsStartLeaseOpen(true)
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Iniciar Análise para Locação
                  </Button>

                  {selectedCandidate.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                      onClick={() =>
                        handleOpenWhatsAppModal(selectedCandidate.category, selectedCandidate)
                      }
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      Conversar no WhatsApp
                    </Button>
                  )}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setCandidateToDelete(selectedCandidate)}
                  className="flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Excluir
                </Button>
              </div>

              {/* Renderização Fiel das Seções do Formulário */}
              <CandidateDetailView candidate={selectedCandidate} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ======================================================== */}
      {/* MODAL DE ENVIO DE WHATSAPP                              */}
      {/* ======================================================== */}
      <Dialog open={isWhatsAppModalOpen} onOpenChange={setIsWhatsAppModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-700">
              <MessageCircle className="w-5 h-5" />
              Enviar Link da Ficha por WhatsApp
            </DialogTitle>
            <DialogDescription>
              Dispare a ficha cadastral de {whatsAppTarget.type} diretamente para o WhatsApp do
              pretendente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nome do Destinatário (opcional)
              </label>
              <Input
                placeholder="Ex: João da Silva"
                value={whatsAppTarget.name}
                onChange={(e) => setWhatsAppTarget({ ...whatsAppTarget, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Celular / WhatsApp (com DDD) *
              </label>
              <Input
                placeholder="(11) 98765-4321"
                value={whatsAppTarget.phone}
                onChange={(e) => setWhatsAppTarget({ ...whatsAppTarget, phone: e.target.value })}
                required
              />
            </div>

            <div className="p-3 bg-slate-50 rounded border text-xs text-slate-600 space-y-1">
              <span className="font-semibold block text-slate-800">Link que será enviado:</span>
              <span className="font-mono text-primary break-all">
                {getPublicLink(whatsAppTarget.type)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsWhatsAppModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSendWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Abrir no WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para Iniciar Análise de Locação (Fluxo Existente) */}
      {candidateForLease && (
        <StartLeaseProcessDialog
          open={isStartLeaseOpen}
          onOpenChange={setIsStartLeaseOpen}
          candidate={candidateForLease}
          onSuccess={() => {
            loadCandidates()
            setIsDetailOpen(false)
          }}
        />
      )}

      {/* Dialog para Cadastro Manual ERP/Tenant (Fluxo Existente) */}
      <IncludeErpTenantDialog
        open={isIncludeDialogOpen}
        onOpenChange={setIsIncludeDialogOpen}
        onSuccess={loadCandidates}
      />

      {/* Confirmação de Exclusão */}
      <AlertDialog
        open={!!candidateToDelete}
        onOpenChange={(open) => !open && setCandidateToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Pré-cadastro</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cadastro de{' '}
              <strong className="text-slate-800">{candidateToDelete?.full_name}</strong>? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default CandidatesNew
