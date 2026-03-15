import { useState } from 'react'
import { FilePlus, Target, Users } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMainStore, { mainStore } from '@/stores/main'
import useContractsStore, { contractsStore } from '@/stores/contracts'
import { m365Service } from '@/lib/m365'

const TEMPLATES = [
  'Apartamento Padrão (Caução)',
  'Apartamento (Seguro Fiança)',
  'Comercial (Fiador)',
  'Residencial (Fiador)',
]

export function ContractWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const store = useMainStore()
  const [template, setTemplate] = useState('')
  const [propertyId, setPropertyId] = useState('')
  const [tenantName, setTenantName] = useState('')

  const handleCreate = () => {
    if (!template || !propertyId || !tenantName) return

    const docName = `Rascunho_${tenantName.replace(/\s+/g, '_')}_${propertyId}.docx`
    contractsStore.addContract({
      propertyId,
      tenantName,
      template,
      status: 'Rascunho',
      documentName: docName,
    })

    m365Service.sendTeamsMessage(
      store.sharepoint.teamsWebhookUrl,
      `Novo Rascunho Criado: ${template} para o imóvel ID ${propertyId}. Inquilino: ${tenantName}.`,
    )
    mainStore.addAuditLog({
      propertyId,
      action: 'Minuta Gerada via Wizard (SharePoint Templates)',
      user: 'Equipe de Contratos',
    })

    setTemplate('')
    setPropertyId('')
    setTenantName('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-primary" /> Novo Contrato (Wizard)
          </DialogTitle>
          <DialogDescription>
            Selecione o modelo hospedado no SharePoint para gerar um rascunho dinâmico (DOCX).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" /> Imóvel Referência
            </Label>
            <Select value={propertyId} onValueChange={setPropertyId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o imóvel..." />
              </SelectTrigger>
              <SelectContent>
                {store.properties.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    ID: {p.id} - {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <FilePlus className="w-4 h-4 text-muted-foreground" /> Modelo de Documento (Template)
            </Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um template da biblioteca..." />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" /> Nome do Locatário Principal
            </Label>
            <Input
              placeholder="Ex: Carlos Eduardo da Silva"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={!template || !propertyId || !tenantName}>
            Gerar Rascunho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
