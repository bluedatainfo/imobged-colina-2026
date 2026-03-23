import { useState } from 'react'
import {
  Check,
  X,
  FileText,
  UserCheck,
  Eye,
  AlertCircle,
  Clock,
  ChevronLeft,
  FolderOpen,
  User,
  Users,
  FileSignature,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore, isSlaBreached, Property } from '@/stores/main'
import useDocumentsStore from '@/stores/documents'
import useContractsStore from '@/stores/contracts'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'
import { DocumentViewer } from '@/components/DocumentViewer'

const DocItem = ({ name, onClick }: { name: string; onClick: () => void }) => (
  <div
    className="flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-accent transition-colors group cursor-pointer shadow-sm"
    onClick={onClick}
  >
    <div className="p-2 rounded-md bg-blue-100/50 text-blue-700">
      <FileText className="h-4 w-4" />
    </div>
    <span className="text-sm font-medium flex-1 truncate" title={name}>
      {name}
    </span>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
    >
      <Eye className="h-4 w-4 text-muted-foreground" />
    </Button>
  </div>
)

const ManagerApproval = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const { documents } = useDocumentsStore()
  const { contracts } = useContractsStore()

  const approvals = store.properties.filter((p) => p.status === 'Análise Gerencial')

  const [selectedHub, setSelectedHub] = useState<Property | null>(null)
  const [viewingDoc, setViewingDoc] = useState<string | null>(null)

  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const ownerDocs = selectedHub
    ? documents.filter((d) => d.propertyId === selectedHub.id && d.category === 'OWNER_DOCUMENT')
    : []
  const tenantDocs = selectedHub
    ? documents.filter((d) => d.propertyId === selectedHub.id && d.category === 'TENANT_DOCUMENT')
    : []
  const uploadedContracts = selectedHub
    ? documents.filter((d) => d.propertyId === selectedHub.id && d.category.startsWith('CONTRACT_'))
    : []
  const systemContracts = selectedHub
    ? contracts.filter((c) => c.propertyId === selectedHub.id && c.status !== 'Rescindido')
    : []

  const handleApprove = (id: string) => {
    mainStore.updatePropertyStatus(id, 'Vistoria')
    mainStore.addAuditLog({
      propertyId: id,
      action: 'Aprovação Gerencial (Hub)',
      user: user?.name || 'Sistema',
      details: 'Documentação validada no Hub SharePoint. Handoff para vistoria.',
    })

    m365Service.syncToList('Audit Log', `Aprovação do Imóvel ID: ${id} por ${user?.name}`)
    m365Service.sendEmail(
      `${store.settings.administrativeEmails}, ${store.settings.operationalEmails}`,
      `Documentação Aprovada - Imóvel ID: ${id}`,
      'A gerência aprovou a documentação. Próximo passo: Vistoria.',
    )

    toast({
      title: 'Dossiê Aprovado',
      description: 'O imóvel foi movido para a etapa de Vistoria com sucesso.',
    })
    setSelectedHub(null)
  }

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Motivo obrigatório',
        description: 'Informe o motivo da rejeição.',
      })
      return
    }

    if (rejectId) {
      mainStore.updatePropertyStatus(rejectId, 'Pendente/Rascunho')
      mainStore.addAuditLog({
        propertyId: rejectId,
        action: 'Documentação Rejeitada',
        user: user?.name || 'Sistema',
        details: `Motivo: ${rejectReason}`,
      })

      m365Service.syncToList('Audit Log', `Rejeição do Imóvel ID: ${rejectId} por ${user?.name}`)
      m365Service.sendEmail(
        `${store.settings.administrativeEmails}, ${store.settings.managementEmails}`,
        `Documentação Rejeitada - Imóvel ID: ${rejectId}`,
        `Motivo: ${rejectReason}. Por favor, corrija as informações no SharePoint e reenvie.`,
      )

      toast({
        title: 'Dossiê Rejeitado',
        description: 'A análise foi reprovada e devolvida para correção.',
      })
    }
    setRejectId(null)
    setRejectReason('')
    setSelectedHub(null)
  }

  if (selectedHub) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setSelectedHub(null)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hub de Validação</h1>
            <p className="text-muted-foreground">
              Analisando dossiê do imóvel: <strong>{selectedHub.title}</strong> (ID:{' '}
              {selectedHub.id})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Proprietário */}
          <Card className="shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" /> Proprietário
              </CardTitle>
              <CardDescription>Documentos de posse e identificação</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {ownerDocs.length > 0 ? (
                ownerDocs.map((doc) => (
                  <DocItem key={doc.id} name={doc.name} onClick={() => setViewingDoc(doc.name)} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum documento de proprietário vinculado.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Inquilino */}
          <Card className="shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" /> Inquilino
              </CardTitle>
              <CardDescription>
                Comprovação do locatário ({selectedHub.tenant || 'Não informado'})
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {tenantDocs.length > 0 ? (
                tenantDocs.map((doc) => (
                  <DocItem key={doc.id} name={doc.name} onClick={() => setViewingDoc(doc.name)} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum documento de inquilino vinculado.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contrato */}
          <Card className="shadow-sm border-blue-200">
            <CardHeader className="bg-blue-50/50 pb-4 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
                <FileSignature className="h-5 w-5 text-blue-600" /> Contrato
              </CardTitle>
              <CardDescription>Minuta gerada ou contrato importado</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {systemContracts.length > 0 || uploadedContracts.length > 0 ? (
                <>
                  {systemContracts.map((c) => (
                    <DocItem
                      key={c.id}
                      name={c.documentName}
                      onClick={() => setViewingDoc(c.documentName)}
                    />
                  ))}
                  {uploadedContracts.map((doc) => (
                    <DocItem key={doc.id} name={doc.name} onClick={() => setViewingDoc(doc.name)} />
                  ))}
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum contrato vinculado a este imóvel.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
          <Button variant="outline" onClick={() => setSelectedHub(null)}>
            Voltar para Lista
          </Button>
          <Button variant="destructive" onClick={() => setRejectId(selectedHub.id)}>
            <X className="h-4 w-4 mr-2" /> Rejeitar Documentação
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => handleApprove(selectedHub.id)}
          >
            <Check className="h-4 w-4 mr-2" /> Aprovar e Enviar p/ Vistoria
          </Button>
        </div>

        <DocumentViewer
          open={!!viewingDoc}
          onClose={() => setViewingDoc(null)}
          docName={viewingDoc}
        />

        <Dialog open={!!rejectId} onOpenChange={(val) => !val && setRejectId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" /> Rejeitar Documentação
              </DialogTitle>
              <DialogDescription>
                Informe o motivo da rejeição. Um e-mail será enviado automaticamente para a equipe
                administrativa e o Dossiê será devolvido.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Ex: Faltou enviar o verso do RG ou o comprovante está ilegível..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectId(null)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleRejectConfirm}>
                Confirmar Rejeição
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise do Gerente</h1>
        <p className="text-muted-foreground">
          Abra o Hub de Validação para conferir a documentação completa de proprietários e
          inquilinos antes da vistoria.
        </p>
      </div>

      <div className="grid gap-4">
        {approvals.map((item) => {
          const breached = isSlaBreached(item.slaStart, store.settings.slaHours)
          return (
            <Card
              key={item.id}
              className={`flex flex-col md:flex-row gap-4 p-5 items-center md:items-start ${
                breached ? 'border-destructive bg-destructive/5' : ''
              }`}
            >
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      breached ? 'bg-destructive/20' : 'bg-primary/10'
                    }`}
                  >
                    <UserCheck
                      className={`h-6 w-6 ${breached ? 'text-destructive' : 'text-primary'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      ID: <span className="font-mono bg-muted px-1 py-0.5 rounded">{item.id}</span>{' '}
                      • Locatário: <strong>{item.tenant || 'Aguardando'}</strong>
                    </p>
                    <div className="flex gap-2 pt-3 flex-wrap">
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-600 bg-amber-50"
                      >
                        Análise Gerencial
                      </Badge>
                      {breached && (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertCircle className="w-3 h-3 mr-1" /> SLA Violado (&gt;{' '}
                          {store.settings.slaHours}h)
                        </Badge>
                      )}
                      {item.slaStart && !breached && (
                        <span className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> SLA Em Dia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-56 shrink-0 mt-4 md:mt-0">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  onClick={() => setSelectedHub(item)}
                >
                  <FolderOpen className="h-4 w-4 mr-2" /> Analisar Dossiê
                </Button>
                <p className="text-xs text-center text-muted-foreground px-2">
                  Acesse os documentos reais vinculados
                </p>
              </div>
            </Card>
          )
        })}

        {approvals.length === 0 && (
          <Card className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Check className="h-12 w-12 mb-4 text-emerald-500 opacity-50" />
            <p className="text-lg font-medium text-foreground">Todas as análises concluídas!</p>
            <p>Não há documentação pendente para aprovação no momento.</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ManagerApproval
