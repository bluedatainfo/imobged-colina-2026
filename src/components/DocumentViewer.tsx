import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { FileText, Download, Share2, Loader2, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'
import useDocumentsStore from '@/stores/documents'
import useContractsStore from '@/stores/contracts'
import useTemplatesStore from '@/stores/templates'
import { m365Service } from '@/lib/m365'

interface DocumentViewerProps {
  open: boolean
  onClose: () => void
  viewItem?: { type: 'document' | 'contract'; id: string } | null
  docName?: string | null
  isTerm?: boolean
}

export function DocumentViewer({ open, onClose, viewItem, docName, isTerm }: DocumentViewerProps) {
  const { agencyProfile } = useMainStore()
  const { documents } = useDocumentsStore()
  const { contracts } = useContractsStore()
  const { templates } = useTemplatesStore()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [templateContent, setTemplateContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!open) return

    if (!viewItem) {
      // Legacy fallback
      setTitle(docName || 'Documento')
      setPreviewUrl(null)
      setTemplateContent(null)
      setError(null)
      return
    }

    const loadPreview = async () => {
      setLoading(true)
      setError(null)
      setPreviewUrl(null)
      setTemplateContent(null)

      try {
        if (viewItem.type === 'document') {
          const doc = documents.find((d) => d.id === viewItem.id)
          if (!doc) throw new Error('Documento não encontrado na base de dados.')
          setTitle(doc.name)

          if (!doc.filePath || !doc.category) {
            throw new Error(
              'Arquivo não possui caminho (path) ou categoria configurada no GED. Ele pode ter sido cadastrado offline.',
            )
          }

          const url = await m365Service.getFilePreviewUrl(doc.filePath, doc.category)
          setPreviewUrl(url)
        } else if (viewItem.type === 'contract') {
          const contract = contracts.find((c) => c.id === viewItem.id)
          if (!contract) throw new Error('Contrato não encontrado.')
          setTitle(contract.documentName)

          const template = templates.find((t) => t.name === contract.template)
          if (!template) {
            throw new Error(`O modelo de contrato "${contract.template}" não foi encontrado.`)
          }

          if (template.content) {
            setTemplateContent(template.content)
          } else {
            throw new Error('O modelo selecionado está vazio e não possui conteúdo para exibição.')
          }
        }
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro ao tentar carregar o documento do SharePoint.')
      } finally {
        setLoading(false)
      }
    }

    loadPreview()
  }, [open, viewItem, docName, documents, contracts, templates])

  const handleOpenExternal = () => {
    if (previewUrl) window.open(previewUrl, '_blank')
  }

  if (!open && !docName && !viewItem) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden bg-muted/30">
        <DialogHeader className="p-4 border-b bg-background flex flex-row items-center justify-between shrink-0">
          <div className="space-y-1">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {title}
            </DialogTitle>
            <DialogDescription>
              {viewItem?.type === 'document'
                ? 'Visualização nativa via SharePoint Online (Modo Leitura)'
                : 'Visualização de Minuta do Sistema'}
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2 mr-6">
            {previewUrl && (
              <Button variant="outline" size="sm" onClick={handleOpenExternal}>
                <ExternalLink className="w-4 h-4 mr-2" /> Abrir no SharePoint
              </Button>
            )}
            <Button variant="outline" size="sm" disabled={!previewUrl && !templateContent}>
              <Download className="w-4 h-4 mr-2" /> Baixar
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto relative bg-muted/10">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-sm font-medium text-foreground">
                Sincronizando com o Microsoft 365...
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Buscando o arquivo mais recente do GED
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background">
              <div className="bg-destructive/10 p-4 rounded-full mb-4">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Documento Indisponível</h3>
              <p className="text-muted-foreground max-w-md">{error}</p>
            </div>
          )}

          {!loading && !error && previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title={title}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          )}

          {!loading && !error && templateContent && (
            <div className="p-4 md:p-8 flex justify-center">
              <div className="bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl min-h-full flex flex-col">
                <div className="text-center mb-10 border-b pb-8">
                  {agencyProfile.logo && (
                    <img
                      src={agencyProfile.logo}
                      alt="Logo"
                      className="h-20 mx-auto mb-6 object-contain"
                    />
                  )}
                  <h1 className="text-2xl font-bold uppercase underline">Contrato de Locação</h1>
                  <p className="text-muted-foreground mt-4 font-semibold">{agencyProfile.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {agencyProfile.address} | {agencyProfile.website}
                  </p>
                </div>
                <div
                  className="space-y-4 text-sm text-foreground/90 text-justify leading-relaxed flex-1 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: templateContent }}
                />
                <div className="mt-16 pt-8 flex justify-between px-8 opacity-50">
                  <div className="text-center">
                    <div className="w-48 border-b border-foreground/50 mb-2"></div>
                    <p className="text-xs">Locador</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 border-b border-foreground/50 mb-2"></div>
                    <p className="text-xs">Locatário</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legacy Fallback Render */}
          {!loading && !error && !viewItem && (
            <div className="p-4 md:p-8 flex justify-center">
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
                    {isTerm ? 'Termo de Responsabilidade' : 'Documento'}
                  </h1>
                  <p className="text-muted-foreground mt-4 font-semibold">{agencyProfile.name}</p>
                </div>
                <div className="space-y-6 text-sm text-foreground/90 text-justify leading-relaxed flex-1">
                  {isTerm ? (
                    <>
                      <p>
                        Declaro para os devidos fins que recebi/entreguei as chaves referentes ao
                        imóvel situado no endereço supracitado, em plenas condições de acordo com o
                        processo em vigência.
                      </p>
                      <p>
                        O presente termo isenta ou responsabiliza a parte envolvida com base na
                        vistoria anexada aos autos, em conformidade com as políticas internas da{' '}
                        <strong>{agencyProfile.name}</strong>.
                      </p>
                    </>
                  ) : (
                    <p>Conteúdo do documento não disponível via preview direto.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
