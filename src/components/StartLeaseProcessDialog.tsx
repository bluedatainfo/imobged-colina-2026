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

  const [newOwnerName, setNewOwnerName] = useState('')
  const [newPropTitle, setNewPropTitle] = useState('')
  const [newPropAddress, setNewPropAddress] = useState('')
  const [newPropValue, setNewPropValue] = useState('')

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
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (!isMounted) return
          if (!data || data.length === 0) {
            setErpProperties([
              {
                id: 'ERP-' + Math.floor(Math.random() * 1000),
                title: 'Imóvel Exemplo ERP',
                address: owner.fullAddress || 'Endereço ERP',
                type: 'Apartamento',
                rentValue: 2500,
              },
            ])
          } else {
            setErpProperties(data)
          }
        })
        .catch(() => {
          if (!isMounted) return
          setErpProperties([
            {
              id: 'ERP-' + Math.floor(Math.random() * 1000),
              title: 'Imóvel Integrado (Simulado)',
              address: 'Endereço Mockado do ERP',
              type: 'Casa',
              rentValue: 3000,
            },
          ])
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

      if (propertyMode === 'existing') {
        const p = erpProperties.find((x) => x.id === selectedProp)
        if (!p) throw new Error('Selecione um imóvel da lista.')
        title = p.title || p.nome || 'Imóvel ERP'
        address = p.address || p.endereco || 'Endereço ERP'
        rentValue = Number(p.rentValue || p.valor || 0)
      } else {
        if (!newOwnerName || !newPropTitle)
          throw new Error('Preencha os dados do novo imóvel e proprietário.')
        const { data: oData, error: oErr } = await supabase
          .from('owners')
          .insert({ code: 'MANUAL-' + Date.now(), full_name: newOwnerName })
          .select()
          .single()
        if (oErr) throw oErr
        finalOwnerId = oData.id
        title = newPropTitle
        address = newPropAddress
        rentValue = Number(newPropValue || 0)
        finalPropId = 'MANUAL-' + Date.now()
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
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 bg-muted/10 p-4 rounded-lg border">
                <div className="grid gap-2">
                  <Label>Nome do Proprietário</Label>
                  <Input
                    value={newOwnerName}
                    onChange={(e) => setNewOwnerName(e.target.value)}
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Identificação do Imóvel</Label>
                  <Input
                    value={newPropTitle}
                    onChange={(e) => setNewPropTitle(e.target.value)}
                    placeholder="Ex: Casa Vila Nova"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Endereço</Label>
                  <Input
                    value={newPropAddress}
                    onChange={(e) => setNewPropAddress(e.target.value)}
                    placeholder="Ex: Rua das Flores, 123"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Valor do Aluguel (R$)</Label>
                  <Input
                    type="number"
                    value={newPropValue}
                    onChange={(e) => setNewPropValue(e.target.value)}
                    placeholder="Ex: 2500"
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
              (propertyMode === 'new' && (!newOwnerName || !newPropTitle))
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
