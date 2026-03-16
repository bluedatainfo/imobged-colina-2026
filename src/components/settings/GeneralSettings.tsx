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
  const tenantDomain = store.sharepoint.tenantDomain || 'imobged.com'
  const [formData, setFormData] = useState(store.settings)

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getLocalPart = (email: string) => {
    if (!email) return ''
    return email.split('@')[0]
  }

  const handleEmailChange = (
    field: 'managementEmails' | 'administrativeEmails' | 'operationalEmails',
    val: string,
  ) => {
    const cleanVal = val.replace(/@.*/, '').trim()
    handleChange(field, cleanVal ? `${cleanVal}@${tenantDomain}` : '')
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
            Apenas endereços do domínio validado ({tenantDomain}) são permitidos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Conta M365 (Gerência)</Label>
            <div className="flex gap-2 items-center">
              <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex w-full">
                <Input
                  className="rounded-r-none focus-visible:z-10"
                  value={getLocalPart(formData.managementEmails)}
                  placeholder="gerencia"
                  onChange={(e) => handleEmailChange('managementEmails', e.target.value)}
                />
                <span className="inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm">
                  @{tenantDomain}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Administrativo)</Label>
            <div className="flex gap-2 items-center">
              <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex w-full">
                <Input
                  className="rounded-r-none focus-visible:z-10"
                  value={getLocalPart(formData.administrativeEmails)}
                  placeholder="admin"
                  onChange={(e) => handleEmailChange('administrativeEmails', e.target.value)}
                />
                <span className="inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm">
                  @{tenantDomain}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Conta M365 (Operacional / Vistorias)</Label>
            <div className="flex gap-2 items-center">
              <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex w-full">
                <Input
                  className="rounded-r-none focus-visible:z-10"
                  value={getLocalPart(formData.operationalEmails)}
                  placeholder="operacao"
                  onChange={(e) => handleEmailChange('operationalEmails', e.target.value)}
                />
                <span className="inline-flex items-center px-3 border border-l-0 border-input rounded-r-md bg-muted text-muted-foreground text-sm">
                  @{tenantDomain}
                </span>
              </div>
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
