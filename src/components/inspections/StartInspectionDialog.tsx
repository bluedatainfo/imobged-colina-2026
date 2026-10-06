import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Home, FileText, User } from 'lucide-react'
import { inspectionsService, InspectionType, EligibleItem } from '@/services/inspections'
import { useToast } from '@/hooks/use-toast'

interface StartInspectionDialogProps {
  open: boolean
  onClose: () => void
  onCreated: (newInspectionId: string) => void
  currentUserName: string
  currentUserEmail?: string
}

export function StartInspectionDialog({
  open,
  onClose,
  onCreated,
  currentUserName,
  currentUserEmail,
}: StartInspectionDialogProps) {
  const { toast } = useToast()
  const [type, setType] = useState<InspectionType>('MOVE_IN')
  const [inspectorName, setInspectorName] = useState(currentUserName)
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString().split('T')[0])
  const [observations, setObservations] = useState('')
  const [loadingTargets, setLoadingTargets] = useState(false)
  const [eligibleTargets, setEligibleTargets] = useState<EligibleItem[]>([])
  const [selectedTargetKey, setSelectedTargetKey] = useState<string>('')
  const [customContract, setCustomContract] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Atualizar vistoriador caso o usuário logado mude
  useEffect(() => {
    if (currentUserName) setInspectorName(currentUserName)
  }, [currentUserName])

  // Buscar itens elegíveis de acordo com o tipo
  useEffect(() => {
    if (!open) return
    const fetchTargets = async () => {
      setLoadingTargets(true)
      setSelectedTargetKey('')
      try {
        const targets = await inspectionsService.getEligibleTargets(type)
        setEligibleTargets(targets)
        if (targets.length > 0) {
          setSelectedTargetKey(targets[0].propertyId)
          setCustomContract(targets[0].contractNumber)
        }
      } catch (err: any) {
        console.error('Erro ao buscar alvos:', err)
        toast({
          title: 'Erro ao carregar elegíveis',
          description: err.message,
          variant: 'destructive',
        })
      } finally {
        setLoadingTargets(false)
      }
    }

    fetchTargets()
  }, [open, type, toast])

  const selectedTarget = eligibleTargets.find((t) => t.propertyId === selectedTargetKey)

  const handleSelectTarget = (propId: string) => {
    setSelectedTargetKey(propId)
    const found = eligibleTargets.find((t) => t.propertyId === propId)
    if (found) {
      setCustomContract(found.contractNumber)
    }
  }

  const handleSubmit = async () => {
    if (!selectedTarget) {
      toast({
        title: 'Selecione um imóvel',
        description: 'É necessário selecionar um imóvel/dossiê para iniciar a vistoria.',
        variant: 'destructive',
      })
      return
    }

    if (!inspectorName.trim()) {
      toast({
        title: 'Informe o vistoriador',
        description: 'Digite o nome do vistoriador responsável.',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)
    try {
      const inspection = await inspectionsService.createInspection({
        propertyId: selectedTarget.propertyId,
        candidateId: selectedTarget.candidateId,
        type,
        inspectorName: inspectorName.trim(),
        contractNumber: customContract.trim() || selectedTarget.contractNumber,
        startedAt: new Date(startedAt).toISOString(),
        observations: observations.trim(),
        operatorName: currentUserName,
        userEmail: currentUserEmail,
      })

      toast({
        title: 'Vistoria Iniciada com Sucesso',
        description: `Vistoria de ${type === 'MOVE_IN' ? 'Entrada' : 'Saída'} criada para ${selectedTarget.propertyTitle}.`,
      })

      onCreated(inspection.id)
      onClose()
    } catch (err: any) {
      console.error('Erro ao criar vistoria:', err)
      toast({
        title: 'Erro ao iniciar vistoria',
        description: err.message || 'Falha ao gravar vistoria no banco de dados.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && !submitting && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="w-5 h-5 text-primary" /> Iniciar Nova Vistoria
          </DialogTitle>
          <DialogDescription>
            Vistorias nascem de análises aprovadas (Entrada) ou contratos em andamento (Saída).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Tipo de Vistoria */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Tipo de Vistoria</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={type === 'MOVE_IN' ? 'default' : 'outline'}
                className="justify-center gap-2 h-11"
                onClick={() => setType('MOVE_IN')}
              >
                Vistoria de Entrada
                <Badge variant={type === 'MOVE_IN' ? 'secondary' : 'outline'} className="text-xs">
                  Novos Contratos
                </Badge>
              </Button>
              <Button
                type="button"
                variant={type === 'MOVE_OUT' ? 'default' : 'outline'}
                className="justify-center gap-2 h-11"
                onClick={() => setType('MOVE_OUT')}
              >
                Vistoria de Saída
                <Badge variant={type === 'MOVE_OUT' ? 'secondary' : 'outline'} className="text-xs">
                  Em Andamento
                </Badge>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              {type === 'MOVE_IN'
                ? 'Lista dossiês com Análise Aprovada elegíveis para nova locação.'
                : 'Lista contratos e imóveis ativos para conferência de entrega e rescisão.'}
            </p>
          </div>

          {/* Seleção do Imóvel / Dossiê */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Imóvel / Dossiê Vinculado</Label>
            {loadingTargets ? (
              <div className="flex items-center justify-center p-6 border rounded-md bg-muted/20">
                <Loader2 className="w-5 h-5 animate-spin mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">Buscando imóveis elegíveis...</span>
              </div>
            ) : eligibleTargets.length === 0 ? (
              <div className="p-4 border rounded-md bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-sm">
                Nenhum imóvel elegível encontrado para{' '}
                {type === 'MOVE_IN' ? 'Vistoria de Entrada' : 'Vistoria de Saída'}.
              </div>
            ) : (
              <Select value={selectedTargetKey} onValueChange={handleSelectTarget}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o imóvel..." />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {eligibleTargets.map((item) => (
                    <SelectItem key={item.propertyId} value={item.propertyId}>
                      <span className="font-semibold">{item.propertyId}</span> -{' '}
                      {item.propertyTitle} ({item.tenantName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Resumo do Imóvel selecionado */}
          {selectedTarget && (
            <div className="p-3 bg-muted/40 rounded-lg border text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="font-semibold text-foreground">
                  {selectedTarget.propertyTitle}
                </span>
              </div>
              <div className="text-muted-foreground pl-5">{selectedTarget.propertyAddress}</div>
              <div className="flex items-center gap-4 pl-5 pt-1 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> Locatário:{' '}
                  <strong>{selectedTarget.tenantName}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Contrato:{' '}
                  <strong>{selectedTarget.contractNumber}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Número do Contrato e Vistoriador */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Número do Contrato</Label>
              <Input
                value={customContract}
                onChange={(e) => setCustomContract(e.target.value)}
                placeholder="Ex: 2606 ou LOC-2026-01"
              />
              <p className="text-[11px] text-muted-foreground">
                Usado para criar a pasta no SharePoint: .../{customContract || '{Contrato}'}/
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Vistoriador em Campo</Label>
              <Input
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Nome do vistoriador"
              />
            </div>
          </div>

          {/* Data da Vistoria */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Data da Vistoria</Label>
            <Input type="date" value={startedAt} onChange={(e) => setStartedAt(e.target.value)} />
          </div>

          {/* Observações Gerais */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Observações Iniciais</Label>
            <Textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ex.: Chaves retiradas na imobiliária, conferência de pintura, medidores de água/luz..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !selectedTarget || !inspectorName.trim()}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Iniciando...
              </>
            ) : (
              'Iniciar Vistoria e Abrir Galeria'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
