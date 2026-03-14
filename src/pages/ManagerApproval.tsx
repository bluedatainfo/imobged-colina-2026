import { useState } from 'react'
import { Check, X, FileText, UserCheck, Eye, AlertCircle, Clock } from 'lucide-react'
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
import useMainStore, { mainStore, isSlaBreached } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'

const ManagerApproval = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()

  const approvals = store.properties.filter((p) => p.status === 'Análise Gerencial')

  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const handleApprove = (id: string) => {
    mainStore.updatePropertyStatus(id, 'Vistoria')
    mainStore.addAuditLog({
      propertyId: id,
      action: 'Aprovação Gerencial',
      user: user?.name || 'Sistema',
      details: 'Documentação validada. Handoff para vistoria.',
    })
    toast({
      title: 'Aprovado & Notificado',
      description: `Imóvel movido para Vistoria. E-mail automático enviado para a Operação: ${store.settings.operationalEmails}`,
    })
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

      toast({
        variant: 'destructive',
        title: 'Rejeitado & Notificado',
        description: `Retornado para Rascunho. Alerta enviado para Admin (${store.settings.administrativeEmails}) e Captador.`,
      })
    }
    setRejectId(null)
    setRejectReason('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise do Gerente</h1>
        <p className="text-muted-foreground">
          Aprove a documentação de novos inquilinos para liberar a Vistoria de Entrada. Fique atento
          aos prazos SLA.
        </p>
      </div>

      <div className="grid gap-4">
        {approvals.map((item) => {
          const breached = isSlaBreached(item.slaStart, store.settings.slaHours)
          return (
            <Card
              key={item.id}
              className={`flex flex-col xl:flex-row gap-4 p-4 items-start ${breached ? 'border-destructive bg-destructive/5' : ''}`}
            >
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-full shrink-0 ${breached ? 'bg-destructive/20' : 'bg-primary/10'}`}
                  >
                    <UserCheck
                      className={`h-5 w-5 ${breached ? 'text-destructive' : 'text-primary'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title} (ID: {item.id})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Locatário: <strong>{item.tenant}</strong>
                    </p>
                    <div className="flex gap-2 pt-2 flex-wrap">
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

                <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md bg-background text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate flex-1">Documentos_Unificados.pdf</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex xl:flex-col gap-2 w-full xl:w-48 xl:border-l xl:pl-4 xl:border-border">
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleApprove(item.id)}
                >
                  <Check className="h-4 w-4 mr-2" /> Aprovar Doc.
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setRejectId(item.id)}
                >
                  <X className="h-4 w-4 mr-2" /> Rejeitar Doc.
                </Button>
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

      <Dialog open={!!rejectId} onOpenChange={(val) => !val && setRejectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" /> Rejeitar Documentação
            </DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição. Este feedback será enviado ao responsável e à equipe
              administrativa.
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

export default ManagerApproval
