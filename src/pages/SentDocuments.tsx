import { useEffect, useState, useMemo } from 'react'
import { Search, ExternalLink, FileText, Loader2, RefreshCw } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { m365Service } from '@/lib/m365'
import { useToast } from '@/hooks/use-toast'
import { DocumentViewer } from '@/components/DocumentViewer'

const DOCUMENT_TYPES: Record<string, string> = {
  OWNER_DOCUMENT: 'Documento de Proprietário',
  TENANT_DOCUMENT: 'Documento de Locatário',
  GUARANTEE_DOCUMENT: 'Documentos de Garantia',
  CONTRACT_ACTIVE: 'Contrato Ativo (Importar Legado)',
  CONTRACT_TERMINATED: 'Contrato Encerrado',
  INSPECTION_MOVE_IN: 'Vistoria de Entrada',
  INSPECTION_MOVE_OUT: 'Vistoria de Saída',
}

export default function SentDocuments() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProperty, setSelectedProperty] = useState<string>('all')
  const [viewDoc, setViewDoc] = useState<string | null>(null)
  const { toast } = useToast()

  const uniqueCategories = useMemo(() => {
    const categories = new Set(documents.map((doc) => doc.category).filter(Boolean))
    return Array.from(categories)
  }, [documents])

  const uniqueProperties = useMemo(() => {
    const properties = new Set(documents.map((doc) => doc.properties?.title).filter(Boolean))
    return Array.from(properties)
  }, [documents])

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('property_documents')
        .select(`
          *,
          properties ( title )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error: any) {
      console.error('Error fetching documents:', error)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar documentos',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (doc: any) => {
    try {
      toast({
        title: 'Buscando documento...',
        description: 'Conectando ao SharePoint para gerar o link de visualização.',
      })
      const url = await m365Service.getFilePreviewUrl(doc.file_path || doc.name, doc.category)
      if (url) {
        window.open(url, '_blank')
      } else {
        throw new Error('URL de visualização indisponível')
      }
    } catch (error: any) {
      // Fallback to internal viewer if SharePoint fails or is not configured
      toast({
        variant: 'destructive',
        title: 'SharePoint não acessível',
        description: 'Abrindo visualizador interno. ' + error.message,
      })
      setViewDoc(doc.name)
    }
  }

  const filteredDocs = documents.filter((doc) => {
    const categoryLabel = DOCUMENT_TYPES[doc.category] || doc.category

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.properties?.title || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesProperty = selectedProperty === 'all' || doc.properties?.title === selectedProperty

    return matchesSearch && matchesCategory && matchesProperty
  })

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos Enviados ao SharePoint</h1>
          <p className="text-muted-foreground">
            Histórico e visualização de todos os arquivos enviados para as bibliotecas do M365.
          </p>
        </div>
        <Button variant="outline" onClick={fetchDocuments} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-[500px] overflow-hidden">
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documento..."
                  className="pl-8 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-background">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {uniqueCategories.map((cat) => (
                    <SelectItem key={cat as string} value={cat as string}>
                      {DOCUMENT_TYPES[cat as string] || (cat as string)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-full sm:w-48 bg-background">
                  <SelectValue placeholder="Imóvel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Imóveis</SelectItem>
                  {uniqueProperties.map((prop) => (
                    <SelectItem key={prop as string} value={prop as string}>
                      {prop as string}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary" className="hidden lg:flex text-sm py-1 whitespace-nowrap">
              {filteredDocs.length} documentos
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-auto">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="pl-6">Arquivo</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : filteredDocs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    Nenhum documento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium pl-6">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                        <span className="truncate max-w-[200px] sm:max-w-[300px]" title={doc.name}>
                          {doc.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className="truncate max-w-[150px] sm:max-w-[200px]"
                      title={doc.properties?.title}
                    >
                      {doc.properties?.title || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background">
                        {DOCUMENT_TYPES[doc.category] || doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {format(new Date(doc.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="ghost" onClick={() => handleView(doc)}>
                        <ExternalLink className="h-4 w-4 mr-2" /> Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}
