import { useState } from 'react'
import { Save, Users, Clock, Mail, ShieldAlert } from 'lucide-react'
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

const Settings = () => {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.settings)

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    mainStore.updateSettings(formData)
    toast({
      title: 'Configurações Salvas',
      description:
        'Papéis, contas M365 e regras de SLA atualizados com sucesso no sistema e no SharePoint.',
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Gerencie contas do Microsoft 365, permissões de SharePoint e regras de aprovação SLA.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Equipes M365 (Papéis e Notificações)
          </CardTitle>
          <CardDescription>
            Atribua contas do Microsoft 365 para as funções que receberão e-mails automatizados do
            fluxo de locação.
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
                placeholder="gerente@empresa.onmicrosoft.com"
              />
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              Recebe e-mails de "Nova Análise" e violações de SLA.
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Administrativo)</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.administrativeEmails}
                onChange={(e) => handleChange('administrativeEmails', e.target.value)}
                placeholder="admin@empresa.onmicrosoft.com"
              />
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              Recebe e-mails de "Rejeições" e rascunhos de contrato.
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Operacional / Vistorias)</Label>
            <div className="flex gap-2">
              <Mail className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.operationalEmails}
                onChange={(e) => handleChange('operationalEmails', e.target.value)}
                placeholder="operacao@empresa.onmicrosoft.com"
              />
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              Recebe alertas quando uma documentação é "Aprovada" e segue para vistoria.
            </p>
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
            <p className="text-xs flex items-center gap-1 text-amber-600 mt-1">
              <ShieldAlert className="w-3 h-3" />
              Alerta de escalonamento será acionado se a documentação não for aprovada dentro de{' '}
              {formData.slaHours}h.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 py-4 flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Salvar Configurações
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Settings
