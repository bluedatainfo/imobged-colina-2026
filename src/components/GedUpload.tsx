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

  const [ownerOpen, setOwnerOpen] = useState(false)
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('')
  const [localServerOwners, setLocalServerOwners] = useState<any[]>([])
  const [loadingOwners, setLoadingOwners] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null)

  const [tenantOpen, setTenantOpen] = useState(false)
  const [tenantSearchQuery, setTenantSearchQuery] = useState('')
  const [localServerTenants, setLocalServerTenants] = useState<any[]>([])
  const [loadingTenants, setLoadingTenants] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<any | null>(null)
  const [uploading, setUploading] = useState(false)
  const [sendToManager, setSendToManager] = useState(false)
  const [leaseNumber, setLeaseNumber] = useState('')
  const [folderNumber, setFolderNumber] = useState('')

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
    const fetchOwners = async () => {
      setLoadingOwners(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(
          `http://192.168.10.225/api/owners?q=${encodeURIComponent(ownerSearchQuery)}`,
          { signal: controller.signal },
        )
        clearTimeout(timeoutId)
        if (res.ok) {
          const data = await res.json()
          setLocalServerOwners(data)
        } else {
          setLocalServerOwners([])
        }
      } catch (err) {
        console.error('Erro ao buscar proprietários', err)
        setLocalServerOwners([])
      } finally {
        setLoadingOwners(false)
      }
    }
    const timer = setTimeout(() => {
      if (ownerOpen) fetchOwners()
    }, 400)
    return () => clearTimeout(timer)
  }, [ownerSearchQuery, ownerOpen])

  useEffect(() => {
    const fetchTenants = async () => {
      setLoadingTenants(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(
          `http://192.168.10.225/api/tenants?q=${encodeURIComponent(tenantSearchQuery)}`,
          { signal: controller.signal },
        )
        clearTimeout(timeoutId)
        if (res.ok) {
          const data = await res.json()
          setLocalServerTenants(data)
        } else {
          setLocalServerTenants([])
        }
      } catch (err) {
        console.error('Erro ao buscar locatários', err)
        setLocalServerTenants([])
      } finally {
        setLoadingTenants(false)
      }
    }
    const timer = setTimeout(() => {
      if (tenantOpen) fetchTenants()
    }, 400)
    return () => clearTimeout(timer)
  }, [tenantSearchQuery, tenantOpen])

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

      // @ts-expect-error - folderNumber parameter might not be typed yet in m365Service
      const result = await m365Service.uploadStructuredDocument(
        file,
        file.name,
        docType,
        selectedProperty.id,
        selectedProperty.title,
        user?.name || 'Sistema',
        finalEntityCode,
        finalEntityName,
        leaseNumber,
        folderNumber,
      )

      await documentsStore.addDocument({
        propertyId: selectedProperty.id,
        name: file.name,
        category: docType,
        entityCode: finalEntityCode || undefined,
        entityName: finalEntityName || undefined,
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
                  <CommandEmpty>
                    {loadingOwners ? 'Buscando no servidor...' : 'Nenhum proprietário encontrado.'}
                  </CommandEmpty>
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
                  <CommandEmpty>
                    {loadingTenants ? 'Buscando no servidor...' : 'Nenhum locatário encontrado.'}
                  </CommandEmpty>
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
