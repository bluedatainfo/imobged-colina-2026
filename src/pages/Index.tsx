import {
  FileStack,
  HardDrive,
  Clock,
  CheckCircle,
  Search,
  FileSignature,
  ShieldAlert,
} from 'lucide-react'
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
import { DashboardChart } from '@/components/DashboardChart'
import { useNavigate } from 'react-router-dom'
import useMainStore, { isSlaBreached } from '@/stores/main'

const Index = () => {
  const navigate = useNavigate()
  const store = useMainStore()

  const pendingApprovals = store.properties.filter((p) => p.status === 'Análise Gerencial')
  const slaBreachedCount = pendingApprovals.filter((p) =>
    isSlaBreached(p.slaStart, store.settings.slaHours),
  ).length
  const pendingInspections = store.properties.filter((p) => p.status === 'Vistoria').length
  const signed = store.properties.filter((p) => p.status === 'Assinatura').length

  const recentLogs = store.auditLogs.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao ImobGED. Visão geral da sua operação digital com SLA Ativo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos em Assinatura</CardTitle>
            <FileStack className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signed}</div>
          </CardContent>
        </Card>
        <Card className={slaBreachedCount > 0 ? 'border-destructive/50 bg-destructive/5' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${slaBreachedCount > 0 ? 'text-destructive' : ''}`}
            >
              SLA Violado (Gestão)
            </CardTitle>
            <ShieldAlert
              className={`h-4 w-4 ${slaBreachedCount > 0 ? 'text-destructive' : 'text-muted-foreground'}`}
            />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${slaBreachedCount > 0 ? 'text-destructive' : ''}`}>
              {slaBreachedCount}
            </div>
            <p className="text-xs text-muted-foreground">Requer atenção imediata</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Aguardando análise jurídica/gerencial</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistorias Pendentes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingInspections}</div>
            <p className="text-xs text-muted-foreground">Aguardando checklist em campo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card
              className="hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => navigate('/inspections')}
            >
              <CardHeader className="pb-2">
                <Search className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Iniciar Vistoria</CardTitle>
                <CardDescription>Preencher checklist inteligente offline/online.</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => navigate('/documents')}
            >
              <CardHeader className="pb-2">
                <FileSignature className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Processar OCR</CardTitle>
                <CardDescription>
                  Digitalizar contrato e iniciar fluxo de aprovação.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trilha de Auditoria Recente</CardTitle>
              <CardDescription>Últimas ações realizadas no sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imóvel ID</TableHead>
                    <TableHead>Ação Realizada</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead className="text-right">Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.propertyId}</TableCell>
                      <TableCell className="font-medium text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.user}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhuma atividade recente.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <DashboardChart />
        </div>
      </div>
    </div>
  )
}

export default Index
