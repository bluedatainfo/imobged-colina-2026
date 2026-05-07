import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  FileText,
  Download,
  Loader2,
  ExternalLink,
  AlertCircle,
  MessageSquare,
  Save,
  CheckCircle2,
  FileEdit,
  ArrowLeft,
  FolderOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useMainStore from '@/stores/main'
import useDocumentsStore, { documentsStore } from '@/stores/documents'
import useContractsStore, { contractsStore } from '@/stores/contracts'
import useTemplatesStore from '@/stores/templates'
import useEntitiesStore from '@/stores/entities'
import { m365Service } from '@/lib/m365'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface DocumentViewerProps {
  open: boolean
  onClose: () => void
  viewItem?: {
    type: 'document' | 'contract' | 'sp_file'
    id: string
    name?: string
    siteId?: string
    driveId?: string
    webUrl?: string
  } | null
  docName?: string | null
  isTerm?: boolean
}

export function DocumentViewer({ open, onClose, viewItem, docName, isTerm }: DocumentViewerProps) {
  const { agencyProfile, properties } = useMainStore()
  const { documents } = useDocumentsStore()
  const { contracts } = useContractsStore()
  const { templates } = useTemplatesStore()
  const { owners } = useEntitiesStore()
  const { toast } = useToast()
  const { user } = useAuth()
  const contentRef = useRef<HTMLDivElement>(null)

  const isManager = ['Admin', 'Gerente', 'Diretor'].includes(user?.role || '')

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [templateContent, setTemplateContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  // Review Notes State
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  // Correction Fields State
  const [correctionName, setCorrectionName] = useState('')
  const [correctionFile, setCorrectionFile] = useState<File | null>(null)

  // Folder Navigation State
  const [folderItems, setFolderItems] = useState<any[]>([])
  const [selectedFolderItem, setSelectedFolderItem] = useState<any>(null)

  useEffect(() => {
    if (!open) return

    if (!viewItem) {
      setTitle(docName || 'Documento')
      setPreviewUrl(null)
      setTemplateContent(null)
      setError(null)
      setNotes('')
      setSavedNotes('')
      setCorrectionName('')
      setCorrectionFile(null)
      setFolderItems([])
      setSelectedFolderItem(null)
      return
    }

    const loadPreview = async () => {
      setLoading(true)
      setError(null)
      setPreviewUrl(null)
      setTemplateContent(null)
      setNotes('')
      setSavedNotes('')
      setCorrectionFile(null)
      setFolderItems([])
      setSelectedFolderItem(null)

      try {
        if (viewItem.type === 'document') {
          const doc = documents.find((d) => d.id === viewItem.id)
          if (!doc) throw new Error('Documento não encontrado na base de dados.')
          setTitle(doc.name)
          setNotes(doc.reviewNotes || '')
          setSavedNotes(doc.reviewNotes || '')
          setCorrectionName(doc.name)

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
          setNotes(contract.reviewNotes || '')
          setSavedNotes(contract.reviewNotes || '')
          setCorrectionName(contract.documentName)

          // 1. Try to find if this contract was explicitly uploaded to GED
          const uploadedDoc = documents.find(
            (d) => d.propertyId === contract.propertyId && d.name === contract.documentName,
          )

          if (uploadedDoc && uploadedDoc.filePath && uploadedDoc.category) {
            const url = await m365Service.getFilePreviewUrl(
              uploadedDoc.filePath,
              uploadedDoc.category,
            )
            setPreviewUrl(url)
            setLoading(false)
            return
          }

          // 2. Hybrid Search: Try to find the file dynamically in SharePoint by name
          try {
            const spUrl = await m365Service.findDocumentInSharePoint(contract.documentName)
            if (spUrl) {
              setPreviewUrl(spUrl)
              setLoading(false)
              return
            }
          } catch (e) {
            console.warn('Busca híbrida de contrato no SP falhou, caindo para template local.', e)
          }

          // 3. Fallback: Show the Template HTML with replaced real data or existing contract content
          if (contract.content) {
            setTemplateContent(contract.content)
          } else {
            const template = templates.find((t) => t.name === contract.template)
            if (!template) {
              throw new Error(`O modelo de contrato "${contract.template}" não foi encontrado.`)
            }

            if (template.content) {
              const property = properties.find((p) => p.id === contract.propertyId)
              const owner = owners.find((o) => o.id === property?.ownerId)

              let finalContent = template.content
              finalContent = finalContent.replace(
                /\{\{tenantName\}\}/gi,
                contract.tenantName || 'Inquilino a Definir',
              )
              finalContent = finalContent.replace(
                /\{\{propertyAddress\}\}/gi,
                property?.address || 'Endereço Indisponível',
              )
              finalContent = finalContent.replace(
                /\{\{ownerName\}\}/gi,
                owner?.fullName || 'Proprietário Não Vinculado',
              )
              finalContent = finalContent.replace(
                /\{\{rentValue\}\}/gi,
                property?.rentValue ? `R$ ${property.rentValue}` : 'Valor a Definir',
              )

              setTemplateContent(finalContent)
            } else {
              throw new Error(
                'O modelo selecionado está vazio e não possui conteúdo para exibição.',
              )
            }
          }
        } else if (viewItem.type === 'sp_file') {
          setTitle(viewItem.name || 'Arquivo SharePoint')
          setNotes('')
          setSavedNotes('')
          setCorrectionName(viewItem.name || '')

          if (viewItem.siteId && viewItem.driveId && viewItem.id) {
            const itemDetails = await m365Service.getDriveItemDetails(
              viewItem.siteId,
              viewItem.driveId,
              viewItem.id,
            )

            if (itemDetails && itemDetails.folder) {
              const children = await m365Service.getDriveItemChildrenRecursive(
                viewItem.siteId,
                viewItem.driveId,
                viewItem.id,
              )
              setFolderItems(children)
              setPreviewUrl(null)
            } else {
              const url = await m365Service.getDriveItemPreviewUrl(
                viewItem.siteId,
                viewItem.driveId,
                viewItem.id,
              )
              if (url) {
                setPreviewUrl(url)
              } else {
                setPreviewUrl(viewItem.webUrl || null)
              }
            }
          } else {
            setPreviewUrl(viewItem.webUrl || null)
          }
        }
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro ao tentar carregar o documento do SharePoint.')
      } finally {
        setLoading(false)
      }
    }

    loadPreview()
  }, [open, viewItem, docName, documents, contracts, templates, properties, owners])

  const handleOpenExternal = () => {
    if (previewUrl) window.open(previewUrl, '_blank')
  }

  const handleSaveNotes = async () => {
    if (!viewItem) return
    setSavingNotes(true)
    try {
      if (viewItem.type === 'document') {
        await documentsStore.updateReviewNotes(viewItem.id, notes)
      } else if (viewItem.type === 'contract') {
        await contractsStore.updateReviewNotes(viewItem.id, notes)
      }
      setSavedNotes(notes)
      toast({
        title: 'Anotações salvas',
        description: 'As notas de revisão foram atualizadas com sucesso.',
      })
    } catch (e) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao salvar as anotações.' })
    } finally {
      setSavingNotes(false)
    }
  }

  const handleSelectFolderItem = async (item: any) => {
    setLoading(true)
    try {
      const url = await m365Service.getDriveItemPreviewUrl(item.siteId, item.driveId, item.id)
      if (url) {
        setPreviewUrl(url)
        setSelectedFolderItem(item)
        setTitle(item.name)
      } else {
        toast({
          title: 'Aviso',
          description:
            'Não foi possível gerar preview deste arquivo. Ele pode ser baixado ou aberto externamente.',
        })
        if (item.webUrl) window.open(item.webUrl, '_blank')
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao carregar arquivo.' })
    } finally {
      setLoading(false)
    }
  }

  const handleResolveWithCorrections = async () => {
    if (!viewItem) return
    setSavingNotes(true)
    try {
      let newPath: string | undefined = undefined

      if (correctionFile && viewItem.type === 'document') {
        const d = documents.find((x) => x.id === viewItem.id)
        if (d) {
          const p = properties.find((x) => x.id === d.propertyId)
          const res = await m365Service.uploadStructuredDocument(
            correctionFile,
            correctionFile.name,
            d.category,
            d.propertyId,
            p?.title || '',
            user?.name || 'Sistema',
          )
          if (res?.success) newPath = res.path
        }
      }

      if (viewItem.type === 'document') {
        await documentsStore.updateDocument(viewItem.id, {
          name: correctionName || undefined,
          filePath: newPath,
          reviewNotes: '',
        })
      } else if (viewItem.type === 'contract') {
        const updatedContent = contentRef.current?.innerHTML || templateContent || ''
        await contractsStore.updateContract(viewItem.id, {
          content: updatedContent,
          reviewNotes: '',
        })
      }

      setSavedNotes('')
      setNotes('')
      toast({
        title: 'Pendência resolvida',
        description: 'As correções foram aplicadas e a pendência foi removida com sucesso.',
      })
      onClose()
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de Atualização',
        description: e.message || 'Falha ao aplicar as correções no documento.',
      })
    } finally {
      setSavingNotes(false)
    }
  }

  if (!open && !docName && !viewItem) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-[1200px] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-muted/30">
        <DialogHeader className="p-4 border-b bg-background flex flex-row items-center justify-between shrink-0">
          <div className="space-y-1 flex items-center">
            {selectedFolderItem && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setPreviewUrl(null)
                  setSelectedFolderItem(null)
                  setTitle(viewItem?.name || 'Pasta')
                }}
                className="mr-3 h-8 w-8 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <DialogTitle className="flex items-center gap-2">
                {folderItems.length > 0 && !selectedFolderItem ? (
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                ) : (
                  <FileText className="w-5 h-5 text-blue-600" />
                )}
                <span className="truncate max-w-[400px] block" title={title}>
                  {title}
                </span>
              </DialogTitle>
              <DialogDescription>
                {viewItem?.type === 'sp_file' || viewItem?.type === 'document' || previewUrl
                  ? 'Visualização nativa via SharePoint Online (Modo Leitura)'
                  : 'Visualização de Minuta do Sistema (Dados preenchidos)'}
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-6 shrink-0">
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

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 overflow-auto relative bg-muted/10 flex flex-col">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-sm font-medium text-foreground">
                  Sincronizando com o Microsoft 365...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Realizando busca híbrida por arquivos GED
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background">
                <div className="bg-destructive/10 p-4 rounded-full mb-4">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Documento Indisponível
                </h3>
                <p className="text-muted-foreground max-w-md">{error}</p>
              </div>
            )}

            {!loading && !error && previewUrl && (
              <iframe
                src={previewUrl}
                className="w-full flex-1 border-0 bg-white"
                title={title}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            )}

            {!loading && !error && folderItems.length > 0 && !previewUrl && (
              <div className="p-4 md:p-8 flex-1 overflow-auto bg-background">
                <h3 className="text-lg font-semibold mb-6 border-b pb-2">
                  Conteúdo da Pasta: {title}
                </h3>
                <div className="grid gap-3">
                  {folderItems
                    .filter((item) => !item.isFolder)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectFolderItem(item)}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 hover:border-primary/50 text-left transition-all group shadow-sm"
                      >
                        <div className="bg-blue-50 p-2 rounded-md group-hover:bg-blue-100 transition-colors">
                          <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-medium text-foreground truncate">{item.name}</span>
                          <span className="text-xs text-muted-foreground truncate">
                            {item.displayPath}
                          </span>
                        </div>
                      </button>
                    ))}
                  {folderItems.filter((item) => !item.isFolder).length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
                      <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground font-medium">
                        Nenhum arquivo encontrado.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Esta pasta e suas subpastas não possuem arquivos compatíveis.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!loading && !error && !previewUrl && templateContent && (
              <div className="p-4 md:p-8 flex justify-center flex-1">
                <div className="bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit">
                  <div className="text-center mb-10 border-b pb-8">
                    {agencyProfile.logo && (
                      <img
                        src={agencyProfile.logo}
                        alt="Logo"
                        className="h-20 mx-auto mb-6 object-contain"
                      />
                    )}
                    <h1 className="text-2xl font-bold uppercase underline">
                      {viewItem?.type === 'contract' ? title : 'Documento do Sistema'}
                    </h1>
                    <p className="text-muted-foreground mt-4 font-semibold">{agencyProfile.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agencyProfile.address} | {agencyProfile.website}
                    </p>
                  </div>

                  {viewItem?.type === 'contract' && !!savedNotes && (
                    <div className="bg-blue-50 text-blue-800 p-3 mb-6 rounded text-sm flex items-center gap-2 border border-blue-100 shadow-sm">
                      <FileEdit className="w-5 h-5 shrink-0" />
                      Modo de edição ativo: Clique diretamente no texto do contrato abaixo para
                      realizar as alterações necessárias.
                    </div>
                  )}

                  <div
                    ref={contentRef}
                    contentEditable={viewItem?.type === 'contract' && !!savedNotes}
                    suppressContentEditableWarning
                    className={cn(
                      'space-y-4 text-sm text-foreground/90 text-justify leading-relaxed flex-1 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>strong]:font-bold outline-none transition-all',
                      viewItem?.type === 'contract' && !!savedNotes
                        ? 'focus:ring-2 focus:ring-primary/50 p-4 -mx-4 rounded-md hover:bg-muted/30 cursor-text min-h-[300px]'
                        : '',
                    )}
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

            {!loading && !error && !viewItem && (
              <div className="p-4 md:p-8 flex justify-center flex-1">
                <div className="bg-background shadow-lg border p-10 md:p-16 w-full max-w-3xl flex flex-col h-fit">
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
                          imóvel situado no endereço supracitado, em plenas condições de acordo com
                          o processo em vigência.
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

          {viewItem && viewItem.type !== 'sp_file' && (
            <div className="w-full md:w-[340px] shrink-0 border-t md:border-t-0 md:border-l bg-background flex flex-col z-20">
              <div className="p-4 border-b font-medium flex items-center gap-2 bg-muted/30">
                <MessageSquare className="w-4 h-4 text-primary" /> Avaliação e Correções
              </div>
              <div className="p-4 flex-1 overflow-auto flex flex-col gap-6">
                {savedNotes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm animate-in fade-in slide-in-from-top-2 shadow-sm">
                    <strong className="text-amber-900 flex items-center gap-1 mb-2">
                      <AlertCircle className="w-4 h-4" /> Nota Atual de Revisão:
                    </strong>
                    <p className="text-amber-800 whitespace-pre-wrap">{savedNotes}</p>
                  </div>
                )}

                <div className="bg-card p-4 rounded-md border shadow-sm space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2 border-b pb-2">
                    <Save className="w-4 h-4 text-primary" />{' '}
                    {savedNotes ? 'Aplicar Correções e Resolver' : 'Editar Metadados'}
                  </h4>

                  {viewItem.type === 'document' && (
                    <>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Nome do Arquivo / Título</Label>
                        <Input
                          value={correctionName}
                          onChange={(e) => setCorrectionName(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <Label className="text-xs text-muted-foreground flex justify-between">
                          Substituir Arquivo <span className="font-normal">(Opcional)</span>
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) => setCorrectionFile(e.target.files?.[0] || null)}
                          className="h-8 text-xs cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {viewItem.type === 'contract' && savedNotes && (
                    <div className="text-sm text-muted-foreground mb-4">
                      {previewUrl ? (
                        <p>
                          Este contrato está armazenado no SharePoint. Edite-o diretamente
                          utilizando o botão "Abrir no SharePoint" e depois clique em Salvar para
                          resolver a pendência.
                        </p>
                      ) : (
                        <p>
                          As alterações feitas no painel à esquerda serão salvas e a pendência será
                          marcada como resolvida para reanálise.
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleResolveWithCorrections}
                    disabled={savingNotes}
                    size="sm"
                    className={cn(
                      'w-full mt-4',
                      savedNotes ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : '',
                    )}
                  >
                    {savingNotes ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : savedNotes ? (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {savedNotes ? 'Salvar e Marcar Resolvido' : 'Salvar Alterações'}
                  </Button>
                </div>

                {isManager && (
                  <div className="pt-4 border-t space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" /> Gestão da Nota de Revisão
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Modifique ou insira um novo apontamento para este documento.
                    </p>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Assinatura ilegível, data incorreta, falta anexo..."
                      className="min-h-[100px] resize-none text-sm"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      size="sm"
                      className="w-full"
                    >
                      {savingNotes ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Atualizar Nota
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
