import { useState, useMemo, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2, Search, UserCheck, AlertCircle, Building2 } from 'lucide-react'
import useEntitiesStore, { initEntitiesStore } from '@/stores/entities'
import { supabase } from '@/lib/supabase/client'
import { resolveOperatorForPersistence } from '@/lib/operator'
import { PreRegistration, PreRegistrationCategory } from '@/services/candidates'
import { toast } from 'sonner'

interface IncludeErpTenantDialogProps {
  open: boolean
  onClose: () => void
  onTenantIncluded: (candidate: PreRegistration) => void
}

interface ErpUnifiedTenant {
  id: string
  code: string
  fullName: string
  cpf: string
  cnpj?: string
  rg?: string
  fullAddress: string
  email?: string
  phone?: string
  category: PreRegistrationCategory
  sourceType: 'Locatário' | 'Garantia'
}

function cleanDoc(val: string | null | undefined): string {
  return (val || '').replace(/\D/g, '')
}

function formatCpfOrCnpj(val: string | null | undefined): string {
  if (!val) return '-'
  const digits = val.replace(/\D/g, '')
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  if (digits.length === 14) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  return val
}

export function IncludeErpTenantDialog({
  open,
  onClose,
  onTenantIncluded,
}: IncludeErpTenantDialogProps) {
  const { tenants, guarantees, guaranteesError } = useEntitiesStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [submittingId, setSubmittingId] = useState<string | null>(null)

  // Ensure ERP entities are initialized/fresh when opening dialog
  useEffect(() => {
    if (open) {
      setSearchTerm('')
      setSubmittingId(null)
      setLoading(true)
      initEntitiesStore().finally(() => {
        setLoading(false)
      })
    }
  }, [open])

  // Aggregate tenants and guarantees from ERP (source === 'ERP' or ERP guarantees)
  const unifiedErpTenants: ErpUnifiedTenant[] = useMemo(() => {
    const list: ErpUnifiedTenant[] = []
    const seen = new Set<string>()

    // 1. Tenants from ERP (source === 'ERP')
    const erpTenants = (tenants || []).filter((t) => !t.source || t.source.toUpperCase() === 'ERP')
    for (const t of erpTenants) {
      const docDigits = cleanDoc(t.cpf)
      const isCnpj = docDigits.length > 11
      const category: PreRegistrationCategory = isCnpj ? 'PJ' : 'PF'
      const key = `t-${t.code || t.id}-${docDigits}`
      if (!seen.has(key)) {
        seen.add(key)
        list.push({
          id: t.id,
          code: t.code || t.id || '',
          fullName: t.fullName,
          cpf: isCnpj ? '' : t.cpf,
          cnpj: isCnpj ? t.cpf : '',
          rg: t.rg,
          fullAddress: t.fullAddress || '',
          email: '',
          phone: t.celular || t.telefone || '',
          category,
          sourceType: 'Locatário',
        })
      }
    }

    // 2. Guarantees from ERP
    for (const g of guarantees || []) {
      const docDigits = cleanDoc(g.cpf)
      const isCnpj = g.pessoa?.toUpperCase() === 'J' || docDigits.length > 11
      const category: PreRegistrationCategory = isCnpj ? 'PJ' : 'PF'
      const key = `g-${g.id}-${docDigits}`
      if (!seen.has(key)) {
        seen.add(key)
        list.push({
          id: g.id,
          code: g.id || '',
          fullName: g.nome,
          cpf: isCnpj ? '' : g.cpf,
          cnpj: isCnpj ? g.cpf : '',
          rg: '',
          fullAddress: g.endereco || '',
          email: g.email || '',
          phone: g.celular || g.telefone || '',
          category,
          sourceType: 'Garantia',
        })
      }
    }

    return list
  }, [tenants, guarantees])

  // Filter list by Name, Code or Document
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return unifiedErpTenants
    const term = searchTerm.toLowerCase().trim()
    const cleanTerm = term.replace(/\D/g, '')

    return unifiedErpTenants.filter((item) => {
      const nameMatch = item.fullName.toLowerCase().includes(term)
      const codeMatch = item.code.toLowerCase().includes(term)
      const docDigits = cleanDoc(item.cpf || item.cnpj)
      const docMatch =
        (cleanTerm && docDigits.includes(cleanTerm)) ||
        (item.cpf && item.cpf.toLowerCase().includes(term)) ||
        (item.cnpj && item.cnpj.toLowerCase().includes(term))

      return nameMatch || codeMatch || docMatch
    })
  }, [unifiedErpTenants, searchTerm])

  const handleSelectTenant = async (item: ErpUnifiedTenant) => {
    try {
      setSubmittingId(item.id)
      const itemDocDigits = cleanDoc(item.cpf || item.cnpj)
      const itemCode = (item.code || '').trim()

      // 1. Check if it already exists in pre_registrations
      // Search by exact code or document (CPF/CNPJ)
      let query = supabase.from('pre_registrations').select('*')

      if (itemDocDigits && itemCode) {
        // Build or clause for document or code
        const docConditions = [
          `cpf.eq.${itemDocDigits}`,
          `cnpj.eq.${itemDocDigits}`,
          `cpf.eq.${item.cpf || ''}`,
          `cnpj.eq.${item.cnpj || ''}`,
        ]
        if (item.cpf) docConditions.push(`cpf.eq.${item.cpf}`)
        if (item.cnpj) docConditions.push(`cnpj.eq.${item.cnpj}`)

        const uniqueDocFilters = Array.from(
          new Set(docConditions.filter((c) => !c.endsWith('.eq.'))),
        )
        query = query.or(`code.eq.${itemCode},${uniqueDocFilters.join(',')}`)
      } else if (itemDocDigits) {
        query = query.or(
          `cpf.eq.${itemDocDigits},cnpj.eq.${itemDocDigits},cpf.eq.${item.cpf || ''},cnpj.eq.${item.cnpj || ''}`,
        )
      } else if (itemCode) {
        query = query.eq('code', itemCode)
      } else {
        query = query.ilike('full_name', item.fullName)
      }

      const { data: existingRecords, error: searchError } = await query.limit(5)

      if (searchError) {
        console.error('Error querying pre_registrations:', searchError)
      }

      // Check for exact matching record
      let matchedRecord: PreRegistration | null = null
      if (existingRecords && existingRecords.length > 0) {
        // Priority to exact code or document match
        matchedRecord = (existingRecords.find((r) => {
          const rDoc = cleanDoc(r.cpf || r.cnpj)
          if (itemDocDigits && rDoc && rDoc === itemDocDigits) return true
          if (itemCode && r.code && r.code.toLowerCase() === itemCode.toLowerCase()) return true
          return false
        }) || existingRecords[0]) as PreRegistration
      }

      if (matchedRecord) {
        toast.info(
          `Locatário já cadastrado em Interessados (Código: ${matchedRecord.code || matchedRecord.id.slice(0, 8)}). Abrindo ficha...`,
        )
        onTenantIncluded(matchedRecord)
        onClose()
        return
      }

      // 2. If not found, create a new record in pre_registrations
      const currentOp = resolveOperatorForPersistence()

      // Generate a payload adhering to PreRegistration schema
      const newPreRegistrationPayload = {
        full_name: item.fullName,
        code: item.code || null,
        cpf: item.cpf ? item.cpf : null,
        cnpj: item.cnpj ? item.cnpj : null,
        email: item.email || null,
        phone: item.phone || null,
        address: item.fullAddress || null,
        category: item.category,
        status: 'Novo',
        operator: currentOp,
        form_data: {
          origem: 'ERP Local',
          tipo: item.sourceType,
          codigo_erp: item.code,
          nome: item.fullName,
          cpf_cnpj: item.cpf || item.cnpj || '',
          rg: item.rg || '',
          endereco: item.fullAddress || '',
          telefone: item.phone || '',
          email: item.email || '',
        },
      }

      const { data: inserted, error: insertError } = await supabase
        .from('pre_registrations')
        .insert(newPreRegistrationPayload)
        .select()
        .single()

      if (insertError) {
        // If there's a unique constraint conflict on code, retry without explicit code so trigger assigns one
        if (insertError.code === '23505') {
          const fallbackPayload = {
            ...newPreRegistrationPayload,
            code: null,
            form_data: {
              ...newPreRegistrationPayload.form_data,
              codigo_erp_original: item.code,
            },
          }
          const { data: fallbackInserted, error: fallbackError } = await supabase
            .from('pre_registrations')
            .insert(fallbackPayload)
            .select()
            .single()

          if (fallbackError) throw fallbackError

          toast.success(`Locatário "${item.fullName}" incluído com sucesso no sistema!`)
          onTenantIncluded(fallbackInserted as PreRegistration)
          onClose()
          return
        }
        throw insertError
      }

      toast.success(`Locatário "${item.fullName}" incluído com sucesso no sistema!`)
      onTenantIncluded(inserted as PreRegistration)
      onClose()
    } catch (err: any) {
      console.error('Erro ao incluir locatário do ERP:', err)
      toast.error(err.message || 'Erro ao incluir locatário do ERP local.')
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Building2 className="w-5 h-5 text-red-600" />
            Incluir Locatário do ERP Local
          </DialogTitle>
          <DialogDescription>
            Pesquise por nome, código ou CPF/CNPJ de locatários e garantias cadastrados no ERP local
            para trazê-los para o fluxo de análise de interessados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por Nome, Código ou CPF/CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 text-base"
              autoFocus
            />
          </div>

          {guaranteesError && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-md border border-amber-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                Aviso: A sincronização direta com o ERP Local pode estar limitada ou offline no
                momento. Exibindo registros em cache.
              </span>
            </div>
          )}

          <div className="rounded-md border bg-card flex-1 overflow-hidden min-h-[300px] max-h-[50vh] flex flex-col">
            <div className="overflow-y-auto overflow-x-auto flex-1 scrollbar-thin">
              <Table className="w-full">
                <TableHeader className="bg-muted/50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead className="min-w-[200px]">Nome Completo / Razão Social</TableHead>
                    <TableHead className="w-[150px]">CPF / CNPJ</TableHead>
                    <TableHead className="w-[80px]">Tipo</TableHead>
                    <TableHead className="w-[120px] text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                          <span>Carregando registros do ERP...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        {searchTerm.trim()
                          ? 'Nenhum locatário ou garantia encontrado no ERP com este termo.'
                          : 'Nenhum registro encontrado no ERP Local.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredList.map((item) => {
                      const isSubmitting = submittingId === item.id
                      const docDisplay = formatCpfOrCnpj(item.cpf || item.cnpj)

                      return (
                        <TableRow
                          key={`${item.sourceType}-${item.id}`}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-mono font-medium text-xs text-slate-800">
                            {item.code || item.id}
                          </TableCell>
                          <TableCell className="font-medium text-slate-900">
                            <div className="flex flex-col">
                              <span>{item.fullName}</span>
                              {item.fullAddress && (
                                <span className="text-xs text-muted-foreground truncate max-w-[320px]">
                                  {item.fullAddress}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs whitespace-nowrap text-slate-700">
                            {docDisplay}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.category === 'PJ'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }
                            >
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleSelectTenant(item)}
                              disabled={isSubmitting || submittingId !== null}
                              className="bg-red-600 hover:bg-red-700 text-white gap-1.5 h-8 px-3"
                            >
                              {isSubmitting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <UserCheck className="h-3.5 w-3.5" />
                              )}
                              Selecionar
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>
              Mostrando {filteredList.length} de {unifiedErpTenants.length} registros disponíveis no
              ERP
            </span>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
