import { Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useMainStore, { mainStore, MaintenanceStatus } from '@/stores/main'
import { useToast } from '@/hooks/use-toast'
import { m365Service } from '@/lib/m365'

export default function Maintenance() {
  const { maintenanceTickets } = useMainStore()
  const { toast } = useToast()

  const handleStatusChange = (id: string, newStatus: MaintenanceStatus) => {
    mainStore.updateMaintenanceStatus(id, newStatus)
    toast({
      title: 'Status Atualizado',
      description: `O ticket foi movido para "${newStatus}".`,
    })
    m365Service.syncToList('Tickets de Manutenção', `Ticket ${id} atualizado para ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Manutenção</h1>
        <p className="text-muted-foreground">
          Gerencie alertas de reparos gerados automaticamente pelas vistorias de campo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(['Pendente', 'Em Andamento', 'Concluído'] as MaintenanceStatus[]).map((status) => {
          const tickets = maintenanceTickets.filter((t) => t.status === status)
          return (
            <div key={status} className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                {status === 'Pendente' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                {status === 'Em Andamento' && <Clock className="w-5 h-5 text-amber-500" />}
                {status === 'Concluído' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                {status} <Badge variant="secondary">{tickets.length}</Badge>
              </h3>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <Card key={t.id} className="shadow-sm">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs font-mono">
                          {t.id}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(t.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <CardTitle className="text-base mt-2">{t.item}</CardTitle>
                      <CardDescription className="line-clamp-1">{t.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div className="text-sm bg-muted/50 p-3 rounded border">
                        <p className="font-medium text-xs text-muted-foreground mb-1">
                          Observações do Vistoriador:
                        </p>
                        <p>{t.notes}</p>
                      </div>

                      {t.photo && (
                        <div className="w-full h-32 rounded-md overflow-hidden bg-muted relative">
                          <img
                            src={t.photo}
                            alt="Evidência"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                            Foto da Vistoria
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        {status === 'Pendente' && (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleStatusChange(t.id, 'Em Andamento')}
                          >
                            <Wrench className="w-4 h-4 mr-2" /> Iniciar Reparo
                          </Button>
                        )}
                        {status === 'Em Andamento' && (
                          <Button
                            size="sm"
                            variant="default"
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleStatusChange(t.id, 'Concluído')}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" /> Concluir Reparo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {tickets.length === 0 && (
                  <div className="p-6 border-2 border-dashed rounded-lg text-center text-muted-foreground text-sm">
                    Nenhum ticket {status.toLowerCase()}.
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
