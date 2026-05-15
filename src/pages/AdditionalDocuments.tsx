import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { FileText, Loader2, FileSpreadsheet } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { m365Service } from '@/lib/m365'
import { toast } from '@/hooks/use-toast'

export default function AdditionalDocuments() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [contextType, setContextType] = useState<'interested' | 'property'>('interested')
  const [selectedEntityId, setSelectedEntityId] = useState('')
  const [processing, setProcessing] = useState(false)

  const [interestedList, setInterestedList] = useState<any[]>([])
  const [propertiesList, setPropertiesList] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        let spTemplates = await m365Service.listTemplates()

        if (!spTemplates || spTemplates.length === 0) {
          spTemplates = [
            { id: '1', name: 'CONTRATO PRESTAÇÃO SERVIÇO.docx', type: 'word', webUrl: '#' },
            { id: '2', name: 'CHECKLIST.xlsx', type: 'excel', webUrl: '#' },
            { id: '3', name: 'TERMO DE VISTORIA.docx', type: 'word', webUrl: '#' },
          ]
        }
        setTemplates(spTemplates)

        const [interRes, propRes] = await Promise.all([
          supabase
            .from('pre_registrations')
            .select('id, full_name, code')
            .order('created_at', { ascending: false })
            .limit(50),
          supabase
            .from('properties')
            .select('id, title, address')
            .order('created_at', { ascending: false })
            .limit(50),
        ])

        if (interRes.data) setInterestedList(interRes.data)
        if (propRes.data) setPropertiesList(propRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleOpenDialog = (template: any) => {
    setSelectedTemplate(template)
    setSelectedEntityId('')
    setDialogOpen(true)
  }

  const handleGenerate = async () => {
    if (!selectedEntityId) {
      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Selecione um registro de destino.',
      })
      return
    }

    setProcessing(true)
    try {
      let entityName = ''
      if (contextType === 'interested') {
        const item = interestedList.find((i) => i.id === selectedEntityId)
        entityName = item?.full_name || 'Interessado'
      } else {
        const item = propertiesList.find((i) => i.id === selectedEntityId)
        entityName = item?.title || 'Imóvel'
      }

      await m365Service.copyTemplateToEntity(
        selectedTemplate,
        contextType,
        selectedEntityId,
        entityName,
      )
      setDialogOpen(false)
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Erro', description: e.message })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Documentos Adicionais</h2>
      </div>

      <p className="text-muted-foreground">
        Selecione um modelo do SharePoint para gerar e preencher documentos vinculados a um
        Interessado ou Imóvel.
      </p>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleOpenDialog(template)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium line-clamp-2" title={template.name}>
                  {template.name}
                </CardTitle>
                {template.name.toLowerCase().endsWith('xlsx') ? (
                  <FileSpreadsheet className="h-4 w-4 text-green-600 shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                )}
              </CardHeader>
              <CardContent>
                <CardDescription>Clique para gerar e preencher este documento.</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gerar Documento</DialogTitle>
            <DialogDescription>
              Modelo selecionado:{' '}
              <span className="font-semibold text-primary">{selectedTemplate?.name}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Tabs
              value={contextType}
              onValueChange={(v) => {
                setContextType(v as any)
                setSelectedEntityId('')
              }}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="interested">Interessado</TabsTrigger>
                <TabsTrigger value="property">Imóvel / Contrato</TabsTrigger>
              </TabsList>

              <TabsContent value="interested" className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione o Interessado</Label>
                  <Select value={selectedEntityId} onValueChange={setSelectedEntityId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Busque um interessado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {interestedList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.code} - {item.full_name}
                        </SelectItem>
                      ))}
                      {interestedList.length === 0 && (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Nenhum interessado encontrado.
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="property" className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione o Imóvel</Label>
                  <Select value={selectedEntityId} onValueChange={setSelectedEntityId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Busque um imóvel..." />
                    </SelectTrigger>
                    <SelectContent>
                      {propertiesList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title} ({item.address})
                        </SelectItem>
                      ))}
                      {propertiesList.length === 0 && (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Nenhum imóvel encontrado.
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={processing}>
              Cancelar
            </Button>
            <Button onClick={handleGenerate} disabled={processing || !selectedEntityId}>
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gerar e Preencher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
