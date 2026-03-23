import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <p className="text-muted-foreground">Módulo de gestão de vendas em desenvolvimento.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Em Breve
          </CardTitle>
          <CardDescription>
            Esta seção está sendo preparada para gerenciar suas vendas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Acompanhe o pipeline de vendas, propostas e fechamentos de contratos de compra e venda
            diretamente do sistema integrado com seu SharePoint.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
