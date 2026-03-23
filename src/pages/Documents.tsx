import { useState } from 'react'
import { UploadCloud, File, Search, FolderSync, Loader2, Eye, Building2 } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScannerPanel } from '@/components/ScannerPanel'
import { OCRReviewDialog } from '@/components/OCRReviewDialog'
import { DocumentViewer } from '@/components/DocumentViewer'
import { GedUpload } from '@/components/GedUpload'
import { mockDocuments } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore, SiteKey } from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'

const siteNames: Record<SiteKey, string> = {
  locacao: 'Gestão de Locação',
  captacao: 'Captação (Leads)',
  vendas: 'Vendas',
  juridico: 'Jurídico',
  financeiro: 'Financeiro',
}

const Documents = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrData, setOcrData] = useState<any>(null)
  const [viewDoc, setViewDoc] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<SiteKey>('locacao')

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
    mainStore.addAuditLog({
      propertyId,
      action: `Upload via OCR para SharePoint [${siteNames[selectedSite]}]: ${library}`,
      user: user?.name || 'Sistema',
    })
    m365Service.saveToLibrary(
      library,
      `${data.name || 'Doc'}_Digitalizado.pdf`,
      'File Data Mock',
      selectedSite,
    )
    m365Service.syncToList(store.sharepoint.lists.processControl, JSON.stringify(data))

    toast({
      title: 'Ação Processada',
      description: `Requisição encaminhada para o site ${siteNames[selectedSite]}.`,
    })
  }

  const siteDocuments = mockDocuments.map((d, i) => ({
    ...d,
    name:
      selectedSite === 'juridico'
        ? `Processo_Legal_0${i + 1}.pdf`
        : selectedSite === 'vendas'
          ? `Proposta_Venda_${i + 1}.pdf`
          : selectedSite === 'captacao'
            ? `Lead_Captacao_${i + 1}.pdf`
            : selectedSite === 'financeiro'
              ? `Comprovante_Pagamento_${i + 1}.pdf`
              : d.name,
    type:
      selectedSite === 'juridico'
        ? 'Ação Judicial'
        : selectedSite === 'financeiro'
          ? 'Fiscal/Recibo'
          : d.type,
  }))

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Documentos (GED)</h1>
          <p className="text-muted-foreground">
            Gerencie o acervo digital e navegue pelos Team Sites da imobiliária.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            <Building2 className="w-4 h-4" /> Contexto (Site):
          </span>
          <Select value={selectedSite} onValueChange={(val: SiteKey) => setSelectedSite(val)}>
            <SelectTrigger className="w-[220px] bg-background">
              <SelectValue placeholder="Selecione o Site" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(siteNames).map(([key, label]) => (
                <SelectItem key={key} value={key as SiteKey}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="scan" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
          <TabsTrigger
            value="scan"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <UploadCloud className="w-4 h-4 mr-2" /> Digitalização & Upload
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <FolderSync className="w-4 h-4 mr-2" /> Biblioteca: {siteNames[selectedSite]}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="flex-1">
          <div className="grid md:grid-cols-2 gap-6 h-full min-h-[400px]">
            <ScannerPanel onScan={handleFileUpload} />
            <Card className="border-primary/20 shadow-sm flex flex-col h-full">
              <CardHeader className="bg-muted/50 border-b pb-4">
                <div className="flex items-center gap-2">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Upload Estruturado</CardTitle>
                </div>
                <CardDescription>
                  Envie arquivos diretamente para a estrutura taxônomica no SharePoint.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-1 flex flex-col">
                <GedUpload />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="library" className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={`Buscar em ${siteNames[selectedSite]}...`} className="pl-8" />
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">
              URL: {store.sharepoint.sites[selectedSite]}
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
                {siteDocuments.map((doc) => (
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
      </Tabs>

      <OCRReviewDialog
        open={!!ocrData}
        onClose={() => setOcrData(null)}
        onConfirm={handleOcrConfirm}
        initialData={ocrData}
        contextSite={siteNames[selectedSite]}
      />
      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}

export default Documents
