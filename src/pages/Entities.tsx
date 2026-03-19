import { useState } from 'react'
import { UsersRound, Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import useEntitiesStore, { entitiesStore, EntityModel } from '@/stores/entities'

export default function Entities() {
  const { owners, tenants } = useEntitiesStore()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<'owners' | 'tenants'>('owners')
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    code: '',
    fullName: '',
    cpf: '',
    rg: '',
    fullAddress: '',
  })

  const currentList = activeTab === 'owners' ? owners : tenants
  const filteredList = currentList.filter(
    (e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()),
  )

  const handleOpenNew = () => {
    setEditingId(null)
    setFormData({ code: '', fullName: '', cpf: '', rg: '', fullAddress: '' })
    setDialogOpen(true)
  }

  const handleOpenEdit = (entity: EntityModel) => {
    setEditingId(entity.id)
    setFormData({
      code: entity.code,
      fullName: entity.fullName,
      cpf: entity.cpf,
      rg: entity.rg,
      fullAddress: entity.fullAddress,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      if (activeTab === 'owners') {
        await entitiesStore.deleteOwner(id)
      } else {
        await entitiesStore.deleteTenant(id)
      }
      toast({ title: 'Entidade removida', description: 'O registro foi apagado com sucesso.' })
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Erro', description: e.message })
    }
  }

  const handleSave = async () => {
    if (!formData.fullName || !formData.code) {
      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Nome e Código são obrigatórios.',
      })
      return
    }

    try {
      if (editingId) {
        if (activeTab === 'owners') {
          await entitiesStore.updateOwner(editingId, formData)
        } else {
          await entitiesStore.updateTenant(editingId, formData)
        }
        toast({ title: 'Atualizado', description: 'Registro atualizado com sucesso.' })
      } else {
        if (activeTab === 'owners') {
          await entitiesStore.addOwner(formData)
        } else {
          await entitiesStore.addTenant(formData)
        }
        toast({ title: 'Adicionado', description: 'Novo registro criado.' })
      }
      setDialogOpen(false)
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: e.message || 'Verifique se o código já está em uso.',
      })
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UsersRound className="w-8 h-8 text-primary" />
            Gestão de Entidades
          </h1>
          <p className="text-muted-foreground">
            Cadastro de Proprietários e Inquilinos e seus códigos de identificação para GED.
          </p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="w-4 h-4" /> Novo Registro
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs
              value={activeTab}
              onValueChange={(v: any) => setActiveTab(v)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="owners">Proprietários</TabsTrigger>
                <TabsTrigger value="tenants">Inquilinos</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código (ID)</TableHead>
                <TableHead>Nome Completo</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono font-medium">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.fullName}</TableCell>
                  <TableCell>{item.cpf || '-'}</TableCell>
                  <TableCell className="truncate max-w-[200px]" title={item.fullAddress}>
                    {item.fullAddress || '-'}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(item)}>
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Editar' : 'Novo'}{' '}
              {activeTab === 'owners' ? 'Proprietário' : 'Inquilino'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Código de Identificação Único *</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Ex: PROP-001"
                className="font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label>Nome Completo *</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ex: João da Silva"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>CPF</Label>
                <Input
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="grid gap-2">
                <Label>RG</Label>
                <Input
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Endereço Completo</Label>
              <Input
                value={formData.fullAddress}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                placeholder="Rua, Número, Bairro, Cidade - UF"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
