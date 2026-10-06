import { useState, useRef, useTransition } from 'react'
import {
  Upload,
  CheckCircle,
  XCircle,
  Trash2,
  Maximize2,
  Check,
  Send,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Calendar,
  User,
  Home,
  FileText,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { InspectionRecord, InspectionPhotoRecord, inspectionsService } from '@/services/inspections'
import { useToast } from '@/hooks/use-toast'

interface InspectionWorkspaceProps {
  inspection: InspectionRecord
  photos: InspectionPhotoRecord[]
  onPhotosChange: () => void
  onBack: () => void
  onInspectionUpdated: () => void
  currentUserName: string
  currentUserEmail?: string
}

export function InspectionWorkspace({
  inspection,
  photos,
  onPhotosChange,
  onBack,
  onInspectionUpdated,
  currentUserName,
  currentUserEmail,
}: InspectionWorkspaceProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [, startTransition] = useTransition()

  // Estados de Upload
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadCurrentName, setUploadCurrentName] = useState('')

  // Preview ampliado
  const [previewPhoto, setPreviewPhoto] = useState<InspectionPhotoRecord | null>(null)

  // Anotação por foto
  const [editingPhoto, setEditingPhoto] = useState<InspectionPhotoRecord | null>(null)
  const [annotationText, setAnnotationText] = useState('')
  const [savingAnnotation, setSavingAnnotation] = useState(false)

  // Excluir foto
  const [photoToDelete, setPhotoToDelete] = useState<InspectionPhotoRecord | null>(null)
  const [deletingPhoto, setDeletingPhoto] = useState(false)

  // Finalizar vistoria
  const [confirmFinalizeOpen, setConfirmFinalizeOpen] = useState(false)
  const [finalizing, setFinalizing] = useState(false)
  const [finalizeProgress, setFinalizeProgress] = useState(0)
  const [finalizeFileName, setFinalizeFileName] = useState('')

  const isFinalized = inspection.status === 'Finalizada'
  const selectedPhotos = photos.filter((p) => p.selected)
  const unselectedPhotos = photos.filter((p) => !p.selected)
  const attachedCount = photos.filter((p) => p.attached).length

  // Upload múltiplo direto para a Galeria de Trabalho no Supabase Storage
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const fileList = Array.from(files)
    setUploading(true)
    setUploadProgress(0)

    let successCount = 0
    const errors: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      setUploadCurrentName(file.name)
      setUploadProgress(Math.round((i / fileList.length) * 100))

      try {
        await inspectionsService.uploadPhotoToGallery(inspection.id, file)
        successCount++
      } catch (err: any) {
        errors.push(`${file.name}: ${err.message}`)
      }
    }

    setUploadProgress(100)
    setUploading(false)
    setUploadCurrentName('')

    if (fileInputRef.current) fileInputRef.current.value = ''

    onPhotosChange()

    if (errors.length > 0) {
      toast({
        title: `Upload concluído com avisos (${successCount}/${fileList.length})`,
        description: errors.slice(0, 3).join(', ') + (errors.length > 3 ? '...' : ''),
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Fotos adicionadas à Galeria de Trabalho',
        description: `${successCount} foto(s) enviada(s) com sucesso para o armazenamento de trabalho.`,
      })
    }
  }

  // Alternar seleção de uma foto (o próprio vistoriador seleciona as fotos em campo)
  const handleToggleSelect = async (photo: InspectionPhotoRecord) => {
    if (isFinalized) return
    const nextSelected = !photo.selected
    startTransition(() => {
      inspectionsService
        .togglePhotoSelection(photo.id, nextSelected)
        .then(() => onPhotosChange())
        .catch((err) => {
          toast({
            title: 'Erro ao alternar foto',
            description: err.message,
            variant: 'destructive',
          })
        })
    })
  }

  // Selecionar ou desmarcar todas
  const handleSelectAll = async (selected: boolean) => {
    if (isFinalized) return
    try {
      await inspectionsService.setAllPhotosSelection(inspection.id, selected)
      onPhotosChange()
      toast({
        title: selected ? 'Todas selecionadas' : 'Todas desmarcadas',
        description: selected
          ? 'Todas as fotos foram marcadas para envio ao SharePoint.'
          : 'Nenhuma foto está marcada para envio.',
      })
    } catch (err: any) {
      toast({
        title: 'Erro ao atualizar seleção',
        description: err.message,
        variant: 'destructive',
      })
    }
  }

  // Salvar anotação
  const handleOpenAnnotation = (photo: InspectionPhotoRecord) => {
    setEditingPhoto(photo)
    setAnnotationText(photo.annotation || '')
  }

  const handleSaveAnnotation = async () => {
    if (!editingPhoto) return
    setSavingAnnotation(true)
    try {
      await inspectionsService.updatePhotoAnnotation(editingPhoto.id, annotationText)
      toast({ title: 'Anotação salva com sucesso' })
      setEditingPhoto(null)
      onPhotosChange()
    } catch (err: any) {
      toast({
        title: 'Erro ao salvar anotação',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setSavingAnnotation(false)
    }
  }

  // Excluir foto da galeria
  const handleDeletePhoto = async () => {
    if (!photoToDelete) return
    setDeletingPhoto(true)
    try {
      await inspectionsService.deletePhoto(photoToDelete)
      toast({ title: 'Foto removida da galeria' })
      setPhotoToDelete(null)
      onPhotosChange()
    } catch (err: any) {
      toast({
        title: 'Erro ao remover foto',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setDeletingPhoto(false)
    }
  }

  // Finalizar vistoria
  const handleFinalize = async () => {
    setFinalizing(true)
    setFinalizeProgress(0)
    try {
      const result = await inspectionsService.finalizeInspection({
        inspection,
        userName: currentUserName,
        userEmail: currentUserEmail,
        onProgress: (current, total, fileName) => {
          setFinalizeProgress(Math.round((current / total) * 100))
          setFinalizeFileName(fileName)
        },
      })

      setConfirmFinalizeOpen(false)
      onPhotosChange()
      onInspectionUpdated()

      if (result.errors.length > 0) {
        toast({
          title: 'Vistoria Finalizada com Observações de Rede',
          description: `${result.uploadedCount} foto(s) sincronizada(s) no SharePoint e registradas em property_documents. ${result.unselectedCount} foto(s) mantida(s) na galeria. Avisos: ${result.errors.join('; ')}`,
        })
      } else {
        toast({
          title: 'Vistoria Finalizada com Sucesso',
          description: `${result.uploadedCount} foto(s) anexada(s) ao contrato e enviada(s) ao SharePoint. ${result.unselectedCount} foto(s) não selecionada(s) preservada(s) na Galeria de Trabalho.`,
        })
      }
    } catch (err: any) {
      console.error('Falha ao finalizar vistoria:', err)
      toast({
        title: 'Erro ao finalizar vistoria',
        description: err.message || 'Falha ao processar envio para o SharePoint.',
        variant: 'destructive',
      })
    } finally {
      setFinalizing(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Barra Superior / Voltar e Resumo */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar à Lista
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Vistoria de {inspection.type === 'MOVE_IN' ? 'Entrada' : 'Saída'}
              </h2>
              <Badge
                variant={isFinalized ? 'default' : 'outline'}
                className={
                  isFinalized
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300'
                }
              >
                {inspection.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Imóvel: <strong>{inspection.property_id}</strong> &bull; Contrato:{' '}
              <strong>{inspection.contract_number || inspection.property_id}</strong> &bull;
              Vistoriador: <strong>{inspection.inspector_name || 'Não informado'}</strong>
            </p>
          </div>
        </div>

        {/* Ações da Vistoria */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isFinalized && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFilesSelected}
              />
              <Button
                variant="outline"
                className="gap-2"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 text-primary" />
                Adicionar Fotos (~50)
              </Button>

              <Button
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={photos.length === 0 || uploading}
                onClick={() => setConfirmFinalizeOpen(true)}
              >
                <Send className="w-4 h-4" />
                Finalizar Vistoria ({selectedPhotos.length})
              </Button>
            </>
          )}

          {isFinalized && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Vistoria Concluída &bull; {attachedCount} foto(s) no SharePoint</span>
            </div>
          )}
        </div>
      </div>

      {/* Cartão de Informações do Imóvel / Vistoria */}
      <Card className="bg-muted/20 border">
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-primary" /> Imóvel
            </span>
            <div className="font-semibold text-foreground text-sm">
              {inspection.property?.title || inspection.property_id}
            </div>
            <div className="text-muted-foreground truncate">
              {inspection.property?.address || 'Sem endereço cadastrado'}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-primary" /> Locatário / Vínculo
            </span>
            <div className="font-semibold text-foreground text-sm">
              {inspection.candidate?.full_name || inspection.property?.tenant || 'Não informado'}
            </div>
            <div className="text-muted-foreground">
              {inspection.candidate?.cpf ? `CPF: ${inspection.candidate.cpf}` : 'Dossiê Aprovado'}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Data e Vistoriador
            </span>
            <div className="font-semibold text-foreground text-sm">
              {new Date(inspection.started_at).toLocaleDateString('pt-BR')}
            </div>
            <div className="text-muted-foreground">
              Vistoriador: {inspection.inspector_name || 'Em campo'}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-primary" /> Pasta SharePoint
            </span>
            <div className="font-mono text-[11px] text-foreground truncate bg-background p-1 rounded border">
              .../{inspection.property_id}/Locacao/{inspection.contract_number || '{Contrato}'}/
              {inspection.type === 'MOVE_IN' ? 'Vistoria de Entrada' : 'Vistoria de Saida'}/
            </div>
            <div className="text-[11px] text-muted-foreground">
              {photos.length} fotos na galeria &bull; {selectedPhotos.length} selecionadas
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barra de Progresso de Upload */}
      {uploading && (
        <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm animate-pulse">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-blue-900 dark:text-blue-300">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Enviando fotos para a Galeria de
                Trabalho (Supabase Storage)...
              </span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-[11px] text-blue-700 dark:text-blue-400 truncate">
              Arquivo atual: {uploadCurrentName}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Barra de Progresso de Finalização */}
      {finalizing && (
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                Sincronizando fotos selecionadas no SharePoint Online...
              </span>
              <span>{finalizeProgress}%</span>
            </div>
            <Progress value={finalizeProgress} className="h-2" />
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
              Processando: {finalizeFileName} &rarr; pasta do contrato no SharePoint
            </p>
          </CardContent>
        </Card>
      )}

      {/* Controles da Galeria de Fotos */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Galeria de Trabalho ({photos.length})
          </h3>
          <p className="text-xs text-muted-foreground">
            O próprio vistoriador seleciona as fotos em campo. As fotos <strong>marcadas</strong>{' '}
            irão para o SharePoint e dossiê; as <strong>desmarcadas</strong> permanecem seguras na
            galeria.
          </p>
        </div>

        {!isFinalized && photos.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll(true)}
              className="text-xs h-8"
            >
              Marcar Todas ({photos.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll(false)}
              className="text-xs h-8"
            >
              Desmarcar Todas
            </Button>
          </div>
        )}
      </div>

      {/* Grade de Fotos (Galeria) */}
      {photos.length === 0 ? (
        <div className="border-2 border-dashed rounded-xl p-12 text-center bg-muted/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <Upload className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-base">Nenhuma foto adicionada ainda</h4>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Carregue as fotos da vistoria diretamente para a Galeria de Trabalho do imóvel (~50
              fotos por vistoria).
            </p>
          </div>
          {!isFinalized && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
              disabled={uploading}
            >
              <Upload className="w-4 h-4" /> Selecionar Fotos
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {photos.map((photo, idx) => {
            return (
              <div
                key={photo.id}
                className={`group relative rounded-lg border overflow-hidden bg-card transition-all flex flex-col ${
                  photo.selected
                    ? 'ring-2 ring-primary border-primary shadow-sm'
                    : 'border-border/60 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Visualização da Imagem com padrão object-contain com fundo branco */}
                <div className="relative aspect-[4/3] bg-white flex items-center justify-center overflow-hidden border-b">
                  <img
                    src={photo.public_url}
                    alt={photo.original_name}
                    className="w-full h-full object-contain p-1 select-none"
                    loading="lazy"
                  />

                  {/* Número Sequencial */}
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                    #{idx + 1}
                  </div>

                  {/* Botão de Seleção (Marcar/Desmarcar) */}
                  {!isFinalized ? (
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(photo)}
                      title={photo.selected ? 'Desmarcar foto' : 'Marcar para anexar'}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${
                        photo.selected
                          ? 'bg-primary text-primary-foreground scale-105'
                          : 'bg-white/80 dark:bg-black/60 text-muted-foreground hover:scale-105 hover:bg-white'
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 ${photo.selected ? 'stroke-[3]' : 'stroke-[1.5]'}`}
                      />
                    </button>
                  ) : (
                    <div className="absolute top-2 right-2">
                      {photo.attached ? (
                        <span
                          title="Anexada ao Contrato (SharePoint)"
                          className="bg-emerald-600 text-white p-1 rounded-full flex items-center justify-center shadow-md"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </span>
                      ) : (
                        <span
                          title="Não anexada ao contrato (permanece na galeria)"
                          className="bg-amber-500 text-white p-1 rounded-full flex items-center justify-center shadow-md"
                        >
                          <XCircle className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  )}

                  {/* Hover Ações Rápidas: Zoom Ampliado */}
                  <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20"
                      onClick={() => setPreviewPhoto(photo)}
                      title="Visualização ampliada"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </Button>

                    {!isFinalized && !photo.attached && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-300 hover:text-red-100 hover:bg-red-950/40"
                        onClick={() => setPhotoToDelete(photo)}
                        title="Remover foto da galeria"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Rodapé do Card da Foto */}
                <div className="p-2 space-y-1.5 text-xs flex-1 flex flex-col justify-between bg-card">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="font-mono text-[11px] truncate font-medium"
                        title={photo.original_name}
                      >
                        {photo.original_name}
                      </span>
                    </div>

                    {/* Status da foto */}
                    <div className="flex items-center gap-1">
                      {photo.attached ? (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 bg-emerald-50 text-emerald-700 border-emerald-300"
                        >
                          SharePoint &bull; Anexada
                        </Badge>
                      ) : isFinalized ? (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 bg-amber-50 text-amber-700 border-amber-300"
                        >
                          Não anexada ao contrato
                        </Badge>
                      ) : photo.selected ? (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/30"
                        >
                          Selecionada p/ SharePoint
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 text-muted-foreground"
                        >
                          Não selecionada
                        </Badge>
                      )}
                    </div>

                    {/* Observação digitada pelo vistoriador */}
                    {photo.annotation ? (
                      <p className="text-[11px] text-muted-foreground italic line-clamp-2 bg-muted/40 p-1 rounded">
                        &quot;{photo.annotation}&quot;
                      </p>
                    ) : null}
                  </div>

                  {/* Botão de Observação */}
                  {!isFinalized && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-full justify-start text-[11px] px-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleOpenAnnotation(photo)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {photo.annotation ? 'Editar observação' : 'Adicionar observação'}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal de Visualização Ampliada (Object-Contain com fundo branco) */}
      <Dialog open={!!previewPhoto} onOpenChange={(val) => !val && setPreviewPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-4">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-base">
              <span className="truncate pr-4">{previewPhoto?.original_name}</span>
              {previewPhoto?.attached ? (
                <Badge className="bg-emerald-600">Anexada no SharePoint</Badge>
              ) : previewPhoto?.selected ? (
                <Badge variant="secondary">Selecionada</Badge>
              ) : (
                <Badge variant="outline">Não selecionada</Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {/* Área da Imagem ampliada */}
          <div className="flex-1 min-h-[300px] max-h-[65vh] bg-white rounded-md border flex items-center justify-center p-2 overflow-hidden">
            {previewPhoto?.public_url && (
              <img
                src={previewPhoto.public_url}
                alt={previewPhoto.original_name}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Anotação e Rodapé do modal */}
          <div className="space-y-2 pt-2">
            {previewPhoto?.annotation && (
              <div className="p-2 bg-muted/50 rounded-md text-xs">
                <span className="font-semibold block mb-0.5">Observação do Vistoriador:</span>
                <p className="text-muted-foreground">{previewPhoto.annotation}</p>
              </div>
            )}
            <DialogFooter className="sm:justify-between items-center gap-2">
              <div className="text-xs text-muted-foreground">
                Enviada em{' '}
                {previewPhoto && new Date(previewPhoto.uploaded_at).toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-2">
                {!isFinalized && previewPhoto && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleToggleSelect(previewPhoto)
                      setPreviewPhoto({
                        ...previewPhoto,
                        selected: !previewPhoto.selected,
                      })
                    }}
                  >
                    {previewPhoto.selected ? 'Desmarcar da Vistoria' : 'Marcar para Vistoria'}
                  </Button>
                )}
                <Button variant="default" size="sm" onClick={() => setPreviewPhoto(null)}>
                  Fechar
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Anotação da Foto */}
      <Dialog
        open={!!editingPhoto}
        onOpenChange={(val) => !val && !savingAnnotation && setEditingPhoto(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Observação da Foto
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <p className="text-xs text-muted-foreground truncate font-mono">
              {editingPhoto?.original_name}
            </p>
            <Textarea
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Ex.: Mancha de umidade no canto superior direito; azulejo trincado próximo à pia; pintura descascando..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingPhoto(null)}
              disabled={savingAnnotation}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveAnnotation} disabled={savingAnnotation}>
              {savingAnnotation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...
                </>
              ) : (
                'Salvar Observação'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmação de Exclusão de Foto */}
      <AlertDialog
        open={!!photoToDelete}
        onOpenChange={(val) => !val && !deletingPhoto && setPhotoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Foto da Galeria?</AlertDialogTitle>
            <AlertDialogDescription>
              A foto <strong>&quot;{photoToDelete?.original_name}&quot;</strong> será removida da
              Galeria de Trabalho do Supabase Storage. Esta ação é definitiva para este arquivo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingPhoto}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePhoto}
              disabled={deletingPhoto}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deletingPhoto ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Remover Foto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmação de Finalização de Vistoria */}
      <AlertDialog
        open={confirmFinalizeOpen}
        onOpenChange={(val) => !val && !finalizing && setConfirmFinalizeOpen(false)}
      >
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Send className="w-5 h-5 text-emerald-600" />
              <AlertDialogTitle className="text-xl">
                Finalizar Vistoria de {inspection.type === 'MOVE_IN' ? 'Entrada' : 'Saída'}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription asChild>
              <div className="space-y-3 pt-2 text-sm text-foreground">
                <p>
                  Você está prestes a concluir a vistoria do imóvel{' '}
                  <strong>{inspection.property?.title || inspection.property_id}</strong> (Contrato:{' '}
                  <strong>{inspection.contract_number || inspection.property_id}</strong>).
                </p>

                <div className="p-3 bg-muted/60 border rounded-md text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Resumo da Seleção:</span>
                    <Badge variant="secondary">{photos.length} fotos no total</Badge>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>
                      <strong className="text-emerald-700 dark:text-emerald-400">
                        {selectedPhotos.length} foto(s) SELECIONADA(S):
                      </strong>{' '}
                      serão transferidas para a pasta correspondente no SharePoint e registradas em{' '}
                      <code>property_documents</code> como{' '}
                      <em>
                        &quot;
                        {inspection.type === 'MOVE_IN'
                          ? 'Vistoria de Entrada'
                          : 'Vistoria de Saida'}
                        &quot;
                      </em>
                      .
                    </li>
                    <li>
                      <strong className="text-amber-700 dark:text-amber-400">
                        {unselectedPhotos.length} foto(s) NÃO SELECIONADA(S):
                      </strong>{' '}
                      permanecerão na galeria de trabalho do Supabase marcadas como{' '}
                      <em>&quot;não anexadas ao contrato&quot;</em>, recuperáveis a qualquer
                      momento.
                    </li>
                  </ul>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md text-xs text-blue-900 dark:text-blue-300">
                  <span className="font-semibold block mb-0.5">
                    Estrutura de Pastas no SharePoint:
                  </span>
                  <span className="font-mono text-[11px] block break-all">
                    .../{inspection.property_id}/Locacao/
                    {inspection.contract_number || '{Contrato}'}/
                    {inspection.type === 'MOVE_IN' ? 'Vistoria de Entrada' : 'Vistoria de Saida'}/
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel disabled={finalizing}>Cancelar</AlertDialogCancel>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleFinalize}
              disabled={finalizing || selectedPhotos.length === 0}
            >
              {finalizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sincronizando com SharePoint...
                </>
              ) : (
                `Confirmar e Enviar (${selectedPhotos.length} fotos)`
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
