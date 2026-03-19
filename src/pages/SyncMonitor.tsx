import { useMemo } from 'react'
import { Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useMainStore from '@/stores/main'
import { Badge } from '@/components/ui/badge'

export default function SyncMonitor() {
  const { auditLogs } = useMainStore()

  const syncLogs = useMemo(() => {
    return auditLogs.filter((log) => log.action.includes('SHAREPOINT_UPLOAD'))
  }, [auditLogs])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="w-8 h-8 text-primary" />
          Monitor de Sincronização M365
        </h1>
        <p className="text-muted-foreground">
          Acompanhe em tempo real o status dos uploads e integrações de documentos no SharePoint.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Logs recentes de comunicação com a Graph API.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[180px]">Data / Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Detalhes da Operação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syncLogs.map((log) => {
                  const isError = log.action === 'SHAREPOINT_UPLOAD_ERROR'
                  return (
                    <TableRow key={log.id} className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 shrink-0" />
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {isError ? (
                          <Badge variant="destructive" className="flex w-fit items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Falha
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-emerald-600 border-emerald-200 bg-emerald-50 flex w-fit items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Sucesso
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell className="text-sm">
                        <span className={isError ? 'text-destructive' : ''}>{log.details}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {syncLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      Nenhum registro de sincronização encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
