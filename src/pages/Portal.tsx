import { useState } from 'react'
import { Download, FileText, Home, User, Server } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'
import useContractsStore from '@/stores/contracts'
import { DocumentViewer } from '@/components/DocumentViewer'

export default function Portal() {
  const { agencyProfile, properties } = useMainStore()
  const { contracts } = useContractsStore()
  const [viewDoc, setViewDoc] = useState<string | null>(null)

  // Mock specific user perspective
  const tenantContracts = contracts.filter(
    (c) => c.status === 'Ativo' || c.status === 'Aguardando Renovação',
  )

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col font-sans">
      {/* Dynamic White-Label Header */}
      <header
        className="h-20 shadow-md flex items-center px-4 md:px-8 text-white sticky top-0 z-10"
        style={{ backgroundColor: agencyProfile.primaryColor }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {agencyProfile.logo ? (
              <img
                src={agencyProfile.logo}
                alt="Logo"
                className="h-10 bg-white/10 p-1 rounded backdrop-blur-sm"
              />
            ) : (
              <div className="h-10 w-10 bg-white/20 rounded flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl leading-tight">{agencyProfile.name}</h1>
              <p className="text-xs text-white/80 font-medium tracking-wide uppercase">
                Portal de Relacionamento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">Bem-vindo(a), Cliente</p>
              <p className="text-xs text-white/70">Acesso Seguro</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-sm">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 animate-fade-in-up">
        <Tabs defaultValue="tenant" className="space-y-8">
          <TabsList className="bg-background border shadow-sm h-14 p-1">
            <TabsTrigger
              value="tenant"
              className="h-full px-6 text-base data-[state=active]:bg-muted"
            >
              Sou Inquilino
            </TabsTrigger>
            <TabsTrigger
              value="owner"
              className="h-full px-6 text-base data-[state=active]:bg-muted"
            >
              Sou Proprietário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tenant" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Meus Contratos de Locação</h2>
              <p className="text-muted-foreground">
                Acesse seus documentos e via assinada digitalmente.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tenantContracts.map((contract) => {
                const property = properties.find((p) => p.id === contract.propertyId)
                return (
                  <Card key={contract.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 border-b bg-muted/10">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="bg-background border-primary text-primary"
                          style={{
                            color: agencyProfile.primaryColor,
                            borderColor: agencyProfile.primaryColor,
                          }}
                        >
                          {contract.status}
                        </Badge>
                        <FileText className="h-5 w-5 text-muted-foreground opacity-50" />
                      </div>
                      <CardTitle className="mt-4 text-lg line-clamp-1">
                        {property?.title || 'Imóvel'}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">
                        {property?.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          ID Contrato:{' '}
                          <span className="font-mono text-foreground">{contract.id}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Inquilino Titular:{' '}
                          <span className="font-medium text-foreground">{contract.tenantName}</span>
                        </p>
                      </div>
                      <Button
                        className="w-full text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: agencyProfile.primaryColor }}
                        onClick={() => setViewDoc(contract.documentName)}
                      >
                        <Download className="w-4 h-4 mr-2" /> Baixar PDF Assinado
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
              {tenantContracts.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-background">
                  Nenhum contrato ativo encontrado no seu perfil.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="owner" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Meus Imóveis</h2>
              <p className="text-muted-foreground">
                Transparência total: veja o status do seu patrimônio nos setores da imobiliária.
              </p>
            </div>

            <div className="space-y-4">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-auto shrink-0 relative">
                      <img
                        src={property.image}
                        alt="Imóvel"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
                          <p className="text-xs opacity-90">{property.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Server className="w-4 h-4" />
                        Status de Processamento por Setor (SharePoint)
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-muted p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            Captação
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                          >
                            Concluído
                          </Badge>
                        </div>
                        <div className="bg-muted p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            Vendas/Locação
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] whitespace-nowrap"
                          >
                            {property.status === 'Disponível para Locação'
                              ? 'Anunciado'
                              : 'Em Processo'}
                          </Badge>
                        </div>
                        <div className="bg-muted p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            Jurídico
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-600 border-gray-200 text-[10px]"
                          >
                            Sem Pendência
                          </Badge>
                        </div>
                        <div className="bg-muted p-3 rounded-md text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            Financeiro
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-600 border-gray-200 text-[10px]"
                          >
                            Em Dia
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-background mt-12">
        &copy; {new Date().getFullYear()} {agencyProfile.name}. Portal do Cliente Powered by
        ImobGED.
      </footer>

      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}
