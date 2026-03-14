import { Building2, MapPin, FolderOpen, PenTool, WifiOff } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockProperties } from '@/lib/data'

const Properties = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Imóveis</h1>
          <p className="text-muted-foreground">Catálogo de propriedades e painel de pendências.</p>
        </div>
        <Button>Adicionar Imóvel</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <PenTool className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Assinaturas Pendentes</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">5 Documentos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full shrink-0">
              <WifiOff className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Vistorias Não Sincronizadas</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">2 Vistorias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden flex flex-col transition-all hover:shadow-md"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={property.status === 'Alugado' ? 'default' : 'secondary'}
                  className="shadow-sm"
                >
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
              <CardTitle className="text-xl">{property.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{property.address}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/20">
              <Button variant="ghost" className="w-full justify-between group">
                <span className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  Abrir Pasta Digital
                </span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Properties
