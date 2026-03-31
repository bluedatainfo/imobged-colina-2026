import { useState, useEffect } from 'react'
import { LayoutGrid, Save } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useModulesStore, defaultModules } from '@/stores/modules'

const moduleLabels: Record<keyof typeof defaultModules, string> = {
  entities: 'Entidades (Prop. / Loc.)',
  properties: 'Imóveis',
  templates: 'Gestão de Modelos',
  contracts: 'Ciclo de Contratos',
  manager_approval: 'Análise da Gerencia',
  documents: 'Documentos GED',
  inspections: 'Vistorias',
  keys: 'Controle de Chaves',
  document_alerts: 'Alertas GED',
  sync_monitor: 'Monitor de Sincronização',
  maintenance: 'Manutenção',
  renewals: 'Renovações',
  legal: 'Jurídico',
  sales: 'Vendas',
  financial: 'Financeiro',
}

export default function ModulesSettings() {
  const { toast } = useToast()
  const store = useModulesStore()
  const [formData, setFormData] = useState(store.modules)

  useEffect(() => {
    setFormData(store.modules)
  }, [store.modules])

  const handleToggle = (key: keyof typeof defaultModules, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSave = async () => {
    await store.updateModules(formData)
    toast({
      title: 'Módulos Atualizados',
      description: 'As configurações de visibilidade dos módulos foram salvas com sucesso.',
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" /> Gestão de Módulos
          </CardTitle>
          <CardDescription>
            Ative ou desative os módulos do sistema. Módulos desativados serão ocultados do menu
            principal para todos os usuários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(moduleLabels) as Array<keyof typeof defaultModules>).map((key) => (
              <div
                key={key}
                className="flex items-center space-x-2 border p-4 rounded-lg bg-card shadow-sm justify-between hover:bg-muted/50 transition-colors"
              >
                <Label
                  htmlFor={`module-${key}`}
                  className="flex-1 cursor-pointer font-medium select-none"
                >
                  {moduleLabels[key]}
                </Label>
                <Switch
                  id={`module-${key}`}
                  checked={formData[key]}
                  onCheckedChange={(checked) => handleToggle(key, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 py-4 flex justify-end rounded-b-lg">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
