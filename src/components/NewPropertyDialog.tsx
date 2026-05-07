import { useState, useEffect } from 'react'
import { Home, MapPin, Loader2, DownloadCloud, Search, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useEntitiesStore from '@/stores/entities'
import { useToast } from '@/hooks/use-toast'
import { mainStore } from '@/stores/main'
import { supabase } from '@/lib/supabase/client'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

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

export function NewPropertyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const { owners } = useEntitiesStore()
  const { user } = useAuth()

  const [openERP, setOpenERP] = useState(false)
  const [searchERP, setSearchERP] = useState('')
  const debouncedSearchERP = useDebounce(searchERP, 400)
  const [erpOptions, setErpOptions] = useState<any[]>([])
  const [loadingERP, setLoadingERP] = useState(false)
  const [selectedERPProperty, setSelectedERPProperty] = useState<any | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!debouncedSearchERP.trim()) {
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
        if (!res.ok) throw new Error('Falha na resposta do servidor local')
        const data = await res.json()

        if (isMounted) {
          const dataArray = Array.isArray(data) ? data : [data]
          setErpOptions(dataArray.filter((item) => item && item.id))
        }
      } catch (err) {
        if (isMounted) setErpOptions([])
      } finally {
        if (isMounted) setLoadingERP(false)
      }
    }

    fetchOptions()
    return () => {
      isMounted = false
    }
  }, [debouncedSearchERP])

  const handleSave = async () => {
    if (!selectedERPProperty) return
    setSaving(true)

    try {
      const p = selectedERPProperty
      const erpOwnerName = getOwnerName(p)
      let finalOwnerId = ''

      const existingOwner = owners.find(
        (o) => o.fullName.toLowerCase() === erpOwnerName.toLowerCase() || o.code === erpOwnerName,
      )

      if (existingOwner) {
        finalOwnerId = existingOwner.id
      } else {
        const { data: oData, error: oErr } = await supabase
          .from('owners')
          .insert({ code: 'ERP-' + Date.now(), full_name: erpOwnerName })
          .select()
          .single()
        if (oErr) throw oErr
        finalOwnerId = oData.id
      }

      mainStore.addProperty({
        id: String(p.id),
        title: p.title || p.nome || p.endereco || 'Imóvel ERP',
        address: getAddress(p),
        type: p.type || p.tipo || 'Residencial',
        rentValue: Number(p.rentValue || p.valor || 0),
        ownerId: finalOwnerId,
        status: 'Pendente/Rascunho',
      })

      mainStore.addAuditLog({
        propertyId: String(p.id),
        action: 'Imóvel Importado do ERP',
        user: user?.name || 'Sistema',
        details: 'Imóvel importado para o GED no estágio Pendente/Rascunho.',
      })

      toast({
        title: 'Imóvel Importado',
        description: 'O imóvel foi vinculado ao GED com sucesso.',
      })

      setSelectedERPProperty(null)
      setSearchERP('')
      onClose()
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao importar',
        description: err.message,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && !saving && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-primary" /> Importar Imóvel (ERP Local)
          </DialogTitle>
          <DialogDescription>
            Busque pelo nome do proprietário ou dados do imóvel para localizá-lo no sistema interno
            e importá-lo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" /> Buscar no ERP
            </Label>
            <Popover open={openERP} onOpenChange={setOpenERP}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openERP}
                  className="justify-between w-full font-normal h-12"
                >
                  <span className={cn('truncate', !selectedERPProperty && 'text-muted-foreground')}>
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
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
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
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
              <Label className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" /> Imóvel Selecionado
              </Label>
              <div className="p-4 border rounded-lg bg-muted/20 space-y-2">
                <p className="font-medium text-sm">Endereço:</p>
                <p className="text-sm text-foreground">{getAddress(selectedERPProperty)}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Proprietário: {getOwnerName(selectedERPProperty)}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> 192.168.10.225:9000
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!selectedERPProperty || saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Importar ao GED
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
