import { useState } from 'react'
import {
  UploadCloud,
  File,
  Search,
  FolderSync,
  Loader2,
  Eye,
  Building2,
  Printer,
  Check,
} from 'lucide-react'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import { OCRReviewDialog } from '@/components/OCRReviewDialog'
import { DocumentViewer } from '@/components/DocumentViewer'
import { GedUpload } from '@/components/GedUpload'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore, SiteKey } from '@/stores/main'
import useDocumentsStore from '@/stores/documents'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'

const siteNames: Record<SiteKey, string> = {
  locacao: 'Gestão de Locação',
  captacao: 'Captação (Leads)',
  vendas: 'Vendas',
  juridico: 'Jurídico',
  financeiro: 'Financeiro',
}

function StructuredUpload() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [propertyId, setPropertyId] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [properties, setProperties] = useState<any[]>([])

  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState<any>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    supabase
      .from('properties')
      .select('id, title, address')
      .then(({ data }) => {
        if (data) setProperties(data)
      })
  }, [])

  useEffect(() => {
    if (category !== 'Documento do Proprietário') {
      setSelectedEntity(null)
      setSearchQuery('')
    }
  }, [category])

  useEffect(() => {
    const search = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setSearchResults([])
        return
      }
      setIsSearching(true)
      try {
        const { data: owners } = await supabase
          .from('owners')
          .select('id, full_name, code')
          .or(`full_name.ilike.%${searchQuery}%,code.ilike.%${searchQuery}%`)
          .limit(5)

        const { data: candidates } = await supabase
          .from('pre_registrations')
          .select('id, full_name, code, category')
          .or(`full_name.ilike.%${searchQuery}%,code.ilike.%${searchQuery}%`)
          .limit(5)

        const combined: any[] = []
        const seen = new Set()

        const add = (item: any, source: string) => {
          if (!seen.has(item.id)) {
            seen.add(item.id)
            combined.push({ ...item, source })
          }
        }

        owners?.forEach((o) => add(o, 'ERP Local'))
        candidates?.forEach((c) => add(c, 'Candidato (Novo)'))

        setSearchResults(combined)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSearching(false)
      }
    }
    const t = setTimeout(search, 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  const handleUpload = async () => {
    if (!file || !propertyId || !category) {
      toast({
        title: 'Atenção',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }
    if (category === 'Documento do Proprietário' && !selectedEntity) {
      toast({ title: 'Atenção', description: 'Selecione o proprietário.', variant: 'destructive' })
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `property_documents/${fileName}`

      await supabase.storage
        .from('documents')
        .upload(filePath, file)
        .catch(() => null)

      const { error } = await supabase.from('property_documents').insert({
        property_id: propertyId,
        name: file.name,
        category,
        entity_code: selectedEntity?.code || null,
        entity_name: selectedEntity?.full_name || null,
        file_path: filePath,
        status: 'pending',
      })

      if (error) throw error

      toast({ title: 'Sucesso', description: 'Documento salvo com sucesso.' })
      setFile(null)
      setPropertyId('')
      setCategory('')
      setSelectedEntity(null)
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="space-y-2">
        <label className="text-sm font-medium">Imóvel</label>
        <Select value={propertyId} onValueChange={setPropertyId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o imóvel..." />
          </SelectTrigger>
          <SelectContent>
            {properties.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.title} - {p.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Categoria do Documento</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Documento do Proprietário">Documento do Proprietário</SelectItem>
            <SelectItem value="Documento do Inquilino">Documento do Inquilino</SelectItem>
            <SelectItem value="Contrato">Contrato</SelectItem>
            <SelectItem value="Vistoria">Vistoria</SelectItem>
            <SelectItem value="Geral">Geral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {category === 'Documento do Proprietário' && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Proprietário (ERP ou Candidatos)</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedEntity
                  ? `${selectedEntity.full_name} (${selectedEntity.code})`
                  : 'Buscar proprietário...'}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Digite nome ou código..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  {isSearching && (
                    <div className="p-4 text-sm text-center text-muted-foreground flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                    </div>
                  )}
                  {!isSearching && searchResults.length === 0 && searchQuery.length >= 2 && (
                    <CommandEmpty>Nenhum proprietário encontrado.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {searchResults.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => {
                          setSelectedEntity(item)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedEntity?.id === item.id ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{item.full_name}</span>
                          <span className="text-xs text-muted-foreground">
                            Código: {item.code} | Fonte: {item.source}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="space-y-2 flex-1">
        <label className="text-sm font-medium">Arquivo</label>
        <div
          className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer min-h-[120px]"
          onClick={() => document.getElementById('structured-file-upload')?.click()}
        >
          <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
          {file ? (
            <p className="text-sm font-medium text-primary">{file.name}</p>
          ) : (
            <>
              <p className="text-sm font-medium">Clique para selecionar o arquivo</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 10MB)</p>
            </>
          )}
          <input
            id="structured-file-upload"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <Button className="w-full mt-auto" onClick={handleUpload} disabled={uploading}>
        {uploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        Salvar Documento
      </Button>
    </div>
  )
}

const Documents = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const [ocrData, setOcrData] = useState<any>(null)
  const [viewDoc, setViewDoc] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<SiteKey>('locacao')

  const { documents } = useDocumentsStore()

  const handleOcrConfirm = async (data: any, library: string) => {
    setOcrData(null)
    const propertyId = data.propertyId || 'GERAL'
    mainStore.addAuditLog({
      propertyId,
      action: `Upload via OCR para SharePoint [${siteNames[selectedSite]}]: ${library}`,
      user: user?.name || 'Sistema',
    })

    try {
      await m365Service.saveToLibrary(
        library,
        data.name || 'Documento_Digitalizado.pdf',
        data.file || new Blob(['Conteúdo processado via OCR'], { type: 'application/pdf' }),
        selectedSite,
      )
      await m365Service.syncToList(store.sharepoint.lists.processControl, JSON.stringify(data))

      toast({
        title: 'Ação Processada',
        description: `Requisição encaminhada para o site ${siteNames[selectedSite]}.`,
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no Envio',
        description: error.message || 'Falha ao sincronizar com o SharePoint.',
      })
    }
  }

  const siteDocuments = documents
    .filter(
      (d) =>
        !d.category ||
        d.category.toLowerCase().includes(selectedSite.toLowerCase()) ||
        selectedSite === 'locacao',
    )
    .map((d) => ({
      id: d.id,
      name: d.name,
      type: d.category || 'Geral',
      status: 'Processado',
      filePath: d.filePath,
    }))

  return (
    <div className="space-y-6 h-full flex flex-col" translate="no">
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
                  <span>{label}</span>
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
            <Card className="border-primary/20 shadow-sm flex flex-col h-full">
              <CardHeader className="bg-muted/50 border-b pb-4">
                <div className="flex items-center gap-2">
                  <Printer className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Digitalização via Agente Local</CardTitle>
                </div>
                <CardDescription>
                  Capture documentos físicos do scanner através do integrador Windows local.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-1 flex flex-col">
                <GedUpload mode="scanner" />
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-sm flex flex-col h-full">
              <CardHeader className="bg-muted/50 border-b pb-4">
                <div className="flex items-center gap-2">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Upload Estruturado (Arquivo)</CardTitle>
                </div>
                <CardDescription>
                  Envie arquivos locais diretamente para a estrutura taxônomica.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-1 flex flex-col">
                <StructuredUpload />
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
              GED Integrado: {store.sharepoint.sharepointDomain || 'Não configurado'}
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
                      <Button size="sm" variant="ghost" onClick={() => setViewDoc(doc.id)}>
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
      <DocumentViewer
        open={!!viewDoc}
        onClose={() => setViewDoc(null)}
        viewItem={viewDoc ? { type: 'document', id: viewDoc } : undefined}
      />
    </div>
  )
}

export default Documents
