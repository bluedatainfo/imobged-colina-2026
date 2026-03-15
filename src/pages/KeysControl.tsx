import { useState } from 'react'
import { KeyRound, Search, FileSignature, CheckCircle, Home, Eye } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { DocumentViewer } from '@/components/DocumentViewer'
import useKeysStore, { keysStore, KeyTask } from '@/stores/keys'
import useMainStore, { mainStore } from '@/stores/main'
import { contractsStore } from '@/stores/contracts'
import { useToast } from '@/hooks/use-toast'

export default function KeysControl() {
  const { tasks } = useKeysStore()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [viewTerm, setViewTerm] = useState<string | null>(null)

  const filteredTasks = tasks.filter(
    (t) =>
      t.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      t.propertyAddress.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSignTerm = (task: KeyTask) => {
    keysStore.updateTaskStatus(task.id, 'Signed')

    if (task.type === 'Return') {
      mainStore.updatePropertyStatus(task.propertyId, 'Disponível para Locação')
      contractsStore.updateStatus(task.contractId, 'Rescindido')

      mainStore.addAuditLog({
        propertyId: task.propertyId,
        action: 'Imóvel Disponibilizado',
        user: 'Controle de Chaves',
        details: 'Chaves devolvidas e contrato rescindido.',
      })
      toast({
        title: 'Chaves Devolvidas',
        description: 'Imóvel agora está Disponível para Locação.',
      })
    } else {
      toast({ title: 'Chaves Entregues', description: 'Termo assinado e arquivado no SharePoint.' })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Controle de Chaves</h1>
        <p className="text-muted-foreground">
          Gestão de entrega e devolução de chaves, com geração de termos digitais.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" /> Fila de Chaves
            </CardTitle>
            <CardDescription>
              Termos pendentes para assinatura (Entrega ou Devolução).
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar inquilino ou endereço..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocolo</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Inquilino</TableHead>
                <TableHead>Tipo de Movimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      {t.propertyAddress}
                    </div>
                  </TableCell>
                  <TableCell>{t.tenantName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={t.type === 'Delivery' ? 'default' : 'destructive'}
                      className="bg-opacity-10 text-current border-none"
                    >
                      {t.type === 'Delivery' ? 'Entrega de Chaves' : 'Devolução de Chaves'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {t.status === 'Signed' ? (
                      <span className="flex items-center text-sm text-emerald-600">
                        <CheckCircle className="w-4 h-4 mr-1" /> Assinado
                      </span>
                    ) : (
                      <span className="text-sm text-amber-600">Pendente</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {t.status === 'Signed' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewTerm(`Termo_${t.id}.pdf`)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Ver Termo
                      </Button>
                    )}
                    {t.status === 'Pending' && (
                      <Button size="sm" onClick={() => handleSignTerm(t)} className="gap-2">
                        <FileSignature className="w-4 h-4" /> Assinar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma tarefa de chaves encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DocumentViewer
        open={!!viewTerm}
        onClose={() => setViewTerm(null)}
        docName={viewTerm}
        isTerm={true}
      />
    </div>
  )
}
