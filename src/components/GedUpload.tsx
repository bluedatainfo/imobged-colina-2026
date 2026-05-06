import { useState, useMemo, useEffect } from 'react'
import {
  UploadCloud,
  Loader2,
  AlertCircle,
  Check,
  ChevronsUpDown,
  MapPin,
  Printer,
} from 'lucide-react'
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
import { supabase } from '@/lib/supabase/client'

interface GedUploadProps {
  preselectedPropertyId?: string
  preselectedType?: string
  onSuccess?: () => void
  mode?: 'file' | 'scanner'
}

const DOCUMENT_TYPES = [
  { id: 'OWNER_DOCUMENT', label: 'Documento de Proprietário' },
  { id: 'TENANT_DOCUMENT', label: 'Documento de Locatário' },
  { id: 'GUARANTEE_DOCUMENT', label: 'Documentos de Garantia' },
  { id: 'CONTRACT_ACTIVE', label: 'Imovel - Documentação (Ativo)' },
  { id: 'INSPECTION_MOVE_IN', label: 'Imovel - Vistoria de Entrada (Ativo)' },
  { id: 'INSPECTION_MOVE_OUT', label: 'Imovel - Vistoria de Saida (Ativo)' },
  { id: 'LEASES', label: 'Imovel - Locações' },
  { id: 'CONTRACT_TERMINATED', label: 'Imovel - Documentação (Encerrado)' },
]

