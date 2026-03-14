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

interface OCRReviewDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (data: any) => void
  initialData?: any
}

export function OCRReviewDialog({ open, onClose, onConfirm, initialData }: OCRReviewDialogProps) {
  const [formData, setFormData] = useState(initialData || {})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revisão de Dados (OCR)</DialogTitle>
          <DialogDescription>
            Verifique os dados extraídos automaticamente do documento antes de salvar no SharePoint.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome / Razão Social</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documentId">CPF / CNPJ</Label>
            <Input
              id="documentId"
              value={formData.documentId || ''}
              onChange={(e) => handleChange('documentId', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço Extraído</Label>
            <Input
              id="address"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Valor do Contrato (R$)</Label>
            <Input
              id="value"
              value={formData.value || ''}
              onChange={(e) => handleChange('value', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onConfirm(formData)}>Confirmar e Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
