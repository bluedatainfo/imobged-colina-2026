import { useState, useEffect, useCallback } from 'react'
import {
  HardDrive,
  Clock,
  AlertTriangle,
  RefreshCw,
  Save,
  Trash2,
  CheckCircle2,
  Loader2,
  Database,
  Cloud,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import {
  inspectionsService,
  InspectionRetentionSettings,
  InspectionStorageMetrics,
} from '@/services/inspections'

function formatBytes(bytes: number, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default function InspectionRetentionSettingsView() {
  const { toast } = useToast()
  const { user } = useAuth()
  const roleStr = user?.role ? String(user.role).toLowerCase() : ''
  const isAdmin = roleStr.includes('admin') || roleStr.includes('geren') || user?.role === 'Gerente'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cleaning, setCleaning] = useState(false)
  const [confirmCleanOpen, setConfirmCleanOpen] = useState(false)

  const [settings, setSettings] = useState<InspectionRetentionSettings>({
    id: '11111111-1111-1111-1111-111111111111',
    retention_days: 180,
    storage_limit_gb: 10,
    last_cleanup_at: null,
    last_cleanup_summary: null,
  })

  const [retentionDaysInput, setRetentionDaysInput] = useState('180')
  const [storageLimitInput, setStorageLimitInput] = useState('10')

  const [metrics, setMetrics] = useState<InspectionStorageMetrics | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [fetchedSettings, fetchedMetrics] = await Promise.all([
        inspectionsService.getSettings(),
        inspectionsService.getStorageMetrics(),
      ])
      setSettings(fetchedSettings)
      setRetentionDaysInput(String(fetchedSettings.retention_days))
      setStorageLimitInput(String(fetchedSettings.storage_limit_gb))
      setMetrics(fetchedMetrics)
    } catch (err: any) {
      console.error('Erro ao carregar dados de retenção e armazenamento:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar configurações',
        description: err.message || 'Falha ao buscar dados de vistoria.',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSaveSettings = async () => {
    if (!isAdmin) {
      toast({
        variant: 'destructive',
        title: 'Acesso Restrito',
        description: 'Apenas Administradores podem alterar a política de retenção.',
      })
      return
    }

    const days = parseInt(retentionDaysInput, 10)
    const limitGb = parseFloat(storageLimitInput)

    if (isNaN(days) || days < 1) {
      toast({
        variant: 'destructive',
        title: 'Valor Inválido',
        description: 'O prazo de retenção deve ser de no mínimo 1 dia.',
      })
      return
    }

    if (isNaN(limitGb) || limitGb <= 0) {
      toast({
        variant: 'destructive',
        title: 'Valor Inválido',
        description: 'O limite de armazenamento deve ser maior que 0 GB.',
      })
      return
    }

    setSaving(true)
    try {
      const updated = await inspectionsService.updateSettings({
        retentionDays: days,
        storageLimitGb: limitGb,
        userName: user?.name || user?.email || 'Administrador',
        userEmail: user?.email || undefined,
      })
      setSettings(updated)
      toast({
        title: 'Política de Vistoria Atualizada',
        description: `Retenção definida para ${days} dias e limite de alerta em ${limitGb} GB. Alteração auditada.`,
      })
      await loadData()
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar configurações',
        description: err.message,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleManualCleanup = async () => {
    setCleaning(true)
    try {
      const result = await inspectionsService.runRetentionCleanup({
        triggeredBy: user?.name || user?.email || 'Administrador (Manual)',
        userEmail: user?.email || undefined,
        force: true,
      })

      setConfirmCleanOpen(false)
      toast({
        title: 'Rotina de Limpeza Concluída',
        description: result.message,
      })
      await loadData()
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao executar limpeza',
        description: err.message,
      })
    } finally {
      setCleaning(false)
    }
  }

  if (loading && !metrics) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Carregando métricas de armazenamento e política de retenção...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Alerta de Limite Ultrapassado */}
      {metrics?.limitWarningExceeded && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-semibold">Alerta de Espaço na Galeria Ultrapassado!</p>
            <p className="text-xs text-muted-foreground">
              O consumo atual da Galeria Supabase (
              <strong>{formatBytes(metrics.galleryTotalBytes)}</strong>) ultrapassou o limite máximo
              configurado de <strong>{metrics.storageLimitGb} GB</strong>. Fotos não selecionadas
              com prazo expirado serão excluídas automaticamente pela política de retenção.
            </p>
          </div>
        </div>
      )}

      {/* Cards de Resumo de Armazenamento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Galeria Supabase */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Galeria de Trabalho (Supabase)</span>
              <Database className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatBytes(metrics?.galleryTotalBytes || 0)}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {metrics?.galleryPhotoCount || 0} fotos totais armazenadas
            </p>
            <div className="pt-2 text-[11px] space-y-1 border-t text-muted-foreground">
              <div className="flex justify-between">
                <span>Vistorias Abertas:</span>
                <strong className="text-amber-600 dark:text-amber-400">
                  {formatBytes(metrics?.galleryOpenBytes || 0)} (
                  {metrics?.galleryOpenPhotoCount || 0})
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Vistorias Finalizadas:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {formatBytes(metrics?.galleryFinalizedBytes || 0)} (
                  {metrics?.galleryFinalizedPhotoCount || 0})
                </strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Dossiê Oficial SharePoint */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>SharePoint (Dossiê Oficial)</span>
              <Cloud className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatBytes(metrics?.sharepointTotalBytes || 0)}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {metrics?.sharepointDocCount || 0} laudos e fotos sincronizadas
            </p>
            <div className="pt-2 text-[11px] border-t text-muted-foreground">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Imutável &bull; Preservação Contratual
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Uso vs Limite */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Capacidade da Galeria</span>
              <HardDrive className="w-4 h-4 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">{metrics?.usagePercent.toFixed(1)}%</span>
              <span className="text-xs text-muted-foreground">
                Limite: {metrics?.storageLimitGb} GB
              </span>
            </div>
            <Progress
              value={metrics?.usagePercent || 0}
              className={`h-2 ${metrics?.limitWarningExceeded ? 'bg-destructive/20 [&>div]:bg-destructive' : ''}`}
            />
            <p className="text-[11px] text-muted-foreground">
              {metrics?.limitWarningExceeded ? (
                <span className="text-destructive font-semibold">Alerta atingido!</span>
              ) : (
                <span>Dentro do limite estipulado</span>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Fotos Sujeitas à Limpeza */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-between">
              <span>Não Selecionadas (Vencimento)</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {metrics?.unselectedExpiringCount || 0}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {formatBytes(metrics?.unselectedExpiringBytes || 0)} sujeitos à limpeza
            </p>
            <div className="pt-2 text-[11px] border-t text-muted-foreground flex items-center justify-between">
              <span>Política ativa:</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-mono">
                {metrics?.retentionDays} dias
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Configuração da Política de Retenção */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Política de Retenção de Fotos Não
                Selecionadas
              </CardTitle>
              <CardDescription>
                Define o prazo após o qual fotos <strong>não selecionadas</strong> da galeria de
                trabalho são removidas automaticamente. Fotos anexadas ao contrato no SharePoint{' '}
                <strong>jamais</strong> são excluídas.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo: Prazo de Retenção */}
            <div className="space-y-2">
              <Label htmlFor="retentionDays">
                Prazo de Retenção para Fotos Não Selecionadas (dias)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="retentionDays"
                  type="number"
                  min="1"
                  step="1"
                  value={retentionDaysInput}
                  onChange={(e) => setRetentionDaysInput(e.target.value)}
                  disabled={!isAdmin || saving}
                  className="w-36 font-mono font-semibold"
                />
                <span className="text-xs text-muted-foreground">
                  (Padrão inicial: <strong>180 dias</strong> &bull; alterável a qualquer momento)
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As fotos de trabalho que o vistoriador não marcou para compor o laudo final expiram
                após este prazo. Na galeria, o usuário visualiza um selo com os dias restantes.
              </p>
            </div>

            {/* Campo: Limite de Alerta de Armazenamento */}
            <div className="space-y-2">
              <Label htmlFor="storageLimit">
                Limite de Alerta para a Galeria de Vistorias (GB)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="storageLimit"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={storageLimitInput}
                  onChange={(e) => setStorageLimitInput(e.target.value)}
                  disabled={!isAdmin || saving}
                  className="w-36 font-mono font-semibold"
                />
                <span className="text-xs text-muted-foreground">
                  (Exibe aviso visual na tela quando o volume da galeria ultrapassar este teto)
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Permite à gerência antecipar a necessidade de expansão de cota ou revisar fotos
                armazenadas na nuvem antes de impactar o serviço.
              </p>
            </div>
          </div>

          {/* Última execução da limpeza */}
          <div className="p-4 rounded-lg bg-muted/40 border text-xs space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Status da Rotina de Limpeza Automática
              </span>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmCleanOpen(true)}
                  disabled={cleaning}
                  className="h-7 text-xs gap-1.5 border-amber-300 text-amber-800 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Executar Limpeza Agora
                </Button>
              )}
            </div>
            <div className="text-muted-foreground">
              {settings.last_cleanup_at ? (
                <>
                  Última execução em{' '}
                  <strong className="text-foreground">
                    {new Date(settings.last_cleanup_at).toLocaleString('pt-BR')}
                  </strong>
                  . Resumo:{' '}
                  <span>
                    {settings.last_cleanup_summary?.deleted_count || 0} fotos removidas (
                    {formatBytes(settings.last_cleanup_summary?.freed_bytes || 0)} liberados)
                  </span>
                  .
                </>
              ) : (
                'A rotina roda periodicamente ao acessar o módulo de Vistorias e elimina itens que atingiram o prazo estipulado.'
              )}
            </div>
          </div>

          {/* Botão de Salvar Alterações */}
          {isAdmin && (
            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveSettings} disabled={saving} className="gap-2">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Salvar Política e Limites
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabela de Histórico / Comparativo Galeria × SharePoint */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Histórico Mensal & Comparativo Galeria ×
            SharePoint
          </CardTitle>
          <CardDescription>
            Evolução do volume de dados armazenados na Galeria Supabase em comparação com o Dossiê
            Oficial arquivado no SharePoint Online.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês de Referência</TableHead>
                  <TableHead>Galeria de Trabalho (Supabase)</TableHead>
                  <TableHead>Dossiê Oficial (SharePoint)</TableHead>
                  <TableHead>Total de Fotos Registradas</TableHead>
                  <TableHead className="text-right">Proporção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics?.monthlyHistory && metrics.monthlyHistory.length > 0 ? (
                  metrics.monthlyHistory.map((item) => {
                    const totalMonth = item.galleryBytes + item.sharepointBytes
                    const galRatio =
                      totalMonth > 0 ? ((item.galleryBytes / totalMonth) * 100).toFixed(0) : '0'
                    const spRatio =
                      totalMonth > 0 ? ((item.sharepointBytes / totalMonth) * 100).toFixed(0) : '0'

                    return (
                      <TableRow key={item.month}>
                        <TableCell className="font-mono text-xs font-semibold">
                          {item.month}
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {formatBytes(item.galleryBytes)}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {formatBytes(item.sharepointBytes)}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {item.photoCount} foto(s)
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          <Badge variant="outline" className="text-[10px]">
                            {galRatio}% Galeria / {spRatio}% SP
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground text-xs"
                    >
                      Nenhum histórico acumulado até o momento.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Confirmação da Limpeza Manual */}
      <AlertDialog open={confirmCleanOpen} onOpenChange={setConfirmCleanOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Executar Limpeza de Retenção Manualmente?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 pt-2 text-xs text-foreground">
                <p>
                  Esta rotina verificará todas as fotos da Galeria de Trabalho no Supabase Storage.
                </p>
                <div className="p-3 bg-muted/60 rounded border text-muted-foreground space-y-1">
                  <p>
                    &bull; Somente fotos <strong>NÃO selecionadas</strong> (selected = false, não
                    anexadas ao contrato) com mais de{' '}
                    <strong>{settings.retention_days} dias</strong> serão excluídas.
                  </p>
                  <p>
                    &bull; Fotos selecionadas enviadas ao SharePoint{' '}
                    <strong className="text-foreground">permanecerão intactas</strong>.
                  </p>
                  <p>
                    &bull; Um registro de auditoria completo será gravado em{' '}
                    <code>public.app_audit_logs</code>.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cleaning}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleManualCleanup}
              disabled={cleaning}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {cleaning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Confirmar e Executar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
