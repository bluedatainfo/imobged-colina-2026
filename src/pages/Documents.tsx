import { useState } from 'react'
import { UploadCloud, File, Search, FolderSync, PenTool, Loader2, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScannerPanel } from '@/components/ScannerPanel'
import { OCRReviewDialog } from '@/components/OCRReviewDialog'
import { DocumentViewer } from '@/components/DocumentViewer'
import { mockDocuments } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'

const Documents = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrData, setOcrData] = useState<any>(null)
  const [viewDoc, setViewDoc] = useState<string | null>(null)

  const handleFileUpload = () => {
    setOcrLoading(true)
    setTimeout(() => {
      setOcrLoading(false)
      setOcrData({
        name: 'Carlos Eduardo',
        documentId: '123.456.789-00',
        address: 'Av. Atlântica, 500',
        value: '4.500,00',
      })
    }, 2000)
  }

  const handleOcrConfirm = (data: any, library: string) => {
    setOcrData(null)
    const propertyId = '104'
    mainStore.updatePropertyStatus(propertyId, 'Análise Gerencial')
    mainStore.addAuditLog({
      propertyId,
      action: `Upload para SharePoint: ${library}`,
      user: user?.name || 'Sistema',
    })
    m365Service.saveToLibrary(library, `${data.name || 'Doc'}_Digitalizado.pdf`)
    m365Service.syncToList(store.sharepoint.lists.processControl, JSON.stringify(data))
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Central de Documentos (GED)</h1>
        <p className="text-muted-foreground">
          Gerencie o acervo digital, OCR avançado e integrações M365.
        </p>
      </div>

      <Tabs defaultValue="library" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
          <TabsTrigger
            value="library"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <FolderSync className="w-4 h-4 mr-2" /> Site:{' '}
            {store.sharepoint.siteUrl.split('/').pop()}
          </TabsTrigger>
          <TabsTrigger
            value="scan"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <UploadCloud className="w-4 h-4 mr-2" /> Digitalização & OCR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar no SharePoint..." className="pl-8" />
            </div>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <File className="h-4 w-4 text-primary" /> {doc.name}
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setViewDoc(doc.name)}>
                        <Eye className="h-4 w-4 mr-2" /> Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="scan" className="flex-1">
          <div className="grid md:grid-cols-2 gap-6 h-full min-h-[400px]">
            <ScannerPanel onScan={handleFileUpload} />
            <Card
              className="border-dashed border-2 flex flex-col items-center justify-center p-10 cursor-pointer"
              onClick={handleFileUpload}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {ocrLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <UploadCloud className="h-8 w-8 text-primary" />
                  )}
                </div>
                <CardTitle>{ocrLoading ? 'Processando...' : 'Upload Manual'}</CardTitle>
                <CardDescription>Arraste arquivos para OCR e sync SharePoint.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <OCRReviewDialog
        open={!!ocrData}
        onClose={() => setOcrData(null)}
        onConfirm={handleOcrConfirm}
        initialData={ocrData}
      />
      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}

export default Documents
