import { Pie, PieChart, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { name: 'Ativos', value: 320, fill: 'var(--color-active)' },
  { name: 'Em Andamento', value: 85, fill: 'var(--color-progress)' },
  { name: 'Assinatura', value: 45, fill: 'var(--color-signature)' },
  { name: 'Renovação', value: 25, fill: 'var(--color-renewal)' },
]

const chartConfig = {
  active: { label: 'Ativos', color: 'hsl(var(--chart-2))' }, // Emerald
  progress: { label: 'Em Andamento', color: 'hsl(var(--chart-1))' }, // Blue
  signature: { label: 'Assinatura', color: 'hsl(var(--chart-3))' }, // Purple/Yellow
  renewal: { label: 'Renovação', color: 'hsl(var(--chart-4))' }, // Orange/Red
}

export function DashboardChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Contratos</CardTitle>
        <CardDescription>Volume de contratos no SharePoint por estágio</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-center mb-4">
          <div className="bg-emerald-50 text-emerald-700 p-2 rounded-md font-medium border border-emerald-100">
            {chartData[0].value} Ativos
          </div>
          <div className="bg-blue-50 text-blue-700 p-2 rounded-md font-medium border border-blue-100">
            {chartData[1].value} Workflow
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
