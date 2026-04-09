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
  { id: 'TENANT_DOCUMENT', label: 'Documento de Locatário' },
  { id: 'GUARANTEE_DOCUMENT', label: 'Documentos de Garantia' },
  { id: 'CONTRACT_ACTIVE', label: 'Contrato Ativo (Importar Legado)' },
  { id: 'CONTRACT_TERMINATED', label: 'Contrato Encerrado' },
  { id: 'INSPECTION_MOVE_IN', label: 'Vistoria de Entrada' },
  { id: 'INSPECTION_MOVE_OUT', label: 'Vistoria de Saída' },
]

export function GedUpload({ preselectedPropertyId, preselectedType, onSuccess }: GedUploadProps) {
  const { settings, properties: mainProperties } = useMainStore()
  const { owners, tenants, properties: localProperties } = useEntitiesStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const [propertyId, setPropertyId] = useState(preselectedPropertyId || '')
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)
  const [propertyOpen, setPropertyOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [docType, setDocType] = useState(preselectedType || '')
  const [entityCode, setEntityCode] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [ownerOpen, setOwnerOpen] = useState(false)
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('')
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null)

  const [tenantOpen, setTenantOpen] = useState(false)
  const [tenantSearchQuery, setTenantSearchQuery] = useState('')
  const [selectedTenant, setSelectedTenant] = useState<any | null>(null)

  const [uploading, setUploading] = useState(false)
  const [sendToManager, setSendToManager] = useState(false)
  const [leaseNumber, setLeaseNumber] = useState('')
  const [folderNumber, setFolderNumber] = useState('')

  const hasSpAccess = useMemo(() => {
    if (!user) return false
    return settings.spIntegrationRoles?.includes(user.role) ?? false
  }, [user, settings.spIntegrationRoles])

  const [serverProperties, setServerProperties] = useState<any[]>([])
  const [loadingProperties, setLoadingProperties] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingProperties(true)
      try {
        const url = searchQuery
          ? `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(searchQuery)}`
          : 'http://192.168.10.225:9000/imoveis'

        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setServerProperties(Array.isArray(data) ? data : [])
        } else {
          setServerProperties([])
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis do servidor local', error)
        setServerProperties([])
      } finally {
        setLoadingProperties(false)
      }
    }

    const timer = setTimeout(() => {
      if (propertyOpen) {
        fetchProperties()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, propertyOpen])

  const localServerProperties = useMemo(() => {
    return serverProperties.slice(0, 50)
  }, [serverProperties])

  const localServerOwners = useMemo(() => {
    if (!owners) return []
    const lowerQuery = ownerSearchQuery.toLowerCase()
    return owners
      .filter(
        (o: any) =>
          !lowerQuery ||
          (o.code && o.code.toLowerCase().includes(lowerQuery)) ||
          (o.fullName && o.fullName.toLowerCase().includes(lowerQuery)) ||
          (o.name && o.name.toLowerCase().includes(lowerQuery)),
      )
      .slice(0, 50)
  }, [owners, ownerSearchQuery])

  const localServerTenants = useMemo(() => {
    if (!tenants) return []
    const lowerQuery = tenantSearchQuery.toLowerCase()
    return tenants
      .filter(
        (t: any) =>
          !lowerQuery ||
          (t.code && t.code.toLowerCase().includes(lowerQuery)) ||
          (t.fullName && t.fullName.toLowerCase().includes(lowerQuery)) ||
          (t.name && t.name.toLowerCase().includes(lowerQuery)),
      )
      .slice(0, 50)
  }, [tenants, tenantSearchQuery])

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
      let finalEntityName = ''
      let finalEntityCode = entityCode

      if (docType === 'OWNER_DOCUMENT' && selectedOwner) {
        finalEntityName = selectedOwner.name || selectedOwner.fullName || selectedOwner.title || ''
        finalEntityCode = selectedOwner.code || selectedOwner.id || ''
      } else if (docType === 'TENANT_DOCUMENT' && selectedTenant) {
        finalEntityName =
          selectedTenant.name || selectedTenant.fullName || selectedTenant.title || ''
        finalEntityCode = selectedTenant.code || selectedTenant.id || ''
      }

      const propId = selectedProperty.code || selectedProperty.id
      const propTitle =
        selectedProperty.proprietario ||
        selectedProperty.Proprietario ||
        selectedProperty.nomeProprietario ||
        selectedProperty.ownerName ||
        selectedProperty.title ||
        selectedProperty.address ||
        'Imóvel'

      // @ts-expect-error - folderNumber parameter might not be typed yet in m365Service
      const result = await m365Service.uploadStructuredDocument(
        file,
        file.name,
        docType,
        propId,
        propTitle,
        user?.name || 'Sistema',
        finalEntityCode,
        finalEntityName,
        leaseNumber,
        folderNumber,
      )

      await documentsStore.addDocument({
        propertyId: propId,
        name: file.name,
        category: docType,
        entityCode: finalEntityCode || undefined,
        entityName: finalEntityName || undefined,
        filePath: result?.path || undefined,
      })

      if (sendToManager) {
        mainStore.updateProperty(propId, { status: 'Análise Gerencial' })
      }

      toast({
        title: 'Upload Concluído',
        description: 'Documento enviado e classificado com sucesso no SharePoint.',
      })
      setFile(null)
      setEntityCode('')
      setSelectedOwner(null)
      setSelectedTenant(null)
      setLeaseNumber('')
      setFolderNumber('')
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
                  <strong className="mr-1">{selectedProperty.code || selectedProperty.id}</strong> -{' '}
                  {selectedProperty.proprietario ||
                    selectedProperty.Proprietario ||
                    selectedProperty.nomeProprietario ||
                    selectedProperty.ownerName ||
                    selectedProperty.title ||
                    selectedProperty.address}
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
                placeholder="Buscar imóvel pelo nome do proprietário..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>
                  {loadingProperties ? (
                    <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Buscando no servidor local...
                    </div>
                  ) : (
                    'Nenhum imóvel encontrado no servidor local.'
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {localServerProperties.map((p: any) => (
                    <CommandItem
                      key={p.code || p.id}
                      value={p.code || p.id}
                      onSelect={() => {
                        setPropertyId(p.code || p.id)
                        setSelectedProperty(p)
                        setPropertyOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          propertyId === (p.code || p.id) ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="truncate">
                        <strong className="mr-1">{p.code || p.id}</strong> -{' '}
                        {p.proprietario ||
                          p.Proprietario ||
                          p.nomeProprietario ||
                          p.ownerName ||
                          p.title ||
                          p.address}
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
          <Label>Proprietário (Servidor Local)</Label>
          <Popover open={ownerOpen} onOpenChange={setOwnerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={ownerOpen}
                disabled={!hasSpAccess}
                className="w-full justify-between font-normal"
              >
                {selectedOwner ? (
                  <span className="truncate">
                    <strong className="mr-1">{selectedOwner.code || selectedOwner.id}</strong> -{' '}
                    {selectedOwner.name || selectedOwner.fullName || selectedOwner.title}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Buscar proprietário no servidor...</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Buscar proprietário..."
                  value={ownerSearchQuery}
                  onValueChange={setOwnerSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Nenhum proprietário encontrado no servidor local.</CommandEmpty>
                  <CommandGroup>
                    {localServerOwners.map((o) => (
                      <CommandItem
                        key={o.id || o.code}
                        value={o.id || o.code}
                        onSelect={() => {
                          setSelectedOwner(o)
                          setEntityCode(o.code || o.id)
                          setOwnerOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedOwner?.id === o.id || selectedOwner?.code === o.code
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <span className="truncate">
                          <strong className="mr-1">{o.code || o.id}</strong> -{' '}
                          {o.name || o.fullName || o.title}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {docType === 'TENANT_DOCUMENT' && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Locatário (Servidor Local)</Label>
          <Popover open={tenantOpen} onOpenChange={setTenantOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={tenantOpen}
                disabled={!hasSpAccess}
                className="w-full justify-between font-normal"
              >
                {selectedTenant ? (
                  <span className="truncate">
                    <strong className="mr-1">{selectedTenant.code || selectedTenant.id}</strong> -{' '}
                    {selectedTenant.name || selectedTenant.fullName || selectedTenant.title}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Buscar locatário no servidor...</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Buscar locatário..."
                  value={tenantSearchQuery}
                  onValueChange={setTenantSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Nenhum locatário encontrado no servidor local.</CommandEmpty>
                  <CommandGroup>
                    {localServerTenants.map((t) => (
                      <CommandItem
                        key={t.id || t.code}
                        value={t.id || t.code}
                        onSelect={() => {
                          setSelectedTenant(t)
                          setEntityCode(t.code || t.id)
                          setTenantOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedTenant?.id === t.id || selectedTenant?.code === t.code
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <span className="truncate">
                          <strong className="mr-1">{t.code || t.id}</strong> -{' '}
                          {t.name || t.fullName || t.title}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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

      {['CONTRACT_ACTIVE', 'CONTRACT_TERMINATED'].includes(docType) && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Número da Pasta</Label>
          <Input
            value={folderNumber}
            onChange={(e) => setFolderNumber(e.target.value)}
            placeholder="Ex: 00123"
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
          (docType === 'OWNER_DOCUMENT' && !selectedOwner) ||
          (docType === 'TENANT_DOCUMENT' && !selectedTenant) ||
          (['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT'].includes(docType) && !leaseNumber) ||
          (['CONTRACT_ACTIVE', 'CONTRACT_TERMINATED'].includes(docType) && !folderNumber)
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
