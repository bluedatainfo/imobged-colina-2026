import { Building2, MapPin, FolderOpen } from 'lucide-react'
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
          <p className="text-muted-foreground">Catálogo de propriedades e suas pastas digitais.</p>
        </div>
        <Button>Adicionar Imóvel</Button>
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
