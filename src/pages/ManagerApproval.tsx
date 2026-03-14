import { useState } from 'react'
import { Check, X, FileText, UserCheck, Eye, AlertCircle } from 'lucide-react'
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
import { mockManagerApprovals } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

const ManagerApproval = () => {
  const { toast } = useToast()
  const [items, setItems] = useState(mockManagerApprovals)
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const handleApprove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: 'Documentação Aprovada',
      description: 'Handoff realizado. Imóvel movido para fila de "Vistoria Pendente".',
    })
  }

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Motivo obrigatório',
        description: 'Por favor, informe o motivo da rejeição da documentação.',
      })
      return
    }

    setItems((prev) => prev.filter((item) => item.id !== rejectId))
    setRejectId(null)
    setRejectReason('')
    toast({
      variant: 'destructive',
      title: 'Documentação Rejeitada',
      description: 'As partes foram notificadas sobre a pendência.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise do Gerente</h1>
        <p className="text-muted-foreground">
          Aprove a documentação de novos inquilinos para liberar a Vistoria de Entrada.
        </p>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col xl:flex-row gap-4 p-4 items-start">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2.5 rounded-full shrink-0">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.property}</h3>
                  <p className="text-sm text-muted-foreground">
                    Locatário: <strong>{item.tenant}</strong> • Enviado: {item.date}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-amber-500 text-amber-600 bg-amber-50"
                    >
                      Análise Gerencial
                    </Badge>
                    {item.priority === 'Alta' && (
                      <Badge variant="destructive">Prioridade Alta</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {item.docs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 border rounded-md bg-muted/30 text-sm"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate flex-1" title={doc}>
                      {doc}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex xl:flex-col gap-2 w-full xl:w-48 xl:border-l xl:pl-4">
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => handleApprove(item.id)}
              >
                <Check className="h-4 w-4 mr-2" /> Aprovar Doc.
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => setRejectId(item.id)}>
                <X className="h-4 w-4 mr-2" /> Rejeitar Doc.
              </Button>
            </div>
          </Card>
        ))}

        {items.length === 0 && (
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
              <AlertCircle className="h-5 w-5 text-destructive" />
              Rejeitar Documentação
            </DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição. Este feedback será enviado ao responsável pela captação
              dos documentos.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Ex: Faltou enviar o verso do RG ou o comprovante de renda está ilegível..."
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
