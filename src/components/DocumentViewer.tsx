import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { FileText, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'

interface DocumentViewerProps {
  open: boolean
  onClose: () => void
  docName: string | null
  isTerm?: boolean
}

export function DocumentViewer({ open, onClose, docName, isTerm }: DocumentViewerProps) {
  const { agencyProfile } = useMainStore()

  if (!docName) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden bg-muted/30">
        <DialogHeader className="p-4 border-b bg-background flex flex-row items-center justify-between shrink-0">
          <div className="space-y-1">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {docName}
            </DialogTitle>
            <DialogDescription>
              Visualização nativa via SharePoint Online (Modo Leitura)
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2 mr-6">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Share2 className="w-4 h-4 mr-2" /> Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Baixar
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          <div className="bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl min-h-full flex flex-col">
            <div className="text-center mb-10 border-b pb-8">
              {agencyProfile.logo && (
                <img
                  src={agencyProfile.logo}
                  alt="Logo"
                  className="h-20 mx-auto mb-6 object-contain"
                />
              )}
              <h1 className="text-2xl font-bold uppercase underline">
                {isTerm ? 'Termo de Responsabilidade' : 'Contrato de Locação'}
              </h1>
              <p className="text-muted-foreground mt-4 font-semibold">{agencyProfile.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {agencyProfile.address} | {agencyProfile.website}
              </p>
            </div>
            <div className="space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1">
              {isTerm ? (
                <>
                  <p>
                    Declaro para os devidos fins que recebi/entreguei as chaves referentes ao imóvel
                    situado no endereço supracitado, em plenas condições de acordo com o processo em
                    vigência.
                  </p>
                  <p>
                    O presente termo isenta ou responsabiliza a parte envolvida com base na vistoria
                    anexada aos autos, em conformidade com as políticas internas da{' '}
                    <strong>{agencyProfile.name}</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>CLÁUSULA PRIMEIRA - DO OBJETO:</strong> O objeto do presente contrato é
                    a locação do imóvel residencial situado no endereço qualificado nos anexos deste
                    instrumento, em perfeitas condições de uso, conforme laudo de vistoria.
                  </p>
                  <p>
                    <strong>CLÁUSULA SEGUNDA - DO PRAZO:</strong> O prazo da locação é de 30
                    (trinta) meses, iniciando-se na data da assinatura digital e encerrando-se na
                    mesma data de vencimento no ano correspondente.
                  </p>
                  <p>
                    <strong>CLÁUSULA TERCEIRA - DO VALOR DO ALUGUEL:</strong> O valor mensal da
                    locação fica estabelecido no quadro resumo, reajustado anualmente pelo índice
                    IGPM/FGV ou IPCA, de acordo com o que for mais favorável.
                  </p>
                </>
              )}
              <p className="text-xs text-muted-foreground italic mt-8">
                Este documento é uma representação de leitura renderizada diretamente da biblioteca
                do SharePoint. Para edições, utilize o botão "Editar no Word Online".
              </p>
            </div>
            <div className="mt-16 pt-8 flex justify-between px-8 opacity-50">
              <div className="text-center">
                <div className="w-48 border-b border-foreground/50 mb-2"></div>
                <p className="text-xs">{isTerm ? 'Assinatura Responsável' : 'Locador'}</p>
              </div>
              <div className="text-center">
                <div className="w-48 border-b border-foreground/50 mb-2"></div>
                <p className="text-xs">{isTerm ? 'Assinatura Cliente' : 'Locatário'}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
