import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building, MapPin, Plus, Search, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

export default function Properties() {
  const { properties } = useMainStore()
  const [search, setSearch] = useState('')

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Imóveis</h1>
          <p className="text-muted-foreground">Catálogo e status do portfólio da imobiliária.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Nova Captação
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute ml-3" />
        <Input
          placeholder="Buscar imóvel por nome ou endereço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden flex flex-col transition-shadow hover:shadow-md"
          >
            <div className="aspect-video w-full bg-muted relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="shadow-sm backdrop-blur-md bg-background/80">
                  {property.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">{property.title}</h3>
              <div className="flex items-start gap-1.5 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{property.address}</span>
              </div>
              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">ID: {property.id}</span>
                <Button variant="ghost" size="sm" asChild className="gap-1 text-primary">
                  <Link to={`/properties/${property.id}/dossier`}>
                    Ver Dossiê <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <Building className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum imóvel encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
