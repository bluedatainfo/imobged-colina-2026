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
import { Card } from '@/components/ui/card'
import { Loader2, MapPin, User, Building } from 'lucide-react'
import useEntitiesStore from '@/stores/entities'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { PreRegistration } from '@/services/candidates'
import { useNavigate } from 'react-router-dom'
import { mainStore } from '@/stores/main'

interface Props {
  open: boolean
  onClose: () => void
  candidate: PreRegistration | null
  onSuccess: () => void
}

export function StartLeaseProcessDialog({ open, onClose, candidate, onSuccess }: Props) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { owners } = useEntitiesStore()
  const [guarantors, setGuarantors] = useState<PreRegistration[]>([])
  const [selectedGuarantor, setSelectedGuarantor] = useState('')

  const [propertyMode, setPropertyMode] = useState<'existing' | 'new'>('existing')

  const [ownerId, setOwnerId] = useState('')
  const [erpProperties, setErpProperties] = useState<any[]>([])
  const [selectedProp, setSelectedProp] = useState('')
  const [loadingProps, setLoadingProps] = useState(false)

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
    if (propertyMode === 'existing' && ownerId) {
      const owner = owners.find((o) => o.id === ownerId)
      if (!owner) return
      let isMounted = true
      setLoadingProps(true)
      fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(owner.fullName)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Falha na resposta do servidor local')
          return res.json()
        })
        .then((data) => {
          if (!isMounted) return
          if (data && data.length > 0) {
            setErpProperties(data)
          } else {
            setErpProperties([])
            toast({
              title: 'Aviso',
              description: 'Nenhum imóvel encontrado no ERP para este proprietário.',
            })
          }
        })
        .catch(() => {
          if (!isMounted) return
          setErpProperties([])
          toast({
            variant: 'destructive',
            title: 'Erro de conexão',
            description: 'Não foi possível conectar ao servidor ERP (192.168.10.225).',
          })
        })
        .finally(() => {
          if (isMounted) setLoadingProps(false)
        })
      return () => {
        isMounted = false
      }
    } else {
      setErpProperties([])
      setSelectedProp('')
    }
  }, [ownerId, owners, propertyMode])

  const handleSubmit = async () => {
    if (!candidate) return
    setSubmitting(true)
    try {
      let finalPropId = selectedProp
      let title = ''
      let address = ''
      let rentValue = 0
      let finalOwnerId = ownerId

      let details: any = {}

      if (propertyMode === 'existing') {
        const p = erpProperties.find((x) => x.id === selectedProp)
        if (!p) throw new Error('Selecione um imóvel da lista.')
        title = p.title || p.nome || 'Imóvel ERP'
        address = p.address || p.endereco || 'Endereço ERP'
        rentValue = Number(p.rentValue || p.valor || 0)
      } else {
        if (!newPropData.ownerName || !newPropData.address)
          throw new Error('Preencha os dados do novo imóvel e proprietário (Endereço e Nome).')
        const { data: oData, error: oErr } = await supabase
          .from('owners')
          .insert({ code: 'MANUAL-' + Date.now(), full_name: newPropData.ownerName })
          .select()
          .single()
        if (oErr) throw oErr
        finalOwnerId = oData.id
        title = newPropData.address
        address = `${newPropData.address}, ${newPropData.neighborhood}, ${newPropData.city}`
          .replace(/,\s*,/g, ',')
          .replace(/^,\s*|,\s*$/g, '')
        rentValue = Number(newPropData.rentValue || 0)
        finalPropId = 'MANUAL-' + Date.now()
        details = {
          neighborhood: newPropData.neighborhood,
          city: newPropData.city,
          sheet: newPropData.sheet,
          iptu: newPropData.iptu,
          condo: newPropData.condo,
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
        await supabase.from('properties').update(propPayload).eq('id', finalPropId)
      } else {
        await supabase.from('properties').insert(propPayload)
      }

      await supabase
        .from('pre_registrations')
        .update({ status: 'Em Análise da Gerência' })
        .eq('id', candidate.id)

      mainStore.addAuditLog({
        propertyId: finalPropId,
        action: 'Processo de Locação Iniciado',
        user: 'Sistema',
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
              CPF/CNPJ: {candidate.cpf || candidate.cnpj || 'Não informado'}
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
                    {g.full_name} {g.cpf ? `(${g.cpf})` : ''}
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
                  <Label>Buscar Proprietário</Label>
                  <Select
                    value={ownerId}
                    onValueChange={(val) => {
                      setOwnerId(val)
                      setSelectedProp('')
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione na lista do ERP..." />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.fullName} ({o.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {ownerId && (
                  <div className="grid gap-2">
                    <Label>Imóveis Localizados</Label>
                    {loadingProps ? (
                      <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/20">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Consultando servidor...
                      </div>
                    ) : erpProperties.length > 0 ? (
                      <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                        {erpProperties.map((prop) => (
                          <Card
                            key={prop.id}
                            className={`p-3 cursor-pointer transition-colors border-2 ${selectedProp === prop.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                            onClick={() => setSelectedProp(prop.id)}
                          >
                            <p className="font-semibold text-sm">{prop.title || prop.nome}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {prop.address || prop.endereco || '-'}
                            </p>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 border rounded-lg bg-muted/20 text-center text-sm text-muted-foreground">
                        Nenhum imóvel localizado.
                      </div>
                    )}
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
                    type="number"
                    value={newPropData.rentValue}
                    onChange={(e) => updatePropData('rentValue', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>IPTU (R$)</Label>
                  <Input
                    type="number"
                    value={newPropData.iptu}
                    onChange={(e) => updatePropData('iptu', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condomínio (R$)</Label>
                  <Input
                    type="number"
                    value={newPropData.condo}
                    onChange={(e) => updatePropData('condo', e.target.value)}
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
                    onChange={(e) => updatePropData('spc', e.target.value)}
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
              (propertyMode === 'existing' && !selectedProp) ||
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
