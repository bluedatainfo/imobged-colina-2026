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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

interface OCRReviewDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (data: any, library: string) => void
  initialData?: any
  contextSite?: string
}

export function OCRReviewDialog({
  open,
  onClose,
  onConfirm,
  initialData,
  contextSite,
}: OCRReviewDialogProps) {
  const store = useMainStore()
  const { libraries } = store.sharepoint
  const [formData, setFormData] = useState(initialData || {})
  const [library, setLibrary] = useState(libraries.tenantDocs)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  useEffect(() => {
    if (open) {
      setLibrary(libraries.tenantDocs)
    }
  }, [open, libraries.tenantDocs])

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Revisão OCR
            {contextSite && <Badge variant="secondary">{contextSite}</Badge>}
          </DialogTitle>
          <DialogDescription>
            Verifique os dados extraídos do documento antes de salvar no site selecionado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Biblioteca de Destino</Label>
            <Select value={library} onValueChange={setLibrary}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a biblioteca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={libraries.contracts}>{libraries.contracts}</SelectItem>
                <SelectItem value={libraries.ownerDocs}>{libraries.ownerDocs}</SelectItem>
                <SelectItem value={libraries.tenantDocs}>{libraries.tenantDocs}</SelectItem>
                <SelectItem value="Anexos de Processo">Anexos de Processo</SelectItem>
                <SelectItem value="Comprovantes">Comprovantes Financeiros</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="value">Valor Base (R$)</Label>
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
          <Button onClick={() => onConfirm(formData, library)}>Sincronizar e Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
