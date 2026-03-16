import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellRing, FileWarning, ArrowRight, CalendarX2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useDocumentsStore, { getDocumentStatus, PropertyDocument } from '@/stores/documents'
import useMainStore from '@/stores/main'

export default function DocumentAlerts() {
  const navigate = useNavigate()
  const { documents } = useDocumentsStore()
  const { properties } = useMainStore()
  const [filter, setFilter] = useState<'all' | 'expired' | 'expiring'>('all')

  const alerts = useMemo(() => {
    return documents
      .map((doc) => {
        const status = getDocumentStatus(doc.expirationDate)
        const property = properties.find((p) => p.id === doc.propertyId)
        return { ...doc, status, property }
      })
      .filter((doc) => doc.status === 'Expirado' || doc.status === 'Vencendo em breve')
      .sort((a, b) => {
        // Sort by closest expiration date
        if (!a.expirationDate) return 1
        if (!b.expirationDate) return -1
        return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
      })
  }, [documents, properties])

  const filteredAlerts = useMemo(() => {
    if (filter === 'expired') return alerts.filter((a) => a.status === 'Expirado')
    if (filter === 'expiring') return alerts.filter((a) => a.status === 'Vencendo em breve')
    return alerts
  }, [alerts, filter])

  const getStatusBadge = (status: string) => {
    if (status === 'Vencendo em breve') {
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-transparent">
          Vencendo em breve
        </Badge>
      )
    }
    return <Badge variant="destructive">Expirado</Badge>
  }

  const expiredCount = alerts.filter((a) => a.status === 'Expirado').length
  const expiringCount = alerts.filter((a) => a.status === 'Vencendo em breve').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BellRing className="w-8 h-8 text-primary" /> Alertas de Documentos
          </h1>
          <p className="text-muted-foreground mt-1">
            Central de notificações para documentos expirados ou com vencimento próximo integrados
            via SharePoint.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="bg-red-50/50 border-red-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0">
              <CalendarX2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Documentos Expirados</p>
              <p className="text-2xl font-bold text-red-900 mt-1">{expiredCount} Pendências</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full shrink-0">
              <FileWarning className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Vencendo em até 30 dias</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{expiringCount} Documentos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Lista de Acompanhamento</CardTitle>
              <CardDescription>
                Ações necessárias para regularizar a documentação dos imóveis.
              </CardDescription>
            </div>
            <Tabs
              value={filter}
              onValueChange={(val: any) => setFilter(val)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todos ({alerts.length})</TabsTrigger>
                <TabsTrigger
                  value="expired"
                  className="text-red-600 data-[state=active]:text-red-700"
                >
                  Expirados
                </TabsTrigger>
                <TabsTrigger
                  value="expiring"
                  className="text-amber-600 data-[state=active]:text-amber-700"
                >
                  Próximos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Imóvel Relacionado</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50">
                  <TableCell>
                    <p className="font-medium text-sm">{alert.name}</p>
                    <p className="text-xs text-muted-foreground">{alert.category}</p>
                  </TableCell>
                  <TableCell>
                    {alert.property ? (
                      <div>
                        <p className="font-medium text-sm">{alert.property.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.property.address}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Referência não encontrada</span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="font-medium">
                      {alert.expirationDate
                        ? new Date(alert.expirationDate).toLocaleDateString('pt-BR')
                        : '-'}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(alert.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/properties/${alert.propertyId}/dossier`)}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      Ir para Dossiê <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    <BellRing className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p>Nenhum alerta de documento com este filtro.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
