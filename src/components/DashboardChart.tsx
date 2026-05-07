import { Pie, PieChart, Cell, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import useMainStore from '@/stores/main'

const chartData = [
  { name: 'Ativos', value: 320, fill: 'var(--color-active)' },
  { name: 'Em Andamento', value: 85, fill: 'var(--color-progress)' },
  { name: 'Assinatura', value: 45, fill: 'var(--color-signature)' },
  { name: 'Renovação', value: 25, fill: 'var(--color-renewal)' },
]

const chartConfig = {
  active: { label: 'Ativos', color: 'hsl(var(--chart-2))' },
  progress: { label: 'Em Andamento', color: 'hsl(var(--chart-1))' },
  signature: { label: 'Assinatura', color: 'hsl(var(--chart-3))' },
  renewal: { label: 'Renovação', color: 'hsl(var(--chart-4))' },
}

export function DashboardChart() {
  const store = useMainStore()

  const neighborhoodData = Object.entries(
    store.properties.reduce((acc: Record<string, number>, p) => {
      let nb = p.details?.neighborhood || 'Outros'
      if (nb === 'Outros' && p.address) {
        const parts = p.address.split(',')
        if (parts.length >= 3) {
          nb = parts[parts.length - 2].trim()
        }
      }
      if (!nb) nb = 'Outros'
      acc[nb] = (acc[nb] || 0) + 1
      return acc
    }, {}),
  )
    .map(([name, value]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  if (neighborhoodData.length === 0) {
    neighborhoodData.push({ name: 'Nenhum', value: 0 })
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribuição de Contratos</CardTitle>
          <CardDescription>Volume de contratos no SharePoint</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[220px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={70}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-center mb-4">
            <div className="bg-emerald-50 text-emerald-700 p-1.5 rounded-md font-medium border border-emerald-100">
              {chartData[0].value} Ativos
            </div>
            <div className="bg-blue-50 text-blue-700 p-1.5 rounded-md font-medium border border-blue-100">
              {chartData[1].value} Workflow
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col flex-1">
        <CardHeader className="pb-2">
          <CardTitle>Propostas por Bairro</CardTitle>
          <CardDescription>Volume de processos de locação iniciados</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-[180px] p-4 flex items-center justify-center">
          <ChartContainer config={{}} className="h-[180px] w-full">
            <BarChart
              data={neighborhoodData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                width={80}
                fontSize={11}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
