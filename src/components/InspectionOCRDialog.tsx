import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import useMainStore from '@/stores/main'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: (data: any, propertyId: string, inspectionType: string) => void
  initialData?: any
}

export function InspectionOCRDialog({ open, onClose, onConfirm, initialData }: Props) {
  const { properties } = useMainStore()
  const [formData, setFormData] = useState(initialData || {})
  const [propertyId, setPropertyId] = useState<string>('')
  const [inspectionType, setInspectionType] = useState('entry_inspection')

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      const matched = properties.find((p) => p.status === 'Vistoria')
      if (matched) setPropertyId(matched.id)
    }
  }, [initialData, properties])

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Validação de OCR (Vistoria)</DialogTitle>
          <DialogDescription>
            Revise os dados extraídos pela IA e associe ao imóvel correto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Vincular ao Imóvel (Pendente de Vistoria)</Label>
            <Select value={propertyId} onValueChange={setPropertyId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o imóvel..." />
              </SelectTrigger>
              <SelectContent>
                {properties
                  .filter((p) => p.status === 'Vistoria')
                  .map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      ID: {p.id} - {p.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Tipo de Vistoria</Label>
            <Select value={inspectionType} onValueChange={setInspectionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry_inspection">Vistoria de Entrada</SelectItem>
                <SelectItem value="exit_inspection">Vistoria de Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Endereço Extraído</Label>
            <Input
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Data da Vistoria</Label>
            <Input
              value={formData.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Condição Paredes/Pintura</Label>
            <Input
              value={formData.wallCondition || ''}
              onChange={(e) => handleChange('wallCondition', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Observações Gerais / Móveis</Label>
            <Textarea
              value={formData.generalNotes || ''}
              onChange={(e) => handleChange('generalNotes', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Descartar
          </Button>
          <Button
            onClick={() => onConfirm(formData, propertyId, inspectionType)}
            disabled={!propertyId}
          >
            Salvar Vistoria
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
