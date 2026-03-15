import { useState } from 'react'
import {
  FileText,
  Plus,
  ArrowRight,
  Eye,
  FileEdit,
  CheckCircle,
  MoreVertical,
  Archive,
  RefreshCw,
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
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useContractsStore, {
  ContractStatus,
  LeaseContract,
  contractsStore,
} from '@/stores/contracts'
import useMainStore, { mainStore } from '@/stores/main'
import { m365Service } from '@/lib/m365'
import { ContractWizard } from '@/components/ContractWizard'
import { DocumentViewer } from '@/components/DocumentViewer'

const statusColors: Record<ContractStatus, string> = {
  Rascunho: 'bg-gray-100 text-gray-800 border-gray-200',
  'Em Análise': 'bg-amber-100 text-amber-800 border-amber-200',
  'Aprovado para Ajuste': 'bg-blue-100 text-blue-800 border-blue-200',
  Finalizado: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Aguardando Assinatura': 'bg-purple-100 text-purple-800 border-purple-200',
  Ativo: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Aguardando Renovação': 'bg-orange-100 text-orange-800 border-orange-200',
}

const getNextActions = (status: ContractStatus): ContractStatus[] => {
  switch (status) {
    case 'Rascunho':
      return ['Em Análise']
    case 'Em Análise':
      return ['Aprovado para Ajuste']
    case 'Aprovado para Ajuste':
      return ['Finalizado']
    case 'Finalizado':
      return ['Aguardando Assinatura']
    case 'Aguardando Assinatura':
      return ['Ativo']
    case 'Ativo':
      return ['Aguardando Renovação']
    default:
      return []
  }
}

export default function Contracts() {
  const { contracts } = useContractsStore()
  const mainSettings = useMainStore().sharepoint
  const [wizardOpen, setWizardOpen] = useState(false)
  const [viewDoc, setViewDoc] = useState<string | null>(null)

  const handleStatusChange = (contract: LeaseContract, newStatus: ContractStatus) => {
    contractsStore.updateStatus(contract.id, newStatus)
    mainStore.addAuditLog({
      propertyId: contract.propertyId,
      action: `Workflow do Contrato avançou para: ${newStatus}`,
      user: 'Gestor de Contratos',
    })
    m365Service.sendTeamsMessage(
      mainSettings.teamsWebhookUrl,
      `Atualização de Contrato (${contract.id}): Mudou para "${newStatus}". Inquilino: ${contract.tenantName}`,
    )

    if (newStatus === 'Ativo') {
      m365Service.moveDocument(contract.documentName, mainSettings.libraries.archive)
    }
  }

  const handleCollaborativeEdit = (contract: LeaseContract) => {
    mainStore.addAuditLog({
      propertyId: contract.propertyId,
      action: 'Aberto para Edição no Word Online',
      user: 'Equipe Administrativa',
    })
    setViewDoc(contract.documentName) // Fallback for simulation
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Contratos (Ciclo de Vida)</h1>
          <p className="text-muted-foreground">
            Acompanhe o workflow, gere minutas via templates e utilize a sincronização condicional
            M365.
          </p>
        </div>
        <Button onClick={() => setWizardOpen(true)} className="shrink-0 gap-2">
          <Plus className="w-4 h-4" /> Novo Contrato
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Acervo de Contratos em Andamento
          </CardTitle>
          <CardDescription>
            Painel integrado à lista de Controle de Processos do SharePoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Documento / Template</TableHead>
                <TableHead>Inquilino</TableHead>
                <TableHead>Status M365</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-mono text-xs">{contract.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> {contract.documentName}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Modelo: {contract.template}
                    </div>
                  </TableCell>
                  <TableCell>{contract.tenantName}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`shadow-sm ${statusColors[contract.status]}`}
                    >
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Ações do Documento</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setViewDoc(contract.documentName)}>
                          <Eye className="w-4 h-4 mr-2" /> Pré-visualizar (Nativo)
                        </DropdownMenuItem>
                        {contract.status === 'Aprovado para Ajuste' && (
                          <DropdownMenuItem onClick={() => handleCollaborativeEdit(contract)}>
                            <FileEdit className="w-4 h-4 mr-2" /> Editar no Word Online
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Avançar Workflow</DropdownMenuLabel>
                        {getNextActions(contract.status).map((action) => (
                          <DropdownMenuItem
                            key={action}
                            onClick={() => handleStatusChange(contract, action)}
                          >
                            {action === 'Ativo' ? (
                              <Archive className="w-4 h-4 mr-2 text-emerald-600" />
                            ) : (
                              <ArrowRight className="w-4 h-4 mr-2" />
                            )}
                            Avançar p/ {action}
                          </DropdownMenuItem>
                        ))}
                        {contract.status === 'Ativo' && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(contract, 'Aguardando Renovação')}
                          >
                            <RefreshCw className="w-4 h-4 mr-2 text-orange-600" /> Iniciar Renovação
                          </DropdownMenuItem>
                        )}
                        {contract.status === 'Aguardando Renovação' && (
                          <DropdownMenuItem disabled>
                            <CheckCircle className="w-4 h-4 mr-2 text-muted-foreground" /> Fluxo
                            Concluído
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ContractWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <DocumentViewer open={!!viewDoc} onClose={() => setViewDoc(null)} docName={viewDoc} />
    </div>
  )
}
