import { Plus, Camera, Search, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { mockInspections } from '@/lib/data'

const Inspections = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vistorias</h1>
          <p className="text-muted-foreground">
            Registre e compare vistorias de entrada e saída com fotos.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Nova Vistoria
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <CardTitle>Histórico de Vistorias</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por imóvel ou ID..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockInspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg hidden sm:block">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">{inspection.property}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{inspection.id}</span>
                      <span>•</span>
                      <span>{inspection.inspector}</span>
                      <span>•</span>
                      <span>{inspection.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={inspection.type === 'Entrada' ? 'default' : 'secondary'}>
                    {inspection.type}
                  </Badge>
                  <span
                    className={`text-xs font-medium ${
                      inspection.status === 'Concluída' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {inspection.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inspections
