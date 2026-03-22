import { useState, useMemo } from 'react'
import { FilePlus, Target, Users, ShieldCheck, Home } from 'lucide-react'
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
import useTemplatesStore from '@/stores/templates'
import { m365Service } from '@/lib/m365'

export function ContractWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const store = useMainStore()
  const { templates } = useTemplatesStore()

  const [purpose, setPurpose] = useState('tenant_contract')
  const [propertyId, setPropertyId] = useState('')
  const [guaranteeType, setGuaranteeType] = useState('N/A')
  const [templateName, setTemplateName] = useState('')
  const [tenantName, setTenantName] = useState('')

  const selectedProperty = useMemo(() => {
    return store.properties.find((p) => p.id === propertyId)
  }, [propertyId, store.properties])

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (t.category !== purpose) return false

      if (purpose === 'tenant_contract' && selectedProperty) {
        // If it's a tenant contract, filter by property type and guarantee type
        const typeMatches = t.propertyType === 'Todos' || t.propertyType === selectedProperty.type
        const guaranteeMatches = guaranteeType === 'N/A' || t.guaranteeType === guaranteeType
        return typeMatches && guaranteeMatches
      }
      return true
    })
  }, [templates, purpose, selectedProperty, guaranteeType])

  const handleCreate = () => {
    if (!templateName || !propertyId || !tenantName) return

    const docName = `Rascunho_${tenantName.replace(/\s+/g, '_')}_${propertyId}.docx`
    contractsStore.addContract({
      propertyId,
      tenantName,
      template: templateName,
      status: 'Rascunho',
      documentName: docName,
    })

    m365Service.sendTeamsMessage(
      store.sharepoint.teamsWebhookUrl,
      `Novo Rascunho Criado: ${templateName} para o imóvel ID ${propertyId}. Relacionado a: ${tenantName}.`,
    )
    mainStore.addAuditLog({
      propertyId,
      action: 'Minuta Gerada via Wizard (SharePoint Templates)',
      user: 'Equipe de Contratos',
      details: `Categoria: ${purpose === 'tenant_contract' ? 'Locação' : 'Onboarding Proprietário'}`,
    })

    setPurpose('tenant_contract')
    setTemplateName('')
    setPropertyId('')
    setGuaranteeType('N/A')
    setTenantName('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-primary" /> Novo Contrato Inteligente
          </DialogTitle>
          <DialogDescription>
            O sistema filtrará os modelos de acordo com o imóvel e a finalidade selecionada.
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
                    ID: {p.id} - {p.title} ({p.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" /> Finalidade do Documento
            </Label>
            <Select
              value={purpose}
              onValueChange={(v) => {
                setPurpose(v)
                setTemplateName('')
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tenant_contract">Contrato de Locação (Inquilino)</SelectItem>
                <SelectItem value="owner_onboarding">Documentos Iniciais (Proprietário)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {purpose === 'tenant_contract' && (
            <div className="grid gap-2 animate-fade-in">
              <Label className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" /> Tipo de Garantia
              </Label>
              <Select
                value={guaranteeType}
                onValueChange={(v) => {
                  setGuaranteeType(v)
                  setTemplateName('')
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a garantia..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="N/A">Não se aplica / Todas</SelectItem>
                  <SelectItem value="Caução">Caução</SelectItem>
                  <SelectItem value="Fiador">Fiador</SelectItem>
                  <SelectItem value="Seguro Fiança">Seguro Fiança</SelectItem>
                  <SelectItem value="Título de Capitalização">Título de Capitalização</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <FilePlus className="w-4 h-4 text-muted-foreground" /> Modelo de Documento (Sugerido)
            </Label>
            <Select value={templateName} onValueChange={setTemplateName} disabled={!propertyId}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !propertyId
                      ? 'Selecione o imóvel primeiro'
                      : 'Selecione um template filtrado...'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredTemplates.length === 0 ? (
                  <SelectItem value="_empty" disabled>
                    Nenhum modelo encontrado para esta combinação
                  </SelectItem>
                ) : (
                  filteredTemplates.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" /> Nome do Responsável
              (Locatário/Proprietário)
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
          <Button onClick={handleCreate} disabled={!templateName || !propertyId || !tenantName}>
            Gerar Rascunho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
