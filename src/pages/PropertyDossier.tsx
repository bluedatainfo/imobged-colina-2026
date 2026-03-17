import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FileText, ArrowLeft, Building, MapPin, ClipboardCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'
import useContractsStore from '@/stores/contracts'
import { DocumentViewer } from '@/components/DocumentViewer'

export default function PropertyDossier() {
  const { id } = useParams()
  const { properties, inspectionsData, sharepoint } = useMainStore()
  const { contracts } = useContractsStore()
  const [viewDoc, setViewDoc] = useState<string | null>(null)

  const property = properties.find((p) => p.id === id)
  const propertyContracts = contracts.filter((c) => c.propertyId === id)
  const inspection = id ? inspectionsData[id] : null

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Imóvel não encontrado</h2>
        <Button asChild>
          <Link to="/properties">Voltar para Imóveis</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/properties">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
            <Badge variant="outline" className="bg-primary/5">
              {property.status}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" /> {property.address}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-0">
              <img
                src={property.image}
                alt={property.title}
                className="w-full aspect-square object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">ID do Sistema:</span>
                  <span className="font-medium">{property.id}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                {property.tenant && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Inquilino:</span>
                    <span className="font-medium">{property.tenant}</span>
                  </div>
                )}
                {property.rentValue && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Valor (Locação):</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(property.rentValue)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {inspection && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-primary" /> Dados de Vistoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Paredes e Pintura:</span>
                  <span className="font-medium">{inspection.wallCondition}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Móveis e Estrutura:</span>
                  <span className="font-medium">{inspection.furnitureNotes}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" /> Documentos no SharePoint
              </CardTitle>
              <CardDescription>
                Arquivos sincronizados na biblioteca corporativa (
                {sharepoint.primaryDomain || 'Não configurado'})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {propertyContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{contract.documentName}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {contract.status}
                          </Badge>
                          <span>
                            Modificado em {new Date(contract.updatedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewDoc(contract.documentName)}
                    >
                      Abrir
                    </Button>
                  </div>
                ))}
                {propertyContracts.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground border border-dashed rounded-lg">
                    Nenhum contrato ou documento vinculado a este dossiê.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}
