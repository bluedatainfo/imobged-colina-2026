import { UploadCloud, File, Search, FolderSync } from 'lucide-react'
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
import { ScannerPanel } from '@/components/ScannerPanel'
import { mockDocuments } from '@/lib/data'

const Documents = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Central de Documentos (GED)</h1>
        <p className="text-muted-foreground">
          Gerencie o acervo digital sincronizado com Microsoft SharePoint.
        </p>
      </div>

      <Tabs defaultValue="library" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="library"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <FolderSync className="w-4 h-4 mr-2" />
            Biblioteca M365
          </TabsTrigger>
          <TabsTrigger
            value="scan"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            <UploadCloud className="w-4 h-4 mr-2" />
            Digitalização & Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="flex-1 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, tag ou ID..." className="pl-8" />
            </div>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Ref. Imóvel</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status SharePoint</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDocuments.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium flex items-center gap-2">
                      <File className="h-4 w-4 text-primary" />
                      {doc.name}
                    </TableCell>
                    <TableCell>ID: {doc.property}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          doc.status === 'Aprovado'
                            ? 'border-emerald-500 text-emerald-600'
                            : doc.status === 'Sincronizado'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-yellow-500 text-yellow-600'
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="scan" className="flex-1 py-4">
          <div className="grid md:grid-cols-2 gap-6 h-full">
            <ScannerPanel />

            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-10 bg-muted/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UploadCloud className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Upload Manual</CardTitle>
                <CardDescription>Arraste e solte arquivos PDF, JPG ou PNG aqui.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Tamanho máximo: 50MB por arquivo.
                </p>
                <div className="text-sm text-primary font-medium cursor-pointer hover:underline">
                  Ou clique para procurar no computador
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Documents
