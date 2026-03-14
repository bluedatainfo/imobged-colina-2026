import { useState } from 'react'
import { Building2, MapPin, FolderOpen, AlertCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useMainStore, { Property } from '@/stores/main'
import { PropertyDetailSheet } from '@/components/PropertyDetailSheet'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Análise Gerencial':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Vistoria':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Confecção de Contrato':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'Assinatura':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Pendente/Rascunho':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-secondary text-secondary-foreground'
  }
}

const Properties = () => {
  const store = useMainStore()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const pendingAnalyses = store.properties.filter((p) => p.status === 'Análise Gerencial').length
  const pendingInspections = store.properties.filter((p) => p.status === 'Vistoria').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Imóveis e Contratos</h1>
          <p className="text-muted-foreground">
            Acompanhe o workflow de locação e acesse a trilha de auditoria completa no SharePoint.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full shrink-0">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Aguardando Gerente</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{pendingAnalyses} Análises</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Vistorias Pendentes</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{pendingInspections} Imóvel</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {store.properties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden flex flex-col transition-all hover:shadow-md group"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge className={`shadow-sm border ${getStatusColor(property.status)}`}>
                  {property.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Building2 className="h-4 w-4" />
                <span>
                  ID: {property.id} • {property.type}
                </span>
              </div>
              <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{property.address}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/10">
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setSelectedProperty(property)}
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" /> SharePoint Site / Auditoria
                </span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <PropertyDetailSheet property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  )
}

export default Properties
