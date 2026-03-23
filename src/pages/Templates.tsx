import { useState, useEffect } from 'react'
import { FileText, Plus, Edit, Trash2, BookOpen, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTemplatesStore, {
  templatesStore,
  DocumentTemplate,
  initTemplatesStore,
} from '@/stores/templates'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

export default function Templates() {
  const { templates } = useTemplatesStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState('tenant_contract')
  const [editingTemplate, setEditingTemplate] = useState<DocumentTemplate | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<DocumentTemplate>>({})

  // Ensure templates are loaded directly when opening the page
  useEffect(() => {
    initTemplatesStore()
  }, [])

  // Admin, Juridico and Gerente have edit rights
  const canEdit = ['Admin', 'Jurídico', 'Gerente'].includes(user?.role || '')

  const handleSave = async () => {
    if (!formData.name || !formData.category) return

    try {
      if (editingTemplate) {
        await templatesStore.updateTemplate(editingTemplate.id, formData)
        toast({ title: 'Modelo Atualizado', description: 'Alterações salvas com sucesso.' })
      } else {
        await templatesStore.addTemplate({
          name: formData.name,
          category: formData.category as any,
          propertyType: formData.propertyType || 'Todos',
          guaranteeType: formData.guaranteeType || 'N/A',
          content: formData.content || '',
        })
        toast({ title: 'Modelo Criado', description: 'Novo documento adicionado à biblioteca.' })
      }
      setEditingTemplate(null)
      setIsNewOpen(false)
      setFormData({})
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Erro ao salvar', description: e.message })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este modelo?')) {
      await templatesStore.deleteTemplate(id)
      toast({ title: 'Removido', description: 'O modelo foi deletado.' })
    }
  }

  const openEdit = (t: DocumentTemplate) => {
    setEditingTemplate(t)
    setFormData(t)
    setIsNewOpen(true)
  }

  const openNew = () => {
    setEditingTemplate(null)
    setFormData({
      category: activeTab as any,
      propertyType: 'Todos',
      guaranteeType: 'N/A',
      content: '',
    })
    setIsNewOpen(true)
  }

  const renderTable = (category: string) => {
    const filtered = templates.filter((t) => t.category === category)

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Modelo</TableHead>
            <TableHead>Tipo Imóvel</TableHead>
            <TableHead>Garantia</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> {t.name}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{t.propertyType}</Badge>
              </TableCell>
              <TableCell>
                {t.guaranteeType !== 'N/A' ? (
                  <Badge variant="secondary">{t.guaranteeType}</Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                  <Edit className="w-4 h-4" />
                </Button>
                {canEdit && (
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                Nenhum modelo cadastrado nesta categoria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Modelos</h1>
          <p className="text-muted-foreground">
            Gerencie os templates de contratos para inquilinos e documentos iniciais de
            proprietários.
          </p>
        </div>
        {canEdit && (
          <Button onClick={openNew} className="gap-2">
            <Plus className="w-4 h-4" /> Novo Modelo
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Biblioteca de Documentos
          </CardTitle>
          <CardDescription>
            Contratos categorizados dinamicamente. Acesso de edição restrito (Gerente, Admin,
            Jurídico).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="tenant_contract">Contratos de Locação (Inquilinos)</TabsTrigger>
              <TabsTrigger value="owner_onboarding">
                Documentos Iniciais (Proprietários)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tenant_contract" className="border rounded-md">
              {renderTable('tenant_contract')}
            </TabsContent>
            <TabsContent value="owner_onboarding" className="border rounded-md">
              {renderTable('owner_onboarding')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isNewOpen} onOpenChange={(val) => !val && setIsNewOpen(false)}>
        <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? 'Editar Modelo' : 'Novo Modelo'}</DialogTitle>
            <DialogDescription>
              Ajuste as propriedades do modelo para que o sistema possa filtrá-lo corretamente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 flex-1 overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label>Nome do Modelo</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!canEdit}
                placeholder="Ex: Contrato Comercial Padrão"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val as any })}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant_contract">Locação (Inquilino)</SelectItem>
                    <SelectItem value="owner_onboarding">Onboarding (Proprietário)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Tipo de Imóvel Relacionado</Label>
                <Select
                  value={formData.propertyType || 'Todos'}
                  onValueChange={(val) => setFormData({ ...formData, propertyType: val })}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Casa">Casa (CA)</SelectItem>
                    <SelectItem value="Sala">Sala (SA)</SelectItem>
                    <SelectItem value="Salão">Salão (SL)</SelectItem>
                    <SelectItem value="Galpão">Galpão (GA)</SelectItem>
                    <SelectItem value="Ponto Comercial">Ponto Comercial (PO)</SelectItem>
                    <SelectItem value="Apartamento">Apartamento (AP)</SelectItem>
                    <SelectItem value="Prédio">Prédio (PR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.category === 'tenant_contract' && (
              <div className="grid gap-2 animate-fade-in">
                <Label>Tipo de Garantia Exigida</Label>
                <Select
                  value={formData.guaranteeType || 'N/A'}
                  onValueChange={(val) => setFormData({ ...formData, guaranteeType: val })}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N/A">Não se aplica / Todas</SelectItem>
                    <SelectItem value="Caução">Caução</SelectItem>
                    <SelectItem value="Fiador">Fiador</SelectItem>
                    <SelectItem value="Seguro Fiança">Seguro Fiança</SelectItem>
                    <SelectItem value="Título de Capitalização">Título de Capitalização</SelectItem>
                    <SelectItem value="Averbação">Averbação</SelectItem>
                    <SelectItem value="Sem Garantia">Sem Garantia</SelectItem>
                    <SelectItem value="Troca de Locatário">Troca de Locatário</SelectItem>
                    <SelectItem value="Garantia">Garantia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2 flex-1 mt-2">
              <Label className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" /> Cláusulas / Conteúdo Base
              </Label>
              <Textarea
                className="flex-1 min-h-[200px] font-mono text-sm resize-none"
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                disabled={!canEdit}
                placeholder="Insira as cláusulas do contrato aqui..."
              />
            </div>
          </div>

          <DialogFooter className="mt-auto pt-4 border-t">
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>
              {canEdit ? 'Cancelar' : 'Fechar'}
            </Button>
            {canEdit && (
              <Button onClick={handleSave} disabled={!formData.name}>
                Salvar Modelo
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
