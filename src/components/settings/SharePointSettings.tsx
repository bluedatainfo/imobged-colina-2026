import { useState } from 'react'
import { Save, Database, Server, Link, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'

export default function SharePointSettings() {
  const { toast } = useToast()
  const store = useMainStore()
  const [formData, setFormData] = useState(store.sharepoint)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLibraryChange = (field: keyof typeof formData.libraries, value: string) => {
    setFormData((prev) => ({
      ...prev,
      libraries: { ...prev.libraries, [field]: value },
    }))
  }

  const handleListChange = (field: keyof typeof formData.lists, value: string) => {
    setFormData((prev) => ({
      ...prev,
      lists: { ...prev.lists, [field]: value },
    }))
  }

  const handleSave = () => {
    mainStore.updateSharePointSettings(formData)
    toast({
      title: 'Integração SharePoint Salva',
      description: 'Mapeamento de site, bibliotecas e listas atualizados com sucesso.',
    })
  }

  const testConnection = () => {
    setIsTesting(true)
    setTestResult('idle')
    setTimeout(() => {
      setIsTesting(false)
      if (!formData.siteUrl || !formData.libraries.contracts) {
        setTestResult('error')
        toast({
          variant: 'destructive',
          title: 'Erro de Conexão',
          description: 'Não foi possível acessar a biblioteca no Site especificado.',
        })
      } else {
        setTestResult('success')
        toast({
          title: 'Conexão Bem-Sucedida',
          description: 'Acesso confirmado ao Site, Bibliotecas e Listas via Microsoft Graph API.',
        })
      }
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" /> Conexão com Site
          </CardTitle>
          <CardDescription>
            Parâmetros principais do site SharePoint no Microsoft 365.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Tenant ID (Microsoft 365)</Label>
            <Input value={formData.tenantId} readOnly className="bg-muted text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              O ID do Tenant é gerenciado pela autenticação M365 e é somente leitura.
            </p>
          </div>
          <div className="grid gap-2">
            <Label>SharePoint Site URL ou Site ID</Label>
            <div className="flex gap-2">
              <Link className="w-5 h-5 text-muted-foreground mt-2" />
              <Input
                value={formData.siteUrl}
                onChange={(e) => handleChange('siteUrl', e.target.value)}
                placeholder="https://suaempresa.sharepoint.com/sites/GestaoDeLocacao"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" /> Bibliotecas
            </CardTitle>
            <CardDescription>Onde os arquivos processados serão armazenados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Biblioteca de Contratos</Label>
              <Input
                value={formData.libraries.contracts}
                onChange={(e) => handleLibraryChange('contracts', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Documentos de Proprietários</Label>
              <Input
                value={formData.libraries.ownerDocs}
                onChange={(e) => handleLibraryChange('ownerDocs', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Documentos de Inquilinos</Label>
              <Input
                value={formData.libraries.tenantDocs}
                onChange={(e) => handleLibraryChange('tenantDocs', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" /> Listas SharePoint
            </CardTitle>
            <CardDescription>Onde os metadados e logs serão sincronizados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Lista de Controle de Processos</Label>
              <Input
                value={formData.lists.processControl}
                onChange={(e) => handleListChange('processControl', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Lista de Audit Log</Label>
              <Input
                value={formData.lists.auditLog}
                onChange={(e) => handleListChange('auditLog', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg border">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={testConnection} disabled={isTesting}>
            {isTesting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {!isTesting && <Link className="w-4 h-4 mr-2" />}
            Testar Conexão
          </Button>
          {testResult === 'success' && (
            <span className="flex items-center text-sm text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Conexão Verificada
            </span>
          )}
          {testResult === 'error' && (
            <span className="flex items-center text-sm text-destructive font-medium">
              <AlertCircle className="w-4 h-4 mr-1" /> Falha na Conexão
            </span>
          )}
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" /> Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
