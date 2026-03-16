import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts'
import { Activity, AlertTriangle, Wrench } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import useMainStore from '@/stores/main'

export function MaintenanceAnalytics() {
  const { maintenanceTickets, properties } = useMainStore()

  const { kpis, damagesByItem, damagesByType, damagesByRegion } = useMemo(() => {
    const activeCalls = maintenanceTickets.filter((t) => t.status !== 'Concluído').length
    const completedCalls = maintenanceTickets.filter((t) => t.status === 'Concluído').length

    const itemCounts = maintenanceTickets.reduce(
      (acc, t) => {
        acc[t.item] = (acc[t.item] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const mostCommonDamage =
      Object.keys(itemCounts).length > 0
        ? Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0][0]
        : 'N/A'

    const byItem = Object.entries(itemCounts).map(([name, value], i) => ({
      name,
      value,
      fill: `hsl(var(--chart-${(i % 5) + 1}))`,
    }))

    const typeCounts: Record<string, number> = {}
    const regionCounts: Record<string, number> = {}

    maintenanceTickets.forEach((t) => {
      const prop = properties.find((p) => p.id === t.propertyId)
      if (prop) {
        typeCounts[prop.type] = (typeCounts[prop.type] || 0) + 1
        const regionMatch = prop.address.match(/(?:Rua|Av\.|Rodovia)\s+([^,]+)/)
        const region = regionMatch ? regionMatch[1].split(' ')[0] : 'Outros'
        regionCounts[region] = (regionCounts[region] || 0) + 1
      }
    })

    const byType = Object.entries(typeCounts).map(([name, value], i) => ({
      name,
      value,
      fill: `hsl(var(--chart-${i === 0 ? 2 : 4}))`,
    }))

    const byRegion = Object.entries(regionCounts).map(([name, value], i) => ({
      name,
      value,
      fill: `hsl(var(--chart-${(i % 3) + 1}))`,
    }))

    return {
      kpis: {
        activeCalls,
        mostCommonDamage,
        avgRepairs: Math.max(1, Math.round(completedCalls / 3)), // Mock 3 month average
      },
      damagesByItem: byItem,
      damagesByType: byType,
      damagesByRegion: byRegion,
    }
  }, [maintenanceTickets, properties])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Chamados Ativos</p>
              <p className="text-3xl font-bold">{kpis.activeCalls}</p>
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
              <p className="text-2xl font-bold">{kpis.mostCommonDamage}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Média de Reparos por Mês</p>
              <p className="text-3xl font-bold">{kpis.avgRepairs}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Danos Mais Frequentes</CardTitle>
            <CardDescription>
              Distribuição de chamados abertos por categoria de dano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={damagesByItem} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
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
            <CardTitle>Por Tipo de Imóvel</CardTitle>
            <CardDescription>Comercial vs Residencial</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer config={{}} className="aspect-square h-[260px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={damagesByType}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                >
                  {damagesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Ocorrências por Região</CardTitle>
            <CardDescription>
              Acompanhamento de chamados extraídos dos endereços dos imóveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <BarChart
                data={damagesByRegion}
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
  )
}
