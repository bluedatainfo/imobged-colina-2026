import { useState, useRef } from 'react'
import {
  Save,
  Building2,
  Link as LinkIcon,
  MapPin,
  Palette,
  ExternalLink,
  Upload,
  Trash2,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { Link } from 'react-router-dom'

export default function AgencySettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.agencyProfile)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Erro de Upload',
          description: 'A imagem deve ter no máximo 2MB.',
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLogoFile(file)
        setFormData((prev) => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoRemove = () => {
    setLogoFile(null)
    setFormData((prev) => ({ ...prev, logo: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSave = () => {
    mainStore.updateAgencyProfile(formData)
    toast({
      title: 'Perfil Salvo',
      description: 'Os dados da imobiliária foram atualizados com sucesso.',
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Identidade Visual e Dados
            </CardTitle>
            <CardDescription>
              Configure a marca e as informações oficiais da imobiliária para o Portal White-Label e
              documentos.
            </CardDescription>
          </div>
          <Button variant="outline" asChild className="gap-2">
            <Link target="_blank" to="/portal">
              <ExternalLink className="w-4 h-4" /> Ver Portal do Cliente
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden shrink-0 relative"
              style={{ backgroundColor: `${formData.primaryColor}10` }}
            >
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <span className="text-xs text-muted-foreground text-center p-2">Sem Logo</span>
              )}
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" /> Enviar Logomarca
                </Button>
                {formData.logo && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogoRemove}
                    className="gap-2 text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" /> Remover Logomarca
                  </Button>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Razão Social / Nome Fantasia</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Endereço Completo</Label>
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground mt-2 shrink-0" />
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Website Oficial</Label>
              <div className="flex gap-2">
                <LinkIcon className="w-5 h-5 text-muted-foreground mt-2 shrink-0" />
                <Input
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Cor Primária (Portal White-Label)</Label>
              <div className="flex gap-2">
                <Palette className="w-5 h-5 text-muted-foreground mt-2 shrink-0" />
                <div className="flex w-full gap-2 items-center">
                  <Input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-14 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="flex-1 font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 py-4 flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Salvar Perfil
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
