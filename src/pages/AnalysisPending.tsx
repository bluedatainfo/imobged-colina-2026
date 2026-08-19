import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { resolveOperatorForPersistence } from '@/lib/operator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardCheck, Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const formatCpfCnpj = (v: string | null | undefined) => {
  if (!v) return 'Não informado'
  const numbers = v.replace(/\D/g, '')
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14)
  }
  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18)
}

export default function AnalysisPending() {
  const [pendingItems, setPendingItems] = useState<any[]>([])
  const [resolvedItems, setResolvedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pendentes')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const [pendingRes, resolvedRes] = await Promise.all([
        supabase
          .from('pre_registrations')
          .select('*')
          .eq('status', 'Pendência')
          .order('updated_at', { ascending: false }),
        supabase
          .from('pre_registrations')
          .select('*')
          .eq('status', 'Pendência Resolvida')
          .order('updated_at', { ascending: false }),
      ])

      if (pendingRes.error) throw pendingRes.error
      if (resolvedRes.error) throw resolvedRes.error

      setPendingItems(pendingRes.data || [])
      setResolvedItems(resolvedRes.data || [])
    } catch (err: any) {
      toast({
        title: 'Erro ao buscar pendências',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleMarkResolved = async (item: any) => {
    setProcessingId(item.id)
    try {
      // Ao resolver uma pendência, grava o operador atual (contas sem
      // operador gravam NULL). O cadastro da pendência em si (status
      // 'Pendência') é feito em /candidates via candidatesService — que já
      // passa o operador em updateStatus.
      const { error } = await supabase
        .from('pre_registrations')
        .update({ status: 'Pendência Resolvida', operator: resolveOperatorForPersistence() })
        .eq('id', item.id)

      if (error) throw error

      toast({
        title: 'Pendência Resolvida',
        description: 'O dossiê voltou para a fila de Análise da Gerência.',
      })
      fetchItems()
    } catch (err: any) {
      toast({
        title: 'Erro ao resolver pendência',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setProcessingId(null)
    }
  }

  const renderEmpty = (message: string, Icon: any) => (
    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
      <Icon className="w-12 h-12 mx-auto mb-3 opacity-20" />
      <p>{message}</p>
    </div>
  )

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <ClipboardCheck className="w-8 h-8" />
          Pendências de Análise
        </h1>
        <p className="text-muted-foreground">
          Acompanhe e resolva as pendências apontadas pela gerência nos dossiês de locação.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:w-[500px]">
          <TabsTrigger value="pendentes">
            Pendências Ativas
            {pendingItems.length > 0 && (
              <Badge variant="destructive" className="ml-2 animate-pulse">
                {pendingItems.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="resolvidas">Resolvidas</TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes">
          <Card>
            <CardHeader>
              <CardTitle>Dossiês com Pendência</CardTitle>
              <CardDescription>
                Aguardando correção do atendente. Ao marcar como resolvido, o dossiê retorna para a
                Análise da Gerência.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : pendingItems.length === 0 ? (
                renderEmpty('Nenhuma pendência ativa no momento.', CheckCircle2)
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Interessado / Locatário</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Pendência Apontada</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Operador</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingItems.map((item) => (
                        <TableRow key={item.id} className="bg-red-50/30">
                          <TableCell className="font-medium">{item.full_name}</TableCell>
                          <TableCell className="text-sm">
                            {formatCpfCnpj(item.cpf || item.cnpj)}
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-red-800">
                                {item.pending_notes || '—'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-600 border-red-200"
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm">
                            {item.operator || '—'}
                          </TableCell>
                          <TableCell className="text-sm whitespace-nowrap">
                            {new Date(item.updated_at || item.created_at).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleMarkResolved(item)}
                              disabled={processingId === item.id}
                            >
                              {processingId === item.id ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                              )}
                              Marcar como Resolvido
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolvidas">
          <Card>
            <CardHeader>
              <CardTitle>Pendências Resolvidas</CardTitle>
              <CardDescription>
                Dossiês que retornaram para a Análise da Gerência após correção.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : resolvedItems.length === 0 ? (
                renderEmpty('Nenhuma pendência resolvida ainda.', Clock)
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Interessado / Locatário</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Pendência</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Operador</TableHead>
                        <TableHead>Resolvido em</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resolvedItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.full_name}</TableCell>
                          <TableCell className="text-sm">
                            {formatCpfCnpj(item.cpf || item.cnpj)}
                          </TableCell>
                          <TableCell className="max-w-md">
                            <span className="text-sm text-muted-foreground">
                              {item.pending_notes || '—'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm">
                            {item.operator || '—'}
                          </TableCell>
                          <TableCell className="text-sm whitespace-nowrap">
                            {new Date(item.updated_at || item.created_at).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
