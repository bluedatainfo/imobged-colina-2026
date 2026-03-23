import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, FileText, Send, Eye, ShieldAlert } from 'lucide-react'
import useDocumentsStore from '@/stores/documents'
import useContractsStore, { contractsStore } from '@/stores/contracts'
import useMainStore, { mainStore } from '@/stores/main'
import { DocumentViewer } from './DocumentViewer'
import { Badge } from '@/components/ui/badge'

interface ReviewResolutionDialogProps {
  propertyId: string | null
  onClose: () => void
}

export function ReviewResolutionDialog({ propertyId, onClose }: ReviewResolutionDialogProps) {
  const { documents } = useDocumentsStore()
  const { contracts } = useContractsStore()
  const { properties } = useMainStore()

  const [viewItem, setViewItem] = useState<{ type: 'document' | 'contract'; id: string } | null>(
    null,
  )

  const property = properties.find((p) => p.id === propertyId)

  const pendingDocs = useMemo(
    () => documents.filter((d) => d.propertyId === propertyId && d.reviewNotes),
    [documents, propertyId],
  )
  const pendingContracts = useMemo(
    () =>
      contracts.filter(
        (c) => c.propertyId === propertyId && c.reviewNotes && c.status !== 'Rescindido',
      ),
    [contracts, propertyId],
  )

  const totalPending = pendingDocs.length + pendingContracts.length

  const handleResubmit = () => {
    if (totalPending > 0 || !propertyId) return
    mainStore.updateProperty(propertyId, { status: 'Análise Gerencial', isResubmission: true })

    const propertyContracts = contracts.filter(
      (c) => c.propertyId === propertyId && c.status === 'Rascunho',
    )
    propertyContracts.forEach((c) => contractsStore.updateStatus(c.id, 'Em Análise'))

    mainStore.addAuditLog({
      propertyId,
      action: 'Reenvio para Análise Gerencial',
      user: 'Gestor de Contratos',
      details: 'Todas as pendências foram resolvidas e o dossiê foi reenviado para reanálise.',
    })

    onClose()
  }

  if (!propertyId) return null

  return (
    <Dialog open={!!propertyId} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" /> Resolução de Pendências
          </DialogTitle>
          <DialogDescription>
            Revise as anotações feitas pela gerência, realize as correções necessárias e marque como
            resolvido para liberar o reenvio.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {totalPending === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-50 rounded-lg border border-emerald-100">
              <Check className="w-10 h-10 text-emerald-500 mb-2" />
              <p className="font-medium text-emerald-900">Todas as pendências foram resolvidas!</p>
              <p className="text-sm text-emerald-700 mt-1">
                O dossiê está pronto para ser reenviado para análise da gerência.
              </p>
            </div>
          ) : (
            <>
              {pendingContracts.map((c) => (
                <div
                  key={c.id}
                  className="p-4 border rounded-lg bg-amber-50/50 border-amber-200 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-medium text-amber-900">
                      <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="truncate max-w-[200px]">{c.documentName}</span>
                      <Badge variant="outline" className="bg-white ml-2 text-xs shrink-0">
                        Contrato
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewItem({ type: 'contract', id: c.id })}
                      className="shrink-0 justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Visualizar / Corrigir
                    </Button>
                  </div>
                  <div className="text-sm text-amber-800 bg-white p-2 rounded border border-amber-100">
                    <strong>Nota da Gerência:</strong> {c.reviewNotes}
                  </div>
                </div>
              ))}
              {pendingDocs.map((d) => (
                <div
                  key={d.id}
                  className="p-4 border rounded-lg bg-amber-50/50 border-amber-200 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-medium text-amber-900">
                      <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="truncate max-w-[200px]">{d.name}</span>
                      <Badge variant="outline" className="bg-white ml-2 text-xs shrink-0">
                        Doc ({d.category})
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewItem({ type: 'document', id: d.id })}
                      className="shrink-0 justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Visualizar / Corrigir
                    </Button>
                  </div>
                  <div className="text-sm text-amber-800 bg-white p-2 rounded border border-amber-100">
                    <strong>Nota da Gerência:</strong> {d.reviewNotes}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Fechar
          </Button>
          <Button
            onClick={handleResubmit}
            disabled={totalPending > 0}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="w-4 h-4 mr-2" /> Reenviar para Análise
          </Button>
        </DialogFooter>
      </DialogContent>
      <DocumentViewer open={!!viewItem} onClose={() => setViewItem(null)} viewItem={viewItem} />
    </Dialog>
  )
}
