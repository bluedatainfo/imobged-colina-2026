import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts'
import {
  Activity,
  AlertTriangle,
  Wrench,
  Download,
  FileText,
  Table as TableIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'
import { useAuth } from '@/contexts/AuthContext'

export function MaintenanceAnalytics() {
  const { maintenanceTickets, properties } = useMainStore()
  const { user } = useAuth()
  const canExport = user?.role === 'Admin' || user?.role === 'Gerente'

  const [dateRange, setDateRange] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const getRegion = (address?: string) =>
    address?.match(/(?:Rua|Av\.|Rodovia)\s+([^,]+)/)?.[1].split(' ')[0] || 'Outros'
  const regions = useMemo(
    () => Array.from(new Set(properties.map((p) => getRegion(p.address)))),
    [properties],
  )

  const filtered = useMemo(
    () =>
      maintenanceTickets.filter((t) => {
        if (
          dateRange !== 'all' &&
          new Date(t.createdAt) < new Date(Date.now() - parseInt(dateRange) * 86400000)
        )
          return false
        if (statusFilter !== 'all' && t.status !== statusFilter) return false
        if (
          regionFilter !== 'all' &&
          getRegion(properties.find((p) => p.id === t.propertyId)?.address) !== regionFilter
        )
          return false
        return true
      }),
    [maintenanceTickets, properties, dateRange, statusFilter, regionFilter],
  )

  const { active, mostCommon, avg, byItem, byType, byRegion } = useMemo(() => {
    const active = filtered.filter((t) => t.status !== 'Concluído').length
    const itemCounts = filtered.reduce(
      (acc, t) => ({ ...acc, [t.item]: (acc[t.item] || 0) + 1 }),
      {} as Record<string, number>,
    )
    const mostCommon =
      Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a])[0] || 'N/A'

    const types: Record<string, number> = {}
    const regs: Record<string, number> = {}
    filtered.forEach((t) => {
      const p = properties.find((x) => x.id === t.propertyId)
      if (p) {
        types[p.type] = (types[p.type] || 0) + 1
        const r = getRegion(p.address)
        regs[r] = (regs[r] || 0) + 1
      }
    })

    return {
      active,
      mostCommon,
      avg: Math.max(1, Math.round(filtered.filter((t) => t.status === 'Concluído').length / 3)),
      byItem: Object.entries(itemCounts).map(([name, value], i) => ({
        name,
        value,
        fill: `hsl(var(--chart-${(i % 5) + 1}))`,
      })),
      byType: Object.entries(types).map(([name, value], i) => ({
        name,
        value,
        fill: `hsl(var(--chart-${i === 0 ? 2 : 4}))`,
      })),
      byRegion: Object.entries(regs).map(([name, value], i) => ({
        name,
        value,
        fill: `hsl(var(--chart-${(i % 3) + 1}))`,
      })),
    }
  }, [filtered, properties])

  const exportCSV = () => {
    const headers = [
      'Call ID',
      'Property Name',
      'Region',
      'Damage Category',
      'Status',
      'Creation Date',
    ]
    const rows = filtered.map((t) => {
      const p = properties.find((x) => x.id === t.propertyId)
      return [
        t.id,
        `"${p?.title || 'N/A'}"`,
        `"${getRegion(p?.address)}"`,
        `"${t.item}"`,
        `"${t.status}"`,
        new Date(t.createdAt).toLocaleDateString('pt-BR'),
      ].join(',')
    })
    const blob = new Blob(['\uFEFF' + [headers.join(','), ...rows].join('\n')], {
      type: 'text/csv;charset=utf-8;',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `manutencao_export_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <style>{`@media print { body * { visibility: hidden; } #print-area, #print-area * { visibility: visible; } #print-area { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }`}</style>

      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-muted/30 p-4 rounded-lg border no-print">
        <div className="flex flex-wrap gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo o Período</SelectItem>
              <SelectItem value="30">Últimos 30 Dias</SelectItem>
              <SelectItem value="60">Últimos 60 Dias</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em Andamento">Em Andamento</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Regiões</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {canExport && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-background">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => window.print()}>
                <FileText className="mr-2 h-4 w-4" /> Relatório PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportCSV}>
                <TableIcon className="mr-2 h-4 w-4" /> Planilha (CSV)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div id="print-area" className="space-y-6 bg-background">
        <div className="hidden print:block mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight">ImobGED</h1>
          <h2 className="text-xl text-muted-foreground mt-1">Relatório de BI de Manutenção</h2>
          <div className="text-sm text-muted-foreground mt-4">
            Gerado em: {new Date().toLocaleDateString('pt-BR')} | Filtros:{' '}
            {dateRange === 'all' ? 'Todo período' : `${dateRange} dias`} - {statusFilter} -{' '}
            {regionFilter}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chamados Ativos</p>
                <p className="text-3xl font-bold">{active}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <Activity className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Danos mais Comuns</p>
                <p className="text-2xl font-bold">{mostCommon}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Média Mensal</p>
                <p className="text-3xl font-bold">{avg}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Danos Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <BarChart data={byItem} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Por Tipo</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ChartContainer config={{}} className="aspect-square h-[250px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={byType}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {byType.map((e, i) => (
                      <Cell key={i} fill={e.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px] w-full">
                <BarChart
                  data={byRegion}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
