import { useState } from 'react'
import { Save, Building2, Link as LinkIcon, MapPin } from 'lucide-react'
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

export default function AgencySettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.agencyProfile)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> Identidade Visual e Dados
          </CardTitle>
          <CardDescription>
            Configure a marca e as informações oficiais da imobiliária para uso no sistema e em
            documentos gerados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden shrink-0 relative">
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
              <div className="grid gap-2">
                <Label>URL da Logomarca</Label>
                <Input
                  placeholder="https://exemplo.com/logo.png"
                  value={formData.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                />
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
