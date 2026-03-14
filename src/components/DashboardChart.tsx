import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { name: 'Aprovados', value: 450, fill: 'var(--color-approved)' },
  { name: 'Em Revisão', value: 120, fill: 'var(--color-review)' },
  { name: 'Aguardando', value: 80, fill: 'var(--color-awaiting)' },
  { name: 'Rejeitados', value: 30, fill: 'var(--color-rejected)' },
]

const chartConfig = {
  approved: { label: 'Aprovados', color: 'hsl(var(--chart-2))' }, // Emerald
  review: { label: 'Em Revisão', color: 'hsl(var(--chart-3))' }, // Yellow
  awaiting: { label: 'Aguardando', color: 'hsl(var(--chart-1))' }, // Blue
  rejected: { label: 'Rejeitados', color: 'hsl(var(--chart-4))' }, // Red
}

export function DashboardChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status do Fluxo de Trabalho</CardTitle>
        <CardDescription>Volume de documentos por estágio (Mês Atual)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
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
      </CardContent>
    </Card>
  )
}
