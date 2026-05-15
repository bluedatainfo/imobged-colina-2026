import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileText, Loader2, FileSpreadsheet } from 'lucide-react'
import { m365Service } from '@/lib/m365'
import { GedUpload } from '@/components/GedUpload'

export default function AdditionalDocuments() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

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
    setDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Documentos Adicionais</h2>
      </div>

      <p className="text-muted-foreground">
        Selecione um modelo do SharePoint para gerar uma cópia na pasta correta e preencher via
        Office Online.
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
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerar Documento</DialogTitle>
            <DialogDescription>
              Modelo selecionado:{' '}
              <span className="font-semibold text-primary">{selectedTemplate?.name}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <GedUpload
              mode="template"
              template={selectedTemplate}
              onSuccess={() => setDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
