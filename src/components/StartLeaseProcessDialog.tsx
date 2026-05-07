import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Loader2, MapPin, User, Building, Search } from 'lucide-react'
import useEntitiesStore from '@/stores/entities'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { PreRegistration } from '@/services/candidates'
import { useNavigate } from 'react-router-dom'
import { mainStore } from '@/stores/main'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  open: boolean
  onClose: () => void
  candidate: PreRegistration | null
  onSuccess: () => void
}

const getOwnerName = (property: any) => {
  if (!property) return 'Não informado'
  if (property.proprietario) return property.proprietario
  if (property.Proprietario) return property.Proprietario
  if (property.nomeProprietario) return property.nomeProprietario
  if (property.proprietario_nome) return property.proprietario_nome
  if (property.cliente) return property.cliente
  if (property.ownerName) return property.ownerName
  if (property.title) return property.title
  if (
    property.proprietarios &&
    Array.isArray(property.proprietarios) &&
    property.proprietarios.length > 0
  ) {
    return property.proprietarios[0].nome
  }
  return 'Proprietário não informado'
}

const getAddress = (property: any) => {
  if (!property) return 'Endereço não informado'
  const parts = []
  if (property.endereco) parts.push(property.endereco)
  if (property.numero) parts.push(property.numero)
  if (property.bairro) parts.push(property.bairro)
  if (property.cidade) parts.push(property.cidade)
  if (property.uf) parts.push(property.uf)
  return parts.length > 0 ? parts.join(', ') : 'Endereço não informado'
}

const formatCurrency = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return ''
  const amount = Number(numbers) / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

