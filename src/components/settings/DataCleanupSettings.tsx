import { useState, useEffect, useCallback } from 'react'
import { Trash2, AlertTriangle, RefreshCw, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { m365Service, getGraphToken } from '@/lib/m365'
import { initContractsStore } from '@/stores/contracts'
import { initKeysStore } from '@/stores/keys'
import { initEntitiesStore } from '@/stores/entities'
import { initDocumentsStore } from '@/stores/documents'
import { initMainStore } from '@/stores/main'

interface LogEntry {
  id: string
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const TARGET_TABLES: { name: string; label: string }[] = [
  { name: 'property_documents', label: 'Documentos de Imóveis (property_documents)' },
  { name: 'inspections', label: 'Vistorias (inspections)' },
  { name: 'contracts', label: 'Contratos (contracts)' },
  { name: 'key_control', label: 'Controle de Chaves (key_control)' },
  { name: 'app_audit_logs', label: 'Logs de Auditoria (app_audit_logs)' },
  { name: 'properties', label: 'Imóveis (properties)' },
  { name: 'pre_registrations', label: 'Pré-cadastros / Candidatos (pre_registrations)' },
  { name: 'owners', label: 'Proprietários (owners)' },
  { name: 'tenants', label: 'Inquilinos (tenants)' },
]

const PRESERVED_TABLES: { name: string; label: string }[] = [
  { name: 'app_settings', label: 'Configurações do Sistema (app_settings)' },
  { name: 'app_users', label: 'Usuários do Sistema (app_users)' },
  { name: 'document_templates', label: 'Modelos de Documento (document_templates)' },
  { name: 'sharepoint_configs', label: 'Mapeamento SharePoint (sharepoint_configs)' },
  { name: 'maintenance', label: 'Manutenções (maintenance)' },
]

const CONFIRMATION_KEYWORD = 'ZERAR DADOS'

export default function DataCleanupSettings() {
  const { toast } = useToast()
  const [loadingCounts, setLoadingCounts] = useState(false)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmationInput, setConfirmationInput] = useState('')
  const [isCleaning, setIsCleaning] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)
  const [currentStepText, setCurrentStepText] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [cleanupSummary, setCleanupSummary] = useState<{
    spSuccess: number
    spFailures: number
    dbDeleted: Record<string, number>
    completedAt?: string
  } | null>(null)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        message,
        type,
      },
    ])
  }, [])

  const fetchCounts = useCallback(async () => {
    setLoadingCounts(true)
    const newCounts: Record<string, number> = {}

    const allTables = [...TARGET_TABLES, ...PRESERVED_TABLES]
    for (const t of allTables) {
      try {
        const { count, error } = await (supabase as any)
          .from(t.name)
          .select('*', { count: 'exact', head: true })

        if (!error && typeof count === 'number') {
          newCounts[t.name] = count
        } else {
          newCounts[t.name] = 0
        }
      } catch {
        newCounts[t.name] = 0
      }
    }

    setCounts(newCounts)
    setLoadingCounts(false)
  }, [])

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts])

  const totalTargetRows = TARGET_TABLES.reduce((acc, t) => acc + (counts[t.name] || 0), 0)

  const executeCleanup = async () => {
    setDialogOpen(false)
    setIsCleaning(true)
    setLogs([])
    setProgressPercent(0)
    setCleanupSummary(null)

    const summary: {
      spSuccess: number
      spFailures: number
      dbDeleted: Record<string, number>
    } = {
      spSuccess: 0,
      spFailures: 0,
      dbDeleted: {},
    }

    addLog('Iniciando rotina de limpeza de dados de teste...', 'info')

    try {
      // 1. SharePoint Cleanup for property_documents
      setCurrentStepText('Consultando documentos vinculados no banco para remoção no SharePoint...')
      setProgressPercent(5)

      const { data: docsToDelete, error: docsFetchError } = await (supabase as any)
        .from('property_documents')
        .select('id, name, category, file_path')

      if (docsFetchError) {
        addLog(
          `Aviso: Não foi possível carregar lista prévia de property_documents (${docsFetchError.message}). Prosseguindo...`,
          'warning',
        )
      }

      const docsList = docsToDelete || []
      addLog(
        `Encontrados ${docsList.length} documentos registrados no banco para verificação no SharePoint.`,
        'info',
      )

      const m365Token = getGraphToken()
      if (!m365Token) {
        addLog(
          'Aviso: Token Microsoft 365 não encontrado no navegador. A exclusão de arquivos no SharePoint poderá falhar ou ser ignorada.',
          'warning',
        )
      }

      if (docsList.length > 0) {
        let processedDocs = 0
        for (const doc of docsList) {
          processedDocs++
          const percent = 5 + Math.floor((processedDocs / docsList.length) * 40)
          setProgressPercent(percent)
          setCurrentStepText(
            `Excluindo arquivos do SharePoint (${processedDocs}/${docsList.length}): ${doc.name || doc.file_path || doc.id}`,
          )

          if (doc.file_path && doc.category) {
            try {
              await m365Service.deleteFromSharePoint(doc.file_path, doc.category)
              summary.spSuccess++
              addLog(
                `SharePoint: Arquivo excluído com sucesso [${doc.name || doc.file_path}]`,
                'success',
              )
            } catch (err: any) {
              summary.spFailures++
              addLog(
                `SharePoint: Não foi possível excluir [${doc.name || doc.file_path}]: ${err.message || err}`,
                'warning',
              )
            }
          } else {
            addLog(
              `SharePoint: Documento id ${doc.id} sem file_path ou categoria informada. Pulado.`,
              'info',
            )
          }
        }
      }

      setProgressPercent(50)
      setCurrentStepText('Iniciando exclusão de tabelas do banco de dados...')
      addLog('Iniciando deleção sequencial do Supabase respeitando chaves estrangeiras...', 'info')

      // Deletion order:
      // 1. property_documents (FK -> properties)
      // 2. inspections (FK -> properties)
      // 3. contracts
      // 4. key_control
      // 5. app_audit_logs
      // 6. properties (FK -> owners, FK -> pre_registrations)
      // 7. pre_registrations
      // 8. owners
      // 9. tenants
      const deletionSteps: {
        table: string
        label: string
        filterField?: string
      }[] = [
        { table: 'property_documents', label: 'Documentos de Imóveis' },
        { table: 'inspections', label: 'Vistorias' },
        { table: 'contracts', label: 'Contratos' },
        { table: 'key_control', label: 'Controle de Chaves' },
        { table: 'app_audit_logs', label: 'Logs de Auditoria' },
        { table: 'properties', label: 'Imóveis' },
        { table: 'pre_registrations', label: 'Pré-cadastros' },
        { table: 'owners', label: 'Proprietários' },
        { table: 'tenants', label: 'Inquilinos' },
      ]

      let currentStepIdx = 0
      for (const step of deletionSteps) {
        currentStepIdx++
        const percent = 50 + Math.floor((currentStepIdx / deletionSteps.length) * 45)
        setProgressPercent(percent)
        setCurrentStepText(`Limpando tabela: ${step.label} (${step.table})...`)

        try {
          // Count before deletion to report exact removed count
          const countBefore = counts[step.table] ?? 0

          const { error: delError } = await (supabase as any)
            .from(step.table)
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000') // matches all text and uuid ids

          if (delError) {
            // Fallback: in case table has no standard id match or specific filter
            const { error: fallbackError } = await (supabase as any)
              .from(step.table)
              .delete()
              .filter('created_at', 'gte', '1970-01-01T00:00:00Z')

            if (fallbackError) {
              throw new Error(fallbackError.message)
            }
          }

          summary.dbDeleted[step.table] = countBefore
          addLog(`Banco: Tabela ${step.table} limpa com sucesso.`, 'success')
        } catch (err: any) {
          summary.dbDeleted[step.table] = 0
          addLog(`Banco: Erro ao limpar tabela ${step.table}: ${err.message || err}`, 'error')
        }
      }

      setProgressPercent(98)
      setCurrentStepText('Atualizando stores e sincronizando estado local...')

      // Re-hydrate local Zustand stores so UI is in clean state
      await Promise.allSettled([
        initContractsStore(),
        initKeysStore(),
        initEntitiesStore(),
        initDocumentsStore(),
        initMainStore(),
      ])

      // Re-fetch database counts
      await fetchCounts()

      setProgressPercent(100)
      setCurrentStepText('Limpeza concluída com sucesso!')
      addLog('Processo de limpeza de dados finalizado.', 'success')

      setCleanupSummary({
        ...summary,
        completedAt: new Date().toLocaleTimeString('pt-BR'),
      })

      toast({
        title: 'Limpeza de Dados Concluída',
        description: 'Os dados de teste foram zerados conforme o escopo selecionado.',
      })
    } catch (err: any) {
      addLog(`Erro crítico durante o processo: ${err.message || err}`, 'error')
      toast({
        variant: 'destructive',
        title: 'Erro na Limpeza de Dados',
        description: err.message || 'Ocorreu um erro inesperado durante a execução da limpeza.',
      })
    } finally {
      setIsCleaning(false)
      setConfirmationInput('')
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Card className="border-destructive/40 shadow-sm">
        <CardHeader className="bg-destructive/5 border-b border-destructive/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-destructive/10 text-destructive rounded-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-destructive flex items-center gap-2">
                  Limpeza de Dados (Reset para Produção)
                </CardTitle>
                <CardDescription>
                  Ferramenta administrativa para apagar registros de testes antes da entrada oficial
                  em produção.
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCounts}
              disabled={loadingCounts || isCleaning}
              className="self-start sm:self-auto gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loadingCounts ? 'animate-spin' : ''}`} />
              Recarregar Contagens
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Warning Banner */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold">Aviso de Ação Irreversível</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Esta ação apagará <strong>permanentemente</strong> todas as linhas das tabelas de
                transação/testes listadas abaixo e excluirá no SharePoint Online os arquivos físicos
                referenciados por <code className="bg-muted px-1 rounded">property_documents</code>.
                As configurações do sistema, usuários, modelos de contrato e mapeamentos GED serão{' '}
                <strong>preservados intactos</strong>.
              </p>
            </div>
          </div>

          {/* Tables Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Target Tables */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-destructive">
                  <Trash2 className="w-4 h-4" /> Tabelas a serem Zeradas ({TARGET_TABLES.length})
                </h4>
                <Badge
                  variant="outline"
                  className="border-destructive/30 text-destructive font-mono"
                >
                  {totalTargetRows} registros no total
                </Badge>
              </div>
              <div className="border rounded-md overflow-hidden bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="text-xs">Tabela</TableHead>
                      <TableHead className="text-right text-xs w-[120px]">Linhas Atuais</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TARGET_TABLES.map((t) => (
                      <TableRow key={t.name}>
                        <TableCell className="text-sm py-2.5">
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.label.split('(')[0].trim()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-2.5">
                          {loadingCounts ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin ml-auto text-muted-foreground" />
                          ) : (
                            <Badge
                              variant={(counts[t.name] || 0) > 0 ? 'secondary' : 'outline'}
                              className="font-mono text-xs"
                            >
                              {counts[t.name] ?? 0}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Preserved Tables */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Tabelas Preservadas (
                  {PRESERVED_TABLES.length})
                </h4>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono"
                >
                  Intocadas
                </Badge>
              </div>
              <div className="border rounded-md overflow-hidden bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="text-xs">Tabela</TableHead>
                      <TableHead className="text-right text-xs w-[120px]">Linhas Atuais</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PRESERVED_TABLES.map((t) => (
                      <TableRow key={t.name}>
                        <TableCell className="text-sm py-2.5">
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.label.split('(')[0].trim()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-2.5">
                          {loadingCounts ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin ml-auto text-muted-foreground" />
                          ) : (
                            <Badge
                              variant="outline"
                              className="font-mono text-xs text-muted-foreground"
                            >
                              {counts[t.name] ?? 0}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Progress and Execution Area */}
          {isCleaning && (
            <div className="p-4 rounded-lg bg-muted/50 border space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  {currentStepText || 'Executando limpeza...'}
                </span>
                <span className="font-mono font-semibold">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          {/* Execution Logs */}
          {logs.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Log de Execução em Tempo Real
              </h4>
              <div className="p-3 bg-zinc-950 text-zinc-200 rounded-lg font-mono text-xs max-h-56 overflow-y-auto space-y-1 border border-zinc-800">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2 ${
                      log.type === 'error'
                        ? 'text-red-400'
                        : log.type === 'warning'
                          ? 'text-amber-400'
                          : log.type === 'success'
                            ? 'text-emerald-400'
                            : 'text-zinc-300'
                    }`}
                  >
                    <span className="text-zinc-500 shrink-0">[{log.timestamp}]</span>
                    <span className="break-all">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Card after completion */}
          {cleanupSummary && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-100 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
                Resumo da Limpeza Finalizada ({cleanupSummary.completedAt})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-background/80 rounded border">
                  <div className="text-muted-foreground">Arquivos SharePoint Excluídos</div>
                  <div className="text-base font-bold text-emerald-600">
                    {cleanupSummary.spSuccess}
                  </div>
                </div>
                <div className="p-2.5 bg-background/80 rounded border">
                  <div className="text-muted-foreground">Falhas no SharePoint</div>
                  <div className="text-base font-bold text-amber-600">
                    {cleanupSummary.spFailures}
                  </div>
                </div>
                <div className="p-2.5 bg-background/80 rounded border">
                  <div className="text-muted-foreground">Total Linhas DB Excluídas</div>
                  <div className="text-base font-bold text-primary">
                    {Object.values(cleanupSummary.dbDeleted).reduce((a, b) => a + b, 0)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trigger Action */}
          <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              Esta ação só pode ser executada por administradores autenticados.
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmationInput('')
                setDialogOpen(true)
              }}
              disabled={isCleaning || loadingCounts}
              className="w-full sm:w-auto gap-2 font-semibold shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Zerar Dados de Teste
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-destructive mb-1">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <AlertDialogTitle>Confirmação de Exclusão Permanente</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="space-y-3 pt-2 text-sm text-foreground">
              <p>
                Você está prestes a <strong>apagar todos os dados operacionais de teste</strong> do
                banco de dados e os arquivos vinculados no SharePoint Online.
              </p>
              <div className="p-3 bg-destructive/10 rounded border border-destructive/20 text-xs space-y-1">
                <p className="font-semibold text-destructive">Tabelas que serão zeradas:</p>
                <p className="text-muted-foreground">
                  property_documents, inspections, contracts, key_control, app_audit_logs,
                  properties, pre_registrations, owners, tenants.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Para confirmar e prosseguir com a exclusão, digite exatamente{' '}
                <strong className="text-destructive font-mono">{CONFIRMATION_KEYWORD}</strong> no
                campo abaixo:
              </p>
              <Input
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                placeholder={`Digite "${CONFIRMATION_KEYWORD}"`}
                className="font-mono"
                autoFocus
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCleaning}>Cancelar</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={executeCleanup}
              disabled={confirmationInput.trim() !== CONFIRMATION_KEYWORD || isCleaning}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Confirmar e Zerar Dados
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
