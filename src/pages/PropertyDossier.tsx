import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderArchive, FileText, Clock, Download, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useMainStore from '@/stores/main'
import useContractsStore from '@/stores/contracts'
import { useToast } from '@/hooks/use-toast'

const mockDocs = [
  {
    id: 1,
    name: 'Matricula_Atualizada_Imovel.pdf',
    cat: 'Documentos do Proprietário',
    date: '10/01/2023',
  },
  { id: 2, name: 'RG_CPF_Proprietario.pdf', cat: 'Documentos do Proprietário', date: '10/01/2023' },
  {
    id: 3,
    name: 'Comprovante_Renda_Inquilino.pdf',
    cat: 'Documentos do Inquilino',
    date: '15/05/2023',
  },
  { id: 4, name: 'CNH_Inquilino.pdf', cat: 'Documentos do Inquilino', date: '15/05/2023' },
  {
    id: 5,
    name: 'Analise_Credito_Serasa.pdf',
    cat: 'Documentos de Análise/Comprovantes',
    date: '16/05/2023',
  },
]

const pastContracts = [
  { id: 'CTR-2021-001', tenant: 'Empresa Fictícia SA', period: '01/01/2021 - 31/12/2022' },
  { id: 'CTR-2018-045', tenant: 'Roberto Carlos', period: '15/03/2018 - 10/12/2020' },
]

export default function PropertyDossier() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties, maintenanceTickets } = useMainStore()
  const { contracts } = useContractsStore()
  const { toast } = useToast()

  const property = properties.find((p) => p.id === id)
  const activeContract = contracts.find(
    (c) => c.propertyId === id && ['Ativo', 'Aguardando Renovação'].includes(c.status),
  )
  const propertyTickets = maintenanceTickets.filter((t) => t.propertyId === id)

  if (!property)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Imóvel não encontrado na base de dados.
      </div>
    )

  const handleDownload = (doc: string) => {
    toast({ title: 'Acessando SharePoint', description: `Iniciando download seguro de ${doc}...` })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="-ml-4 mb-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Imóveis
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FolderArchive className="text-primary w-8 h-8" /> Dossiê Digital: {property.title}
          </h1>
          <p className="text-muted-foreground mt-1">{property.address}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 border flex flex-wrap h-auto mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="ged">Cofre de Documentos (GED)</TabsTrigger>
          <TabsTrigger value="contracts">Linha do Tempo de Contratos</TabsTrigger>
          <TabsTrigger value="maintenance">Relatórios de Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3 border-b mb-3 bg-muted/10">
                <CardTitle className="text-lg">Informações Cadastrais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Código Único (ID)</p>
                  <p className="font-mono font-medium">{property.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status Atual do Processo</p>
                  <Badge className="mt-1">{property.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo de Imóvel</p>
                  <p className="font-medium">{property.type}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b mb-3 bg-primary/5">
                <CardTitle className="text-lg text-primary">Situação Contratual Vigente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Inquilino Atual</p>
                  <p className="font-medium">
                    {activeContract?.tenantName || property.tenant || 'Desocupado / Em Processo'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vencimento do Contrato</p>
                  <p className="font-medium">
                    {activeContract?.expirationDate
                      ? new Date(activeContract.expirationDate).toLocaleDateString('pt-BR')
                      : 'Não aplicável'}
                  </p>
                </div>
                {activeContract && (
                  <div>
                    <p className="text-sm text-muted-foreground">ID do Contrato</p>
                    <p className="font-mono text-sm">{activeContract.id}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ged">
          <Card>
            <CardHeader>
              <CardTitle>Arquivos Sincronizados - SharePoint</CardTitle>
              <CardDescription>
                Acesse os documentos classificados por pastas setoriais.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Arquivo</TableHead>
                    <TableHead>Categoria / Pasta</TableHead>
                    <TableHead>Data de Inclusão</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDocs.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" /> {d.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{d.cat}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{d.date}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(d.name)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] before:h-full before:w-0.5 before:bg-border pt-4 ml-2">
            {activeContract && (
              <div className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white z-10 shrink-0 shadow-sm">
                  <Building2 className="w-4 h-4" />
                </div>
                <Card className="flex-1 border-primary/50 bg-primary/5 shadow-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg">
                      Contrato Vigente: {activeContract.tenantName}
                    </CardTitle>
                    <CardDescription>
                      Status: {activeContract.status} | ID: {activeContract.id}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )}
            {pastContracts.map((c) => (
              <div key={c.id} className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground z-10 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <Card className="flex-1 opacity-80 hover:opacity-100 transition-opacity">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg">Inquilino Anterior: {c.tenant}</CardTitle>
                    <CardDescription>
                      Período: {c.period} | ID Histórico: {c.id}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="grid gap-4 md:grid-cols-2">
            {propertyTickets.map((t) => (
              <Card key={t.id} className="shadow-sm">
                <CardHeader className="p-4 pb-2 border-b bg-muted/10">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={t.status === 'Concluído' ? 'default' : 'secondary'}
                      className={t.status === 'Concluído' ? 'bg-emerald-500' : ''}
                    >
                      {t.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(t.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <CardTitle className="text-base">{t.item} - Relatório de Reparo</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-4 space-y-4">
                  <div className="bg-destructive/5 border border-destructive/20 p-3 rounded text-sm text-destructive-foreground">
                    <strong className="block mb-1">Nota da Vistoria (Danificado):</strong> {t.notes}
                  </div>
                  {t.photo && (
                    <div className="w-full h-40 rounded-md overflow-hidden bg-muted relative border">
                      <img
                        src={t.photo}
                        className="w-full h-full object-cover"
                        alt="Evidência Fotográfica"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        Foto Evidência
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {propertyTickets.length === 0 && (
              <div className="col-span-full p-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
                <Wrench className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>Nenhum relatório de manutenção registrado no histórico deste imóvel.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
