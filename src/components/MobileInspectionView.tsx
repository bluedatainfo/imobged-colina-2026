import { useState } from 'react'
import { Camera, UploadCloud, CheckCircle2, Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import useMainStore, { Property } from '@/stores/main'

interface Props {
  pendingInspections: Property[]
  onComplete: (propertyId: string, notes: string) => void
}

export function MobileInspectionView({ pendingInspections, onComplete }: Props) {
  const { agencyProfile } = useMainStore()
  const [propertyId, setPropertyId] = useState('')
  const [notes, setNotes] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handlePhotoUpload = () => {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setHasPhoto(true)
    }, 1500)
  }

  const handleSubmit = () => {
    if (propertyId) {
      onComplete(propertyId, notes)
      setPropertyId('')
      setNotes('')
      setHasPhoto(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
        {agencyProfile.logo ? (
          <img
            src={agencyProfile.logo}
            alt={agencyProfile.name}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <Building className="h-8 w-8 text-primary" />
        )}
        <div>
          <h2 className="font-bold text-lg leading-tight">{agencyProfile.name}</h2>
          <p className="text-xs text-muted-foreground">Portal do Vistoriador</p>
        </div>
      </div>

      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl">Nova Vistoria (Mobile)</CardTitle>
          <CardDescription>
            Fotos são enviadas via OCR para a Gestão de Locação (SharePoint).
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          <div className="space-y-3">
            <Label>Selecione o Imóvel</Label>
            <Select value={propertyId} onValueChange={setPropertyId}>
              <SelectTrigger className="h-14 text-base">
                <SelectValue placeholder="Toque para escolher..." />
              </SelectTrigger>
              <SelectContent>
                {pendingInspections.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="py-3">
                    {p.title}
                  </SelectItem>
                ))}
                {pendingInspections.length === 0 && (
                  <SelectItem value="none" disabled>
                    Nenhuma vistoria pendente
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Captura de Imagem (OCR Automático)</Label>
            {hasPhoto ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-700 flex flex-col items-center">
                <CheckCircle2 className="h-10 w-10 mb-2" />
                <span className="font-medium">Foto processada com sucesso</span>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-32 flex flex-col gap-2 border-dashed border-2 border-primary/30 hover:bg-primary/5"
                onClick={handlePhotoUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <UploadCloud className="h-8 w-8 text-primary animate-bounce" />
                ) : (
                  <Camera className="h-8 w-8 text-primary" />
                )}
                <span>{uploading ? 'Enviando...' : 'Tirar Foto do Laudo'}</span>
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <Label>Observações Extras</Label>
            <Textarea
              placeholder="Digite notas rápidas aqui..."
              className="min-h-[120px] text-base"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            size="lg"
            className="w-full h-14 text-lg"
            disabled={!propertyId || !hasPhoto}
            onClick={handleSubmit}
          >
            Sincronizar Vistoria
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
