import {
  FileStack,
  ShieldAlert,
  List,
  FileText,
  RefreshCw,
  FileSignature,
  Search,
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
import { DashboardChart } from '@/components/DashboardChart'
import { PerformanceDashboard } from '@/components/PerformanceDashboard'
import { useNavigate } from 'react-router-dom'
import useMainStore, { isSlaBreached } from '@/stores/main'
import useContractsStore from '@/stores/contracts'
import { useAuth } from '@/contexts/AuthContext'
import { checkAccess } from '@/lib/permissions'

const Index = () => {
  const navigate = useNavigate()
  const store = useMainStore()
  const { contracts } = useContractsStore()
  const { user } = useAuth()

  const pendingApprovals = store.properties.filter((p) => p.status === 'Análise Gerencial')
  const slaBreachedCount = pendingApprovals.filter((p) =>
    isSlaBreached(p.slaStart, store.settings.slaHours),
  ).length

  const activeContracts = contracts.filter((c) => c.status === 'Ativo').length
  const awaitingSignature = contracts.filter((c) => c.status === 'Aguardando Assinatura').length
  const awaitingRenewal = contracts.filter((c) => c.status === 'Aguardando Renovação').length

  const recentLogs = store.auditLogs.slice(0, 5)

  // Hide full dashboard if user is restricted
  const canSeeDashboard = checkAccess('/settings', user?.role) || user?.role === 'Gerente'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Visão geral da sua operação digital, contratos e integrações com o Microsoft 365.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{activeContracts}</div>
          </CardContent>
        </Card>

        <Card className={awaitingRenewal > 0 ? 'border-orange-200 bg-orange-50/50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${awaitingRenewal > 0 ? 'text-orange-700' : ''}`}
            >
              Renovações Pendentes
            </CardTitle>
            <RefreshCw
              className={`h-4 w-4 ${awaitingRenewal > 0 ? 'text-orange-600' : 'text-muted-foreground'}`}
            />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${awaitingRenewal > 0 ? 'text-orange-700' : ''}`}>
              {awaitingRenewal}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Assinatura</CardTitle>
            <FileStack className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{awaitingSignature}</div>
          </CardContent>
        </Card>

        <Card className={slaBreachedCount > 0 ? 'border-destructive/50 bg-destructive/5' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${slaBreachedCount > 0 ? 'text-destructive' : ''}`}
            >
              SLA Violado
            </CardTitle>
            <ShieldAlert
              className={`h-4 w-4 ${slaBreachedCount > 0 ? 'text-destructive' : 'text-muted-foreground'}`}
            />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${slaBreachedCount > 0 ? 'text-destructive' : ''}`}>
              {slaBreachedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {canSeeDashboard && <PerformanceDashboard />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {checkAccess('/contracts', user?.role) && (
              <Card
                className="hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => navigate('/contracts')}
              >
                <CardHeader className="pb-2">
                  <FileSignature className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Ciclo de Contratos</CardTitle>
                  <CardDescription>
                    Gerar minutas via templates e acompanhar workflow.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
            {checkAccess('/inspections', user?.role) && (
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
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" /> Trilha de Auditoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref ID</TableHead>
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

        {canSeeDashboard && (
          <div className="lg:col-span-3">
            <DashboardChart />
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
