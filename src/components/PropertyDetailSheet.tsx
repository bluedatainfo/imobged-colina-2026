import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckSquare, FileSignature, History, FileText } from 'lucide-react'
import useMainStore, { mainStore, Property } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface Props {
  property: Property | null
  onClose: () => void
}

export function PropertyDetailSheet({ property, onClose }: Props) {
  const store = useMainStore()
  const { user } = useAuth()
  const { toast } = useToast()

  if (!property) return null

  const auditLogs = store.auditLogs
    .filter((l) => l.propertyId === property.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  const inspectionData = store.inspectionsData[property.id]

  const handleGenerateContract = () => {
    mainStore.updatePropertyStatus(property.id, 'Assinatura')
    mainStore.addAuditLog({
      propertyId: property.id,
      action: 'Minuta Gerada / Enviado p/ Assinatura',
      user: user?.name || 'Sistema',
      details: 'Dados de vistoria e OCR integrados no contrato.',
    })
    toast({
      title: 'Contrato Gerado',
      description: 'Minuta pronta e disparada para assinatura digital.',
    })
    onClose()
  }

  return (
    <Sheet open={!!property} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col p-0">
        <div className="p-6 border-b bg-muted/30">
          <SheetHeader>
            <div className="flex justify-between items-start gap-4">
              <div>
                <SheetTitle className="text-2xl">{property.title}</SheetTitle>
                <SheetDescription className="mt-1">{property.address}</SheetDescription>
              </div>
              <Badge variant="outline" className="text-sm py-1 bg-background">
                {property.status}
              </Badge>
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            {/* Smart Inspection Integration Section */}
            {property.status === 'Confecção de Contrato' && (
              <div className="bg-primary/5 border border-primary/20 p-5 rounded-lg space-y-4">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <CheckSquare className="w-5 h-5" /> Integração Inteligente de Vistoria
                </div>
                <p className="text-sm text-muted-foreground">
                  Os dados da etapa anterior foram mapeados para auxiliar a geração da minuta final
                  do contrato.
                </p>
                {inspectionData ? (
                  <div className="grid grid-cols-1 gap-4 text-sm bg-background p-4 rounded-md border shadow-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Condição das Paredes / Pintura</p>
                      <p className="font-medium">{inspectionData.wallCondition || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Móveis e Observações</p>
                      <p className="font-medium">{inspectionData.furnitureNotes || 'N/A'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
                    Aviso: Vistoria estruturada não preenchida para este imóvel.
                  </div>
                )}
                <Button className="w-full gap-2" onClick={handleGenerateContract}>
                  <FileText className="w-4 h-4" /> Gerar Documento Final (Minuta)
                </Button>
              </div>
            )}

            {/* View if in Signature */}
            {property.status === 'Assinatura' && (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg flex flex-col items-center justify-center text-center">
                <FileSignature className="w-10 h-10 text-emerald-600 mb-2" />
                <h4 className="font-semibold text-emerald-800">Aguardando Assinaturas Digitais</h4>
                <p className="text-sm text-emerald-700 mt-1">
                  O contrato foi gerado e as partes foram notificadas.
                </p>
              </div>
            )}

            {/* Audit Trail Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                <History className="w-5 h-5" /> Trilha de Auditoria (Audit Log)
              </h4>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-2.5 md:ml-0 z-10" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-3 rounded border bg-card shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-primary">{log.action}</span>
                        <time className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">Por: {log.user}</div>
                      {log.details && (
                        <div className="text-xs bg-muted/50 p-1.5 rounded mt-1">{log.details}</div>
                      )}
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum registro encontrado para este imóvel.
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
