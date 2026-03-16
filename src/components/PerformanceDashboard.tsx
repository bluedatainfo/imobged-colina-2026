import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Building, TrendingUp, Search, Scale, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const timeData = [
  { month: 'Jan', captacao: 15, locacao: 25 },
  { month: 'Fev', captacao: 12, locacao: 20 },
  { month: 'Mar', captacao: 18, locacao: 22 },
  { month: 'Abr', captacao: 10, locacao: 15 },
  { month: 'Mai', captacao: 8, locacao: 12 },
  { month: 'Jun', captacao: 9, locacao: 10 },
]

const chartConfig = {
  captacao: { label: 'Tempo Médio (Captação)', color: 'hsl(var(--primary))' },
  locacao: { label: 'Tempo Médio (Locação)', color: 'hsl(var(--chart-2))' },
}

export function PerformanceDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Search className="h-5 w-5 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">45</span>
            </div>
            <p className="text-xs text-blue-800 mt-2 font-medium">Captação (Leads)</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-900">12</span>
            </div>
            <p className="text-xs text-emerald-800 mt-2 font-medium">Vendas (Concluídas)</p>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Building className="h-5 w-5 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-900">320</span>
            </div>
            <p className="text-xs text-indigo-800 mt-2 font-medium">Gestão de Locação</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Scale className="h-5 w-5 text-amber-600" />
              <span className="text-xl font-bold text-amber-900">8</span>
            </div>
            <p className="text-xs text-amber-800 mt-2 font-medium">Casos Jurídicos</p>
          </CardContent>
        </Card>
        <Card className="bg-rose-50/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <FileText className="h-5 w-5 text-rose-600" />
              <span className="text-xl font-bold text-rose-900">R$ 1.2M</span>
            </div>
            <p className="text-xs text-rose-800 mt-2 font-medium">Financeiro (Receita)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eficiência Operacional (Em Dias)</CardTitle>
          <CardDescription>
            Comparativo do tempo médio entre a captação do imóvel e a assinatura do contrato de
            locação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
            <BarChart accessibilityLayer data={timeData} margin={{ top: 20, right: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="captacao" fill="var(--color-captacao)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="locacao" fill="var(--color-locacao)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
