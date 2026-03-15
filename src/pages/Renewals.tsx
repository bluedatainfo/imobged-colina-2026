import { useMemo } from 'react'
import { CalendarClock, AlertTriangle, RefreshCw, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import useContractsStore, { contractsStore } from '@/stores/contracts'
import useMainStore, { mainStore } from '@/stores/main'
import { keysStore } from '@/stores/keys'
import { useToast } from '@/hooks/use-toast'

export default function Renewals() {
  const { contracts } = useContractsStore()
  const { properties } = useMainStore()
  const { toast } = useToast()

  const expiringContracts = useMemo(() => {
    return contracts
      .filter((c) => c.status === 'Ativo' || c.status === 'Aguardando Renovação')
      .map((c) => {
        const daysLeft = c.expirationDate
          ? Math.ceil((new Date(c.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : 999
        return { ...c, daysLeft }
      })
      .filter((c) => c.daysLeft <= 90)
      .sort((a, b) => a.daysLeft - b.daysLeft)
  }, [contracts])

  const handleRenew = (id: string) => {
    contractsStore.extendExpiration(id, 365) // Extend 1 year
    contractsStore.updateStatus(id, 'Ativo')
    toast({ title: 'Renovação Iniciada', description: 'Contrato estendido e marcado como ativo.' })
  }

  const handleTerminate = (contract: any) => {
    contractsStore.updateStatus(contract.id, 'Rescisão em Andamento')
    mainStore.updatePropertyStatus(contract.propertyId, 'Vistoria') // Vistoria de saída

    const property = properties.find((p) => p.id === contract.propertyId)
    keysStore.addTask({
      contractId: contract.id,
      propertyId: contract.propertyId,
      tenantName: contract.tenantName,
      propertyAddress: property?.address || 'Endereço Desconhecido',
      type: 'Return',
    })

    mainStore.addAuditLog({
      propertyId: contract.propertyId,
      action: 'Processo de Desocupação Iniciado',
      user: 'Gestor',
      details: 'Vistoria de saída e devolução de chaves agendadas.',
    })

    toast({
      title: 'Desocupação Iniciada',
      description: 'Workflow de encerramento disparado. Verifique a vistoria e chaves.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Renovações</h1>
        <p className="text-muted-foreground">
          Monitore contratos a vencer nos próximos 30, 60 ou 90 dias e gerencie renovações ou
          desocupações.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-red-50/50 border-red-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Vencendo em 30 dias</p>
              <p className="text-2xl font-bold text-red-900">
                {expiringContracts.filter((c) => c.daysLeft <= 30).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 border-amber-100">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full shrink-0">
              <CalendarClock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Vencendo em 60 dias</p>
              <p className="text-2xl font-bold text-amber-900">
                {expiringContracts.filter((c) => c.daysLeft > 30 && c.daysLeft <= 60).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contratos Próximos do Vencimento</CardTitle>
          <CardDescription>
            Tome ações rápidas para garantir a receita ou liberar o imóvel.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Inquilino</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiringContracts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.tenantName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{new Date(c.expirationDate!).toLocaleDateString('pt-BR')}</span>
                      <Badge variant={c.daysLeft <= 30 ? 'destructive' : 'secondary'}>
                        {c.daysLeft} dias
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600 hover:text-emerald-700"
                      onClick={() => handleRenew(c.id)}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" /> Renovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleTerminate(c)}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Desocupar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {expiringContracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum contrato vencendo nos próximos 90 dias.
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