const formatCpfCnpj = (v: string) => {
  if (!v) return ''
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

const parseCurrency = (value: string) => {
  if (!value) return 0
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return 0
  return Number(numbers) / 100
}

export function StartLeaseProcessDialog({ open, onClose, candidate, onSuccess }: Props) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { owners } = useEntitiesStore()
  const { user } = useAuth()

  const [guarantors, setGuarantors] = useState<PreRegistration[]>([])
  const [selectedGuarantor, setSelectedGuarantor] = useState('')

  const [propertyMode, setPropertyMode] = useState<'existing' | 'new'>('existing')

  // ERP Search state
  const [openERP, setOpenERP] = useState(false)
  const [searchERP, setSearchERP] = useState('')
  const debouncedSearchERP = useDebounce(searchERP, 400)
  const [erpOptions, setErpOptions] = useState<any[]>([])
  const [loadingERP, setLoadingERP] = useState(false)
  const [selectedERPProperty, setSelectedERPProperty] = useState<any | null>(null)

  const [newPropData, setNewPropData] = useState({
    ownerName: '',
    address: '',
    neighborhood: '',
    city: '',
    sheet: '',
    rentValue: '',
    iptu: '',
    condo: '',
    contractTerm: '',
    release12Months: 'nao',
    proposal: '',
    spc: '',
    date: '',
  })

  const updatePropData = (field: string, value: string) => {
    setNewPropData((prev) => ({ ...prev, [field]: value }))
  }

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      supabase
        .from('pre_registrations')
        .select('*')
        .eq('category', 'Fiador')
        .then(({ data }) => {
          setGuarantors(data || [])
        })
    }
  }, [open])

  useEffect(() => {
    if (propertyMode !== 'existing' || !debouncedSearchERP.trim()) {
      setErpOptions([])
      return
    }

    let isMounted = true
    const fetchOptions = async () => {
      setLoadingERP(true)
      try {
        const res = await fetch(
          `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(debouncedSearchERP)}`,
        )
        if (!res.ok) throw new Error('Erro na comunicação com o servidor local')
        const data = await res.json()

        if (isMounted) {
          const dataArray = Array.isArray(data) ? data : [data]
          setErpOptions(dataArray.filter((item) => item && item.id))
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setErpOptions([])
        }
      } finally {
        if (isMounted) {
          setLoadingERP(false)
        }
      }
    }

    fetchOptions()
    return () => {
      isMounted = false
    }
  }, [debouncedSearchERP, propertyMode])

  const handleSubmit = async () => {
    if (!candidate) return
    setSubmitting(true)
    try {
      let finalPropId = ''
      let title = ''
      let address = ''
      let rentValue = 0
      let finalOwnerId = ''
      let details: any = {}

      if (propertyMode === 'existing') {
        if (!selectedERPProperty) throw new Error('Selecione um imóvel da lista.')
        const p = selectedERPProperty
        title = p.title || p.nome || p.endereco || 'Imóvel ERP'
        address = getAddress(p)

        let rawRent = p.rentValue || p.valor || 0
        if (typeof rawRent === 'string' && (rawRent.includes('R$') || rawRent.includes(','))) {
          rentValue = parseCurrency(rawRent)
        } else {
          rentValue = Number(rawRent) || 0
        }
        finalPropId = String(p.id)

        const erpOwnerName = getOwnerName(p)

        const generateShortCode = (prefix: string) => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          let result = ''
          for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
          }
          return `${prefix}-${result}`
        }

        // Sempre busca direto no banco para garantir que pegaremos um UUID válido,
        // evitando IDs mockados da store local que causavam "invalid input syntax for type uuid"
        const { data: dbOwner } = await supabase
          .from('owners')
          .select('id')
          .ilike('full_name', erpOwnerName)
          .maybeSingle()

        if (dbOwner) {
          finalOwnerId = dbOwner.id
        } else {
          const { data: oData, error: oErr } = await supabase
            .from('owners')
            .insert({ code: generateShortCode('ERP'), full_name: erpOwnerName })
            .select()
            .single()
          if (oErr) throw oErr
          finalOwnerId = oData.id
        }
      } else {
        if (!newPropData.ownerName || !newPropData.address)
          throw new Error('Preencha os dados do novo imóvel e proprietário (Endereço e Nome).')

        const generateShortId = () => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          let result = ''
          for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
          }
          return result
        }

        const { data: oData, error: oErr } = await supabase
          .from('owners')
          .insert({
            code: 'MN-' + generateShortId().substring(0, 6),
            full_name: newPropData.ownerName,
          })
          .select()
          .single()
        if (oErr) throw oErr

        finalOwnerId = oData.id
        title = newPropData.address
        address = `${newPropData.address}, ${newPropData.neighborhood}, ${newPropData.city}`
          .replace(/,\s*,/g, ',')
          .replace(/^,\s*|,\s*$/g, '')
        rentValue = parseCurrency(newPropData.rentValue)
        finalPropId = generateShortId()
        details = {
          neighborhood: newPropData.neighborhood,
          city: newPropData.city,
          sheet: newPropData.sheet,
          iptu: parseCurrency(newPropData.iptu),
          condo: parseCurrency(newPropData.condo),
          contractTerm: newPropData.contractTerm,
          release12Months: newPropData.release12Months,
          proposal: newPropData.proposal,
          spc: newPropData.spc,
          date: newPropData.date,
        }
      }

      const { data: existingProp } = await supabase
        .from('properties')
        .select('id')
        .eq('id', finalPropId)
        .maybeSingle()

      const propPayload = {
        id: finalPropId,
        title,
        address,
        type: 'Residencial',
        rent_value: rentValue,
        owner_id: finalOwnerId,
        status: 'Análise Gerencial',
        tenant: candidate.full_name,
        tenant_id: candidate.id,
        guarantor_id: selectedGuarantor && selectedGuarantor !== '_none' ? selectedGuarantor : null,
        ...(propertyMode === 'new' ? { details } : {}),
      }

      if (existingProp) {
        const { error } = await supabase
          .from('properties')
          .update(propPayload)
          .eq('id', finalPropId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('properties').insert(propPayload)
        if (error) throw error
      }

      await supabase
        .from('pre_registrations')
        .update({ status: 'Em Análise da Gerência' })
        .eq('id', candidate.id)

      mainStore.addAuditLog({
        propertyId: finalPropId,
        action: 'Processo de Locação Iniciado',
        user: user?.name || 'Sistema',
        details: `Processo iniciado para interessado ${candidate.full_name}`,
      })

      toast({
        title: 'Processo Iniciado',
        description: 'O dossiê foi enviado para o Hub de Validação Gerencial.',
      })
      onSuccess()
      onClose()
      setTimeout(() => {
        navigate('/manager-approval')
        window.location.reload()
      }, 1000)
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Erro ao iniciar processo', description: e.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (!candidate) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && !submitting && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" /> Iniciar Processo de Locação
          </DialogTitle>
          <DialogDescription>
            Vincule as informações de imóvel, proprietário e fiador para este interessado. O
            processo será enviado para a análise gerencial.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" /> Interessado (Locatário)
            </h4>
            <div className="font-medium text-lg">{candidate.full_name}</div>
            <div className="text-sm text-muted-foreground">
              CPF/CNPJ:{' '}
              {candidate.cpf
                ? formatCpfCnpj(candidate.cpf)
                : candidate.cnpj
                  ? formatCpfCnpj(candidate.cnpj)
                  : 'Não informado'}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" /> Fiador (Opcional)
            </Label>
            <Select value={selectedGuarantor} onValueChange={setSelectedGuarantor}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um fiador sincronizado..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_none">Sem fiador / Garantia alternativa</SelectItem>
                {guarantors.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.full_name} {g.cpf ? `(${formatCpfCnpj(g.cpf)})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" /> Imóvel Pretendido
            </Label>
            <div className="flex gap-2">
              <Button
                variant={propertyMode === 'existing' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setPropertyMode('existing')}
              >
                Buscar no ERP Local
              </Button>
              <Button
                variant={propertyMode === 'new' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setPropertyMode('new')}
              >
                Cadastrar Novo
              </Button>
            </div>

            {propertyMode === 'existing' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="grid gap-2">
                  <Label>Buscar Imóvel / Proprietário no ERP</Label>
                  <Popover open={openERP} onOpenChange={setOpenERP}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openERP}
                        className="justify-between w-full font-normal h-12"
                      >
                        <span
                          className={cn(
                            'truncate',
                            !selectedERPProperty && 'text-muted-foreground',
                          )}
                        >
                          {selectedERPProperty
                            ? `${selectedERPProperty.id} - ${getOwnerName(selectedERPProperty)}`
                            : 'Digite para buscar...'}
                        </span>
                        {loadingERP && !openERP ? (
                          <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
                        ) : (
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Ex: Nome do Proprietário, ID..."
                          value={searchERP}
                          onValueChange={(val) => {
                            setSearchERP(val)
                            setSelectedERPProperty(null)
                          }}
                        />
                        <CommandList>
                          <CommandEmpty className="py-6 text-center text-sm">
                            {loadingERP ? (
                              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Buscando no servidor local...</span>
                              </div>
                            ) : debouncedSearchERP.trim().length > 0 ? (
                              'Nenhum imóvel encontrado.'
                            ) : (
                              'Digite para começar a buscar.'
                            )}
                          </CommandEmpty>
                          <CommandGroup>
                            {erpOptions.map((property) => (
                              <CommandItem
                                key={property.id}
                                value={String(property.id)}
                                onSelect={() => {
                                  setSearchERP(getOwnerName(property))
                                  setSelectedERPProperty(property)
                                  setOpenERP(false)
                                }}
                                className="flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0"
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <span className="font-medium text-sm truncate text-foreground">
                                    {property.id} - {getOwnerName(property)}
                                  </span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground gap-1.5 w-full">
                                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                  <span className="truncate">{getAddress(property)}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedERPProperty && (
                  <div className="p-4 border rounded-lg bg-muted/20 space-y-2">
                    <p className="font-medium text-sm">Imóvel Selecionado:</p>
                    <p className="text-sm text-foreground">{getAddress(selectedERPProperty)}</p>
                    <p className="text-xs text-muted-foreground">
                      Proprietário: {getOwnerName(selectedERPProperty)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2 bg-muted/10 p-4 rounded-lg border">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Nome do Proprietário</Label>
                  <Input
                    value={newPropData.ownerName}
                    onChange={(e) => updatePropData('ownerName', e.target.value)}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Endereço</Label>
                  <Input
                    value={newPropData.address}
                    onChange={(e) => updatePropData('address', e.target.value)}
                    placeholder="Ex: Rua das Flores, 123"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input
                    value={newPropData.neighborhood}
                    onChange={(e) => updatePropData('neighborhood', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input
                    value={newPropData.city}
                    onChange={(e) => updatePropData('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ficha</Label>
                  <Input
                    value={newPropData.sheet}
                    onChange={(e) => updatePropData('sheet', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input
                    value={newPropData.rentValue}
                    onChange={(e) => updatePropData('rentValue', formatCurrency(e.target.value))}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>IPTU (R$)</Label>
                  <Input
                    value={newPropData.iptu}
                    onChange={(e) => updatePropData('iptu', formatCurrency(e.target.value))}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condomínio (R$)</Label>
                  <Input
                    value={newPropData.condo}
                    onChange={(e) => updatePropData('condo', formatCurrency(e.target.value))}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prazo do Contrato</Label>
                  <Input
                    value={newPropData.contractTerm}
                    onChange={(e) => updatePropData('contractTerm', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Liberação 12 Meses</Label>
                  <Select
                    value={newPropData.release12Months}
                    onValueChange={(v) => updatePropData('release12Months', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Proposta</Label>
                  <Input
                    value={newPropData.proposal}
                    onChange={(e) => updatePropData('proposal', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SPC</Label>
                  <Input
                    value={newPropData.spc}
                    onChange={(e) => updatePropData('spc', formatCpfCnpj(e.target.value))}
                    placeholder="CPF/CNPJ do SPC"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={newPropData.date}
                    onChange={(e) => updatePropData('date', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              submitting ||
              (propertyMode === 'existing' && !selectedERPProperty) ||
              (propertyMode === 'new' && (!newPropData.ownerName || !newPropData.address))
            }
          >
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Iniciar Dossiê Gerencial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