const getOwnerName = (property: any) => {
  if (!property) return 'Não informado'
  if (property.proprietario) return property.proprietario
  if ((property as any).Proprietario) return (property as any).Proprietario
  if (property.nomeProprietario) return property.nomeProprietario
  if (property.proprietario_nome) return property.proprietario_nome
  if (property.cliente) return property.cliente
  if ((property as any).ownerName) return (property as any).ownerName
  if ((property as any).title) return (property as any).title
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

export function GedUpload({
  preselectedPropertyId,
  preselectedType,
  onSuccess,
  mode = 'file',
}: GedUploadProps) {
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
  const [scanningStatus, setScanningStatus] = useState('')
  const [sendToManager, setSendToManager] = useState(false)
  const [leaseNumber, setLeaseNumber] = useState('')
  const [folderNumber, setFolderNumber] = useState('')

  const [dpi, setDpi] = useState('300')
  const [colorMode, setColorMode] = useState('color')
  const [duplex, setDuplex] = useState(true)
  const [customFileName, setCustomFileName] = useState(`Scan${Math.floor(Math.random() * 1000)}`)

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
        const isNumeric = /^\d+$/.test(searchQuery.trim())
        const url = searchQuery
          ? isNumeric
            ? `http://192.168.10.225:9000/imoveis?id=${encodeURIComponent(searchQuery.trim())}`
            : `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(searchQuery.trim())}`
          : 'http://192.168.10.225:9000/imoveis'

        let response = await fetch(url)

        // Fallback caso a API use 'code' no lugar de 'id' para buscas numéricas
        if (isNumeric && response.ok) {
          const clonedResponse = response.clone()
          const data = await clonedResponse.json()
          if (Array.isArray(data) && data.length === 0) {
            const fallbackUrl = `http://192.168.10.225:9000/imoveis?code=${encodeURIComponent(searchQuery.trim())}`
            const fallbackResponse = await fetch(fallbackUrl)
            if (fallbackResponse.ok) {
              response = fallbackResponse
            }
          }
        }

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
    if (!searchQuery) return serverProperties.slice(0, 50)

    const lowerQuery = searchQuery.toLowerCase()
    return serverProperties
      .filter((p: any) => {
        const idStr = String(p.code || p.id || '').toLowerCase()
        const nameStr = getOwnerName(p).toLowerCase()
        return idStr.includes(lowerQuery) || nameStr.includes(lowerQuery)
      })
      .slice(0, 50)
  }, [serverProperties, searchQuery])

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

  useEffect(() => {
    const typeObj = DOCUMENT_TYPES.find((t) => t.id === docType)
    if (typeObj && typeObj.label.startsWith('Imovel - ') && selectedProperty) {
      const propId = selectedProperty.code || selectedProperty.id
      if (propId) {
        if (['CONTRACT_ACTIVE', 'CONTRACT_TERMINATED'].includes(docType)) {
          setFolderNumber(String(propId))
        } else if (['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT'].includes(docType)) {
          setLeaseNumber(String(propId))
        } else if (docType === 'LEASES') {
          setLeaseNumber('')
        }
      }
    }
  }, [docType, selectedProperty])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!propertyId || !docType || !hasSpAccess || !selectedProperty) return
    if (mode === 'file' && !file) return

    setUploading(true)
    setScanningStatus('')
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

      let finalFile = file
      if (mode === 'scanner') {
        setScanningStatus('Iniciando digitalização via Agente Local...')

        try {
          const scanRes = await fetch('http://localhost:5000/scan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dpi, colorMode, duplex }),
          })

          if (!scanRes.ok) {
            throw new Error(`Falha ao iniciar Scan: ${scanRes.status} ${scanRes.statusText}`)
          }

          setScanningStatus('Capturando e transferindo documento...')
          const blob = await scanRes.blob()
          const safeName = customFileName.trim().substring(0, 10) || 'Scan'
          finalFile = new File([blob], `${safeName}.pdf`, {
            type: 'application/pdf',
          })
          setScanningStatus('Digitalização concluída.')
        } catch (e: any) {
          toast({
            variant: 'destructive',
            title: 'Erro de Comunicação',
            description: `Não foi possível comunicar com o Agente Local. Certifique-se de que o script está rodando no seu Windows (localhost:5000). Erro: ${e.message}`,
          })
          setUploading(false)
          setScanningStatus('')
          return
        }
      }

      if (!finalFile) {
        toast({
          variant: 'destructive',
          title: 'Nenhum arquivo',
          description: 'Por favor, selecione um arquivo válido.',
        })
        setUploading(false)
        return
      }

      // @ts-expect-error - folderNumber parameter might not be typed yet in m365Service
      const result = await m365Service.uploadStructuredDocument(
        finalFile,
        finalFile.name,
        docType,
        propId,
        propTitle,
        user?.name || 'Sistema',
        finalEntityCode,
        finalEntityName,
        leaseNumber,
        folderNumber,
      )

      // Garantir que o imóvel exista no Supabase para evitar erro de violação de Foreign Key
      const { data: existingProp } = await supabase
        .from('properties')
        .select('id')
        .eq('id', propId)
        .maybeSingle()

      if (!existingProp) {
        await supabase.from('properties').insert({
          id: propId,
          title: propTitle,
          address: propTitle,
          type: 'Importado',
          status: 'Ativo',
        })
      }

      const path =
        typeof result === 'string'
          ? result
          : result?.path ||
            result?.serverRelativeUrl ||
            result?.webUrl ||
            result?.url ||
            `sharepoint:/${docType}/${file.name}`

      await documentsStore.addDocument({
        propertyId: propId,
        name: finalFile.name,
        category: docType,
        entityCode: finalEntityCode || undefined,
        entityName: finalEntityName || undefined,
        filePath: path,
      })

      if (sendToManager) {
        mainStore.updateProperty(propId, { status: 'Análise Gerencial' })
      }

      toast({
        title: 'Processo Concluído',
        description:
          mode === 'scanner'
            ? 'Documento digitalizado e salvo no SharePoint com sucesso.'
            : 'Documento enviado e classificado com sucesso no SharePoint.',
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
      console.warn('Upload error:', e)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 flex-1 flex flex-col" translate="no">
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
              className="w-full justify-between font-normal h-auto min-h-10 py-2"
            >
              {selectedProperty ? (
                <span className="truncate flex items-center text-left">
                  <strong className="mr-1">{selectedProperty.code || selectedProperty.id}</strong>
                  <span> - {getOwnerName(selectedProperty)}</span>
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
                placeholder="Buscar imóvel por ID ou Nome..."
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
                      value={String(p.code || p.id)}
                      onSelect={() => {
                        setPropertyId(p.code || p.id)
                        setSelectedProperty(p)
                        setPropertyOpen(false)
                      }}
                      className="flex flex-col items-start py-3 px-4 gap-1.5 cursor-pointer border-b border-border/40 last:border-0"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Check
                          className={cn(
                            'h-4 w-4 shrink-0',
                            propertyId === (p.code || p.id) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        <span className="font-medium text-sm truncate text-foreground">
                          <span>
                            {p.code || p.id} - {getOwnerName(p)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-1.5 w-full pl-6">
                        <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                        <span className="truncate">{getAddress(p)}</span>
                      </div>
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
                <span>{t.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {docType === 'OWNER_DOCUMENT' && (
        <div key="owner-field" className="grid gap-2 animate-fade-in">
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
                    <strong className="mr-1">{selectedOwner.code || selectedOwner.id}</strong>
                    <span>
                      {' '}
                      - {selectedOwner.name || selectedOwner.fullName || selectedOwner.title}
                    </span>
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
                          <strong className="mr-1">{o.code || o.id}</strong>
                          <span> - {o.name || o.fullName || o.title}</span>
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
        <div key="tenant-field" className="grid gap-2 animate-fade-in">
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
                    <strong className="mr-1">{selectedTenant.code || selectedTenant.id}</strong>
                    <span>
                      {' '}
                      - {selectedTenant.name || selectedTenant.fullName || selectedTenant.title}
                    </span>
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
                          <strong className="mr-1">{t.code || t.id}</strong>
                          <span> - {t.name || t.fullName || t.title}</span>
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

      {['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT', 'LEASES'].includes(docType) && (
        <div key="lease-field" className="grid gap-2 animate-fade-in">
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
        <div key="folder-field" className="grid gap-2 animate-fade-in">
          <Label>Número da Pasta</Label>
          <Input
            value={folderNumber}
            onChange={(e) => setFolderNumber(e.target.value)}
            placeholder="Ex: 00123"
            disabled={!hasSpAccess}
          />
        </div>
      )}

      {mode === 'file' ? (
        <div className="grid gap-2">
          <Label>Arquivo Selecionado</Label>
          <Input id="file-upload" type="file" onChange={handleFileChange} disabled={!hasSpAccess} />
        </div>
      ) : (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Printer className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Configurações de Captura</h3>
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              Agente Local (localhost:5000)
            </span>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Nome do Arquivo (Máx 10 caracteres)</Label>
            <div className="flex items-center gap-2">
              <Input
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                maxLength={10}
                className="h-8"
                placeholder="Ex: DocScan"
                disabled={!hasSpAccess}
              />
              <span className="text-xs text-muted-foreground font-medium">.pdf</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Resolução (DPI)</Label>
              <Select value={dpi} onValueChange={setDpi}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Selecione DPI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">
                    <span>200 DPI</span>
                  </SelectItem>
                  <SelectItem value="300">
                    <span>300 DPI</span>
                  </SelectItem>
                  <SelectItem value="600">
                    <span>600 DPI</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Cor</Label>
              <Select value={colorMode} onValueChange={setColorMode}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Selecione Cor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">
                    <span>Cores</span>
                  </SelectItem>
                  <SelectItem value="gray">
                    <span>Tons de Cinza</span>
                  </SelectItem>
                  <SelectItem value="bw">
                    <span>Preto e Branco</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Frente e Verso (Duplex)</Label>
            <Switch checked={duplex} onCheckedChange={setDuplex} disabled={!hasSpAccess} />
          </div>
        </div>
      )}

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
          (mode === 'file' && !file) ||
          !propertyId ||
          !docType ||
          uploading ||
          !hasSpAccess ||
          (docType === 'OWNER_DOCUMENT' && !selectedOwner) ||
          (docType === 'TENANT_DOCUMENT' && !selectedTenant) ||
          (['INSPECTION_MOVE_IN', 'INSPECTION_MOVE_OUT', 'LEASES'].includes(docType) &&
            !leaseNumber) ||
          (['CONTRACT_ACTIVE', 'CONTRACT_TERMINATED'].includes(docType) && !folderNumber)
        }
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
            <span className="truncate">{scanningStatus || 'Processando...'}</span>
          </>
        ) : mode === 'scanner' ? (
          <>
            <Printer className="h-4 w-4 shrink-0" />
            <span className="truncate">Digitalizar e Enviar (GED)</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4 shrink-0" />
            <span className="truncate">Processar e Enviar (GED)</span>
          </>
        )}
      </Button>
    </div>
  )
}
