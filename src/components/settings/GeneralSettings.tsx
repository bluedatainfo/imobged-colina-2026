import { useState } from 'react'
import { Save, Users, Clock, Mail } from 'lucide-react'
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

export default function GeneralSettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.settings)

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    mainStore.updateSettings(formData)
    toast({
      title: 'Configurações Gerais Salvas',
      description: 'Papéis, contas M365 e regras de SLA atualizados com sucesso.',
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Equipes M365 (Papéis e Notificações)
          </CardTitle>
          <CardDescription>
            Atribua contas do Microsoft 365 para as funções que receberão e-mails automatizados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Conta M365 (Gerência)</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.managementEmails}
                onChange={(e) => handleChange('managementEmails', e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Administrativo)</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.administrativeEmails}
                onChange={(e) => handleChange('administrativeEmails', e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Operacional / Vistorias)</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.operationalEmails}
                onChange={(e) => handleChange('operationalEmails', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Monitoramento SLA
          </CardTitle>
          <CardDescription>
            Configure o tempo máximo permitido para a etapa de "Análise Gerencial".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Limite SLA (em horas)</Label>
            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                value={formData.slaHours}
                onChange={(e) => handleChange('slaHours', parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 py-4 flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Salvar Configurações Gerais
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
