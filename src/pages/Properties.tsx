import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building, MapPin, Plus, Search, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import useMainStore, { PropertyStatus } from '@/stores/main'
import { NewPropertyDialog } from '@/components/NewPropertyDialog'

const STATUS_COLUMNS: PropertyStatus[] = [
  'Pendente/Rascunho',
  'Análise Gerencial',
  'Vistoria',
  'Confecção de Contrato',
  'Assinatura',
  'Disponível para Locação',
]

export default function Properties() {
  const { properties } = useMainStore()
  const [search, setSearch] = useState('')
  const [isNewOpen, setIsNewOpen] = useState(false)

  const filtered = properties.filter((p) => {
    const s = search.toLowerCase()
    const matchBasic =
      p.title.toLowerCase().includes(s) ||
      p.address.toLowerCase().includes(s) ||
      p.id.toLowerCase().includes(s)
    const matchOwner = p.erpData?.proprietarios?.some((op: any) =>
      op.nome?.toLowerCase().includes(s),
    )
    const matchServ = p.erpData?.servicos?.some(
      (sv: any) => sv.descricao?.toLowerCase().includes(s) || sv.numero?.toLowerCase().includes(s),
    )
    return matchBasic || matchOwner || matchServ
  })

  const grouped = STATUS_COLUMNS.map((status) => ({
    status,
    items: filtered.filter((p) => p.status === status),
  }))

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Imóveis</h1>
          <p className="text-muted-foreground">Catálogo e status do portfólio da imobiliária.</p>
        </div>
        <Button onClick={() => setIsNewOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Importar do ERP
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-md shrink-0">
        <Search className="w-4 h-4 text-muted-foreground absolute ml-3" />
        <Input
          placeholder="Buscar imóvel por nome, endereço ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max space-x-4 h-full pb-4">
          {grouped.map((col) => (
            <div
              key={col.status}
              className="w-[320px] shrink-0 flex flex-col bg-muted/40 rounded-xl border border-border/50"
            >
              <div className="p-3 border-b border-border/50 bg-muted/20 flex items-center justify-between rounded-t-xl sticky top-0 z-10">
                <h3 className="font-semibold text-sm text-foreground/80">{col.status}</h3>
                <Badge variant="secondary" className="text-xs">
                  {col.items.length}
                </Badge>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {col.items.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden flex flex-col transition-shadow hover:shadow-md whitespace-normal"
                  >
                    <div className="aspect-video w-full bg-muted relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3
                        className="font-semibold text-base line-clamp-1 mb-1"
                        title={property.title}
                      >
                        {property.title}
                      </h3>
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground mb-4">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{property.address}</span>
                      </div>

                      {property.erpData && (
                        <div className="space-y-2 mb-4 border-t pt-2 mt-2">
                          {property.erpData.proprietarios &&
                            property.erpData.proprietarios.length > 0 && (
                              <div className="text-[11px]">
                                <span className="font-semibold text-foreground">
                                  Proprietários:
                                </span>
                                <ul className="list-disc pl-3 text-muted-foreground mt-0.5">
                                  {property.erpData.proprietarios.map((prop: any, i: number) => (
                                    <li key={i} className="truncate">
                                      {prop.nome} ({prop.participacao}%)
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          {property.erpData.servicos && property.erpData.servicos.length > 0 && (
                            <div className="text-[11px]">
                              <span className="font-semibold text-foreground">
                                Serviços Vinculados:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {property.erpData.servicos.map((serv: any, i: number) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-[9px] h-4 px-1 py-0"
                                  >
                                    {serv.descricao}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-auto pt-3 border-t flex items-center justify-between">
                        <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          {property.id}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 gap-1 text-primary text-xs px-2"
                        >
                          <Link to={`/properties/${property.id}/dossier`}>
                            Ver Dossiê <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {col.items.length === 0 && (
                  <div className="py-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/60 rounded-lg bg-background/50">
                    <Building className="w-8 h-8 mb-2 text-muted-foreground/30" />
                    <span className="text-xs text-muted-foreground">Vazio nesta etapa</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <NewPropertyDialog open={isNewOpen} onClose={() => setIsNewOpen(false)} />
    </div>
  )
}
