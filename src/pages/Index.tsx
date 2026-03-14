import { FileStack, HardDrive, Clock, CheckCircle, Search, FileSignature } from 'lucide-react'
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
import { mockActivity } from '@/lib/data'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao ImobGED. Visão geral da sua operação digital.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Docs Digitalizados</CardTitle>
            <FileStack className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.450</div>
            <p className="text-xs text-muted-foreground">+20% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Físico Salvo</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~45 m²</div>
            <p className="text-xs text-muted-foreground">Equivalente a 15 arquivos de aço</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">24</div>
            <p className="text-xs text-muted-foreground">Aguardando análise jurídica</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistorias Hoje</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">5 de entrada, 3 de saída</p>
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
                <CardTitle>Nova Vistoria</CardTitle>
                <CardDescription>Iniciar formulário e captura de fotos.</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => navigate('/documents')}
            >
              <CardHeader className="pb-2">
                <FileSignature className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Digitalizar Lote</CardTitle>
                <CardDescription>Integração direta com Epson ES-580W.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas movimentações no SharePoint.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            activity.status === 'Sincronizado' || activity.status === 'Concluído'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            activity.status === 'Aprovado'
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              : ''
                          }
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
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
