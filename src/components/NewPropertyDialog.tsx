import { useState, useEffect } from 'react'
import { Home, MapPin, Tag, Loader2, DownloadCloud, Search, ExternalLink } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import useMainStore, { mainStore } from '@/stores/main'
import useEntitiesStore from '@/stores/entities'
import { useToast } from '@/hooks/use-toast'

export function NewPropertyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const { owners } = useEntitiesStore()

  const [ownerId, setOwnerId] = useState('')
  const [loadingProps, setLoadingProps] = useState(false)
  const [erpProperties, setErpProperties] = useState<any[]>([])
  const [selectedProp, setSelectedProp] = useState<string>('')

  useEffect(() => {
    if (!ownerId) {
      setErpProperties([])
      return
    }
    const owner = owners.find((o) => o.id === ownerId)
    if (!owner) return

    let isMounted = true
    setLoadingProps(true)

    // Fetch from local ERP: http://192.168.10.225:9000/imoveis?name={nome proprietario}
    fetch(`http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(owner.fullName)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha na resposta do servidor local')
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) {
            setErpProperties(data)
          } else {
            setErpProperties([])
            toast({
              title: 'Aviso',
              description: 'Nenhum imóvel encontrado no ERP para este proprietário.',
            })
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setErpProperties([])
          toast({
            variant: 'destructive',
            title: 'Erro de conexão',
            description: 'Não foi possível conectar ao servidor ERP (192.168.10.225).',
          })
        }
      })
      .finally(() => {
        if (isMounted) setLoadingProps(false)
      })

    return () => {
      isMounted = false
    }
  }, [ownerId, owners])

  const handleSave = () => {
    const propToImport = erpProperties.find((p) => p.id === selectedProp)
    if (!propToImport || !ownerId) return

    mainStore.addProperty({
      title: propToImport.title || propToImport.nome || 'Imóvel ERP',
      address: propToImport.address || propToImport.endereco || 'Endereço ERP',
      type: propToImport.type || propToImport.tipo || 'Apartamento',
      rentValue: Number(propToImport.rentValue || propToImport.valor || 0),
      ownerId,
    })

    mainStore.addAuditLog({
      propertyId: 'NOVO',
      action: 'Imóvel Importado do ERP',
      user: 'Integração Sistema Local',
      details: 'Imóvel importado para o GED no estágio Pendente/Rascunho.',
    })

    toast({
      title: 'Imóvel Importado',
      description: 'O imóvel foi vinculado ao GED com sucesso.',
    })

    setOwnerId('')
    setSelectedProp('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-primary" /> Importar Imóvel (ERP Local)
          </DialogTitle>
          <DialogDescription>
            Selecione o proprietário para listar os imóveis cadastrados no sistema interno da
            imobiliária.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" /> 1. Buscar Proprietário
            </Label>
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
                {owners.length === 0 ? (
                  <SelectItem value="_empty" disabled>
                    Nenhum proprietário sincronizado
                  </SelectItem>
                ) : (
                  owners.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.fullName} ({o.code})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {ownerId && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
              <Label className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" /> 2. Imóveis Localizados no ERP
              </Label>

              {loadingProps ? (
                <div className="flex items-center justify-center p-6 border rounded-lg bg-muted/20">
                  <Loader2 className="w-5 h-5 animate-spin text-primary mr-2" /> Consultando
                  192.168.10.225...
                </div>
              ) : erpProperties.length > 0 ? (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {erpProperties.map((prop) => (
                    <Card
                      key={prop.id}
                      className={`p-3 cursor-pointer transition-colors border-2 ${selectedProp === prop.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                      onClick={() => setSelectedProp(prop.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm">
                            {prop.title || prop.nome || 'Imóvel ERP'}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {prop.address || prop.endereco || '-'}
                          </p>
                        </div>
                        <Tag className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 border rounded-lg bg-muted/20 text-center text-sm text-muted-foreground">
                  Nenhum imóvel localizado para este proprietário.
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> 192.168.10.225:9000
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!selectedProp}>
              Importar ao GED
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
