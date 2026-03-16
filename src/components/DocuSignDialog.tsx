import { useState, useEffect } from 'react'
import { FileSignature, CheckCircle, Loader2, MessageCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LeaseContract, contractsStore } from '@/stores/contracts'
import { keysStore } from '@/stores/keys'
import { useToast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'

export function DocuSignDialog({
  contract,
  onClose,
}: {
  contract: LeaseContract | null
  onClose: () => void
}) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (contract) {
      setStep(contract.docusignStatus === 'Sent' ? 2 : 1)
    }
  }, [contract])

  if (!contract) return null

  const handleSend = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      contractsStore.updateDocuSignStatus(contract.id, 'Sent')
      setStep(2)
      toast({
        title: 'Enviado para DocuSign',
        description: 'Envelope criado e disparado para o e-mail do inquilino.',
      })
    }, 1500)
  }

  const handleWhatsAppSend = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      mainStore.addAuditLog({
        propertyId: contract.propertyId,
        action: 'Link de Assinatura enviado via WhatsApp API',
        user: user?.name || 'Sistema',
        details: `Disparado para ${contract.tenantName} às ${new Date().toLocaleTimeString()}`,
      })
      toast({
        title: 'WhatsApp Enviado',
        description: 'Link seguro de assinatura encaminhado com sucesso para o cliente.',
      })
      if (step === 1) {
        contractsStore.updateDocuSignStatus(contract.id, 'Sent')
        setStep(2)
      }
    }, 1200)
  }

  const handleSimulateSign = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      contractsStore.updateDocuSignStatus(contract.id, 'Signed')
      contractsStore.updateStatus(contract.id, 'Ativo')

      const property = mainStore.getState().properties.find((p) => p.id === contract.propertyId)
      keysStore.addTask({
        contractId: contract.id,
        propertyId: contract.propertyId,
        tenantName: contract.tenantName,
        propertyAddress: property?.address || 'Endereço Indisponível',
        type: 'Delivery',
      })

      mainStore.addAuditLog({
        propertyId: contract.propertyId,
        action: 'Contrato Assinado via DocuSign',
        user: 'Integração',
        details: 'Status atualizado para Ativo. Termo de Entrega de Chaves gerado.',
      })

      toast({
        title: 'Assinatura Concluída',
        description: 'Contrato ativo. Documento salvo no SharePoint e tarefa de chaves criada.',
      })
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={!!contract} onOpenChange={(val) => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-blue-600" /> Integração DocuSign API
          </DialogTitle>
          <DialogDescription>
            Envie a minuta para assinatura digital por E-mail ou WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-blue-50 p-4 rounded-full">
            {loading ? (
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            ) : step === 1 ? (
              <FileSignature className="w-10 h-10 text-blue-600" />
            ) : (
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            )}
          </div>

          <div>
            <h4 className="font-semibold">{contract.documentName}</h4>
            <p className="text-sm text-muted-foreground mt-1">Inquilino: {contract.tenantName}</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleWhatsAppSend}
            disabled={loading}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar via WhatsApp
          </Button>

          {step === 1 ? (
            <Button
              onClick={handleSend}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Disparar Envelope
            </Button>
          ) : (
            <Button
              onClick={handleSimulateSign}
              disabled={loading}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
            >
              Simular Assinatura
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
