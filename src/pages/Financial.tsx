import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet } from 'lucide-react'

export default function Financial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">Módulo de gestão financeira em desenvolvimento.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Em Breve
          </CardTitle>
          <CardDescription>
            Esta seção está sendo preparada para gerenciar o financeiro da sua imobiliária.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Controle de recebimentos, repasses, comissões, emissão de boletos e integração bancária.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
