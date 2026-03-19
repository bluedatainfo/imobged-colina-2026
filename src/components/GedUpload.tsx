import { useState } from 'react'
import { UploadCloud, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { m365Service } from '@/lib/m365'
import useMainStore from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface GedUploadProps {
  preselectedPropertyId?: string
  preselectedType?: string
  onSuccess?: () => void
}

const DOCUMENT_TYPES = [
  { id: 'OWNER_DOCUMENT', label: 'Documento de Proprietário' },
  { id: 'TENANT_DOCUMENT', label: 'Documento de Inquilino' },
  { id: 'CONTRACT_ACTIVE', label: 'Contrato Ativo' },
  { id: 'CONTRACT_TERMINATED', label: 'Contrato Encerrado' },
  { id: 'INSPECTION_MOVE_IN', label: 'Vistoria de Entrada' },
  { id: 'INSPECTION_MOVE_OUT', label: 'Vistoria de Saída' },
]

export function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }: GedUploadProps) {
  const { properties } = useMainStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const [propertyId, setPropertyId] = useState(preselectedPropertyId || '')
  const [docType, setDocType] = useState(preselectedType || '')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !propertyId || !docType) return

    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    setUploading(true)
    try {
      await m365Service.uploadStructuredDocument(
        file,
        file.name,
        docType,
        property.id,
        property.title,
        user?.name || 'Sistema',
      )
      toast({
        title: 'Upload Concluído',
        description: 'Documento enviado e classificado com sucesso no SharePoint.',
      })
      setFile(null)
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      if (onSuccess) onSuccess()
    } catch (e: any) {
      // Error handled in m365Service
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 flex-1 flex flex-col">
      <div className="grid gap-2">
        <Label>Imóvel Relacionado</Label>
        <Select value={propertyId} onValueChange={setPropertyId} disabled={!!preselectedPropertyId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o imóvel..." />
          </SelectTrigger>
          <SelectContent>
            {properties.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Categoria do Documento</Label>
        <Select value={docType} onValueChange={setDocType} disabled={!!preselectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria..." />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Arquivo Selecionado</Label>
        <Input id="file-upload" type="file" onChange={handleFileChange} />
      </div>

      <Button
        className="w-full mt-auto gap-2"
        onClick={handleUpload}
        disabled={!file || !propertyId || !docType || uploading}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="h-4 w-4" />
        )}
        Processar e Enviar (GED)
      </Button>
    </div>
  )
}
