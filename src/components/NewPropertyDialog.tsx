import { useState } from 'react'
import { Home, Sparkles, MapPin, Tag, Loader2, DollarSign } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMainStore, { mainStore } from '@/stores/main'
import { useToast } from '@/hooks/use-toast'

export function NewPropertyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [type, setType] = useState('Residencial')
  const [rentValue, setRentValue] = useState('')

  const [aiLoading, setAiLoading] = useState(false)
  const [aiJustification, setAiJustification] = useState('')

  const handleAISuggestion = () => {
    if (!address || !type) {
      toast({
        variant: 'destructive',
        title: 'Dados Insuficientes',
        description: 'Preencha o endereço e o tipo do imóvel para a IA sugerir um valor.',
      })
      return
    }

    setAiLoading(true)
    setAiJustification('')

    // Simulate AI connecting to SharePoint sites to calculate average
    setTimeout(() => {
      setAiLoading(false)
      const mockValue = type === 'Comercial' ? '4500' : '2800'
      setRentValue(mockValue)
      setAiJustification(
        `Valor calculado cruzando dados dos Sites "Vendas" e "Locação". Média de ${type === 'Comercial' ? '12' : '24'} imóveis recentes na região do endereço informado.`,
      )
      toast({
        title: 'Sugestão de Preço Concluída',
        description: 'A IA do SharePoint analisou o histórico de contratos.',
      })
    }, 2000)
  }

  const handleSave = () => {
    if (!title || !address || !rentValue) return

    mainStore.addProperty({
      title,
      address,
      type,
      rentValue: Number(rentValue),
    })

    mainStore.addAuditLog({
      propertyId: 'NOVO',
      action: 'Nova Captação Registrada',
      user: 'Equipe de Captação',
      details: 'Imóvel criado no estágio Pendente/Rascunho.',
    })

    toast({
      title: 'Captação Registrada',
      description: 'O imóvel foi adicionado com sucesso à fila.',
    })

    // Reset and close
    setTitle('')
    setAddress('')
    setType('Residencial')
    setRentValue('')
    setAiJustification('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" /> Nova Captação
          </DialogTitle>
          <DialogDescription>
            Insira os dados do novo imóvel. Use a Inteligência Artificial para estimar o valor ideal
            do aluguel.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Título / Referência</Label>
            <Input
              placeholder="Ex: Apartamento Vista Mar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" /> Endereço Completo
            </Label>
            <Input
              placeholder="Ex: Av. Atlântica, 1000 - Apto 502"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" /> Tipo do Imóvel
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residencial">Residencial</SelectItem>
                <SelectItem value="Comercial">Comercial</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 p-4 bg-muted/30 rounded-lg border">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" /> Valor do Aluguel (R$)
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Ex: 3500"
                value={rentValue}
                onChange={(e) => setRentValue(e.target.value)}
                className="flex-1 font-mono text-lg"
              />
              <Button
                variant="secondary"
                onClick={handleAISuggestion}
                disabled={aiLoading}
                className="shrink-0 gap-2 font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200"
              >
                {aiLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Sugerir via IA
              </Button>
            </div>
            {aiJustification && (
              <p className="text-xs text-purple-800 bg-purple-50 p-2 rounded mt-2 animate-fade-in">
                <strong>Justificativa IA:</strong> {aiJustification}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!title || !address || !rentValue}>
            Salvar Imóvel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
