import { useState, useMemo, useEffect } from 'react'
import { UploadCloud, Loader2, AlertCircle, Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { m365Service } from '@/lib/m365'
import useMainStore, { mainStore } from '@/stores/main'
import useEntitiesStore from '@/stores/entities'
import { documentsStore } from '@/stores/documents'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface GedUploadProps {
  preselectedPropertyId?: string
  preselectedType?: string
  onSuccess?: () => void
}

const DOCUMENT_TYPES = [
  { id: 'OWNER_DOCUMENT', label: 'Documento de Proprietário' },
  { id: 'TENANT_DOCUMENT', label: 'Documento de Inquilino' },
  { id: 'GUARANTEE_DOCUMENT', label: 'Documentos de Garantia' },
  { id: 'CONTRACT_ACTIVE', label: 'Contrato Ativo (Importar Legado)' },
  { id: 'CONTRACT_TERMINATED', label: 'Contrato Encerrado' },
  { id: 'INSPECTION_MOVE_IN', label: 'Vistoria de Entrada' },
  { id: 'INSPECTION_MOVE_OUT', label: 'Vistoria de Saída' },
]

export function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }: GedUploadProps) {
  const { settings } = useMainStore()
  const { owners, tenants } = useEntitiesStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const [propertyId, setPropertyId] = useState(preselectedPropertyId || '')
  const [selectedProperty, setSelectedProperty] = useState<{ id: string; title: string } | null>(
    null,
  )
  const [propertyOpen, setPropertyOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [localServerProperties, setLocalServerProperties] = useState<
    { id: string; title: string }[]
  >([])
  const [loadingProperties, setLoadingProperties] = useState(false)

  const [docType, setDocType] = useState(preselectedType || '')
  const [entityCode, setEntityCode] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [sendToManager, setSendToManager] = useState(false)
  const [leaseNumber, setLeaseNumber] = useState('')

  const hasSpAccess = useMemo(() => {
    if (!user) return false
    return settings.spIntegrationRoles?.includes(user.role) ?? false
  }, [user, settings.spIntegrationRoles])

  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingProperties(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const res = await fetch(
          `http://192.168.10.225/api/properties?q=${encodeURIComponent(searchQuery)}`,
          {
            signal: controller.signal,
          },
        )
        clearTimeout(timeoutId)

        if (res.ok) {
          const data = await res.json()
          setLocalServerProperties(data)
        } else {
          setLocalServerProperties([])
        }
      } catch (err) {
        console.error('Erro ao buscar imóveis do servidor local', err)
        setLocalServerProperties([])
      } finally {
        setLoadingProperties(false)
      }
    }

    const timer = setTimeout(() => {
      if (propertyOpen) {
        fetchProperties()
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery, propertyOpen])

  useEffect(() => {
    if (preselectedPropertyId && !selectedProperty) {
      setSelectedProperty({ id: preselectedPropertyId, title: 'Imóvel Selecionado' })
    }
  }, [preselectedPropertyId, selectedProperty])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !propertyId || !docType || !hasSpAccess || !selectedProperty) return

    setUploading(true)
    try {
      let entityName = ''
      if (docType === 'OWNER_DOCUMENT') {
        entityName = owners.find((o) => o.code === entityCode)?.fullName || ''
      } else if (docType === 'TENANT_DOCUMENT') {
        entityName = tenants.find((t) => t.code === entityCode)?.fullName || ''
      }

      const result = await m365Service.uploadStructuredDocument(
        file,
        file.name,
        docType,
        selectedProperty.id,
        selectedProperty.title,
        user?.name || 'Sistema',
        entityCode,
        entityName,
        leaseNumber,
      )

      await documentsStore.addDocument({
        propertyId: selectedProperty.id,
        name: file.name,
        category: docType,
        entityCode: entityCode || undefined,
        entityName: entityName || undefined,
        filePath: result?.path || undefined,
      })

      if (sendToManager) {
        mainStore.updateProperty(selectedProperty.id, { status: 'Análise Gerencial' })
      }

      toast({
        title: 'Upload Concluído',
        description: 'Documento enviado e classificado com sucesso no SharePoint.',
      })
      setFile(null)
      setEntityCode('')
      setLeaseNumber('')
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      if (onSuccess) onSuccess()
    } catch (e: any) {
      // Error handled in m365Service
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 flex-1 flex flex-col">
      {!hasSpAccess && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acesso Negado</AlertTitle>
          <AlertDescription>
            Seu perfil ({user?.role}) não possui permissão para realizar uploads no SharePoint.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label>Imóvel Relacionado</Label>
        <Popover open={propertyOpen} onOpenChange={setPropertyOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={propertyOpen}
              disabled={!!preselectedPropertyId || !hasSpAccess}
              className="w-full justify-between font-normal"
            >
              {selectedProperty ? (
                <span className="truncate">
                  <strong className="mr-1">{selectedProperty.id}</strong> - {selectedProperty.title}
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Selecione ou busque o imóvel no servidor...
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Buscar por ID ou título..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>
                  {loadingProperties
                    ? 'Buscando imóveis no servidor...'
                    : 'Nenhum imóvel encontrado.'}
                </CommandEmpty>
                <CommandGroup>
                  {localServerProperties.map((p) => (
                    <CommandItem
                      key={p.id}
                      value={p.id}
                      onSelect={() => {
                        setPropertyId(p.id)
                        setSelectedProperty(p)
                        setPropertyOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          propertyId === p.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="truncate">
                        <strong className="mr-1">{p.id}</strong> - {p.title}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-2">
        <Label>Categoria do Documento</Label>
        <Select
          value={docType}
          onValueChange={setDocType}
          disabled={!!preselectedType || !hasSpAccess}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria..." />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {docType === 'OWNER_DOCUMENT' && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Código do Proprietário</Label>
          <Select value={entityCode} onValueChange={setEntityCode} disabled={!hasSpAccess}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o proprietário..." />
            </SelectTrigger>
            <SelectContent>
              {owners.map((o) => (
                <SelectItem key={o.code} value={o.code}>
                  {o.fullName} ({o.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {docType === 'TENANT_DOCUMENT' && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Código do Inquilino</Label>
          <Select value={entityCode} onValueChange={setEntityCode} disabled={!hasSpAccess}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o inquilino..." />
            </SelectTrigger>
            <SelectContent>
              {tenants.map((t) => (
                <SelectItem key={t.code} value={t.code}>
                  {t.fullName} ({t.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT'].includes(docType) && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Número da Locação</Label>
          <Input
            value={leaseNumber}
            onChange={(e) => setLeaseNumber(e.target.value)}
            placeholder="Ex: LOC-12345"
            disabled={!hasSpAccess}
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label>Arquivo Selecionado</Label>
        <Input id="file-upload" type="file" onChange={handleFileChange} disabled={!hasSpAccess} />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium cursor-pointer" htmlFor="manager-approval-switch">
            Análise Gerencial
          </Label>
          <p className="text-xs text-muted-foreground">
            Mover imóvel para o Hub de Validação após concluir
          </p>
        </div>
        <Switch
          id="manager-approval-switch"
          checked={sendToManager}
          onCheckedChange={setSendToManager}
          disabled={!hasSpAccess || !propertyId}
        />
      </div>

      <Button
        className="w-full mt-auto gap-2"
        onClick={handleUpload}
        disabled={
          !file ||
          !propertyId ||
          !docType ||
          uploading ||
          !hasSpAccess ||
          (docType === 'OWNER_DOCUMENT' && !entityCode) ||
          (docType === 'TENANT_DOCUMENT' && !entityCode) ||
          (['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT'].includes(docType) && !leaseNumber)
        }
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="h-4 w-4" />
        )}
        Processar e Enviar (GED)
      </Button>
    </div>
  )
}
