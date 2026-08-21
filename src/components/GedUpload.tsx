import { useState, useMemo, useEffect } from 'react'
import {
  UploadCloud,
  Loader2,
  AlertCircle,
  Check,
  ChevronsUpDown,
  MapPin,
  Printer,
  FileText,
  X,
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
  mode?: 'file' | 'scanner' | 'template'
  template?: any
}

const isUuid = (str: any) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(str))

const DOCUMENT_TYPES = [
  { id: 'OWNER_DOCUMENT', label: 'Documento de Proprietário' },
  { id: 'TENANT_DOCUMENT', label: 'Documento Locatário/Interessado' },
  { id: 'GUARANTEE_DOCUMENT', label: 'Documentos de Garantia' },
  { id: 'CONTRACT_ACTIVE', label: 'Imovel - Documentação (Ativo)' },
  { id: 'INSPECTION_MOVE_IN', label: 'Imovel - Vistoria de Entrada (Ativo)' },
  { id: 'INSPECTION_MOVE_OUT', label: 'Imovel - Vistoria de Saida (Ativo)' },
  { id: 'LEASES', label: 'Imovel - Locações' },
  { id: 'CONTRACT_TERMINATED', label: 'Imovel - Documentação (Encerrado)' },
]

const getOwnerName = (property: any) => {
  if (!property || typeof property !== 'object') return 'Não informado'
  let name: any = ''

  if (property.isDb && property.title) name = property.title
  else if (property.proprietario) name = property.proprietario
  else if (property.Proprietario) name = property.Proprietario
  else if (property.nomeProprietario) name = property.nomeProprietario
  else if (property.proprietario_nome) name = property.proprietario_nome
  else if (property.proprietarioNome) name = property.proprietarioNome
  else if (property.cliente) name = property.cliente
  else if (property.ownerName) name = property.ownerName
  else if (property.locador) name = property.locador
  else if (property.Locador) name = property.Locador
  else if (property.title) name = property.title
  else if (
    property.proprietarios &&
    Array.isArray(property.proprietarios) &&
    property.proprietarios.length > 0 &&
    property.proprietarios[0]
  ) {
    name = property.proprietarios[0].nome || property.proprietarios[0].name || ''
  }

  if (name && typeof name === 'object') {
    name = name.nome || name.name || name.razaoSocial || name.fullName || name.descricao || ''
  }

  if (typeof name === 'string' && name.trim().length > 0) {
    return name.trim()
  }
  return 'Proprietário não informado'
}

const getAddress = (property: any) => {
  if (!property || typeof property !== 'object') return 'Endereço não informado'
  if (property.isDb && property.address) return property.address
  const parts = []

  let end = property.endereco || property.Endereco
  if (end && typeof end === 'object') {
    end = end.logradouro || end.rua || end.nome || ''
  }
  if (end) parts.push(end)

  if (property.numero) parts.push(property.numero)
  if (property.bairro) parts.push(property.bairro)
  if (property.cidade) parts.push(property.cidade)
  if (property.uf) parts.push(property.uf)

  if (parts.length > 0) {
    return parts.filter((p) => typeof p === 'string' && p.trim().length > 0).join(', ')
  }

  if (typeof property.address === 'string' && property.address.trim().length > 0) {
    return property.address.trim()
  }
  return 'Endereço não informado'
}

const formatOwnerCodeForCandidate = (code: string): string => {
  const numericPart = code.replace(/\D/g, '')
  if (numericPart) return `PRO${numericPart}`
  return code
}

export function GedUpload({
  preselectedPropertyId,
  preselectedType,
  onSuccess,
  mode = 'file',
  template,
}: GedUploadProps) {
  const { settings, properties: storeProperties } = useMainStore()
  const { owners, tenants, guarantees, guaranteesError } = useEntitiesStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const [propertyId, setPropertyId] = useState(preselectedPropertyId || '')
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)
  const [propertyOpen, setPropertyOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [docType, setDocType] = useState(preselectedType || '')
  const [entityCode, setEntityCode] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [batchProgress, setBatchProgress] = useState<{
    current: number
    total: number
    fileName: string
  } | null>(null)

  const [ownerOpen, setOwnerOpen] = useState(false)
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('')
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null)

  const [tenantOpen, setTenantOpen] = useState(false)
  const [tenantSearchQuery, setTenantSearchQuery] = useState('')
  const [selectedTenant, setSelectedTenant] = useState<any | null>(null)

  const [guarantorOpen, setGuarantorOpen] = useState(false)
  const [guarantorSearchQuery, setGuarantorSearchQuery] = useState('')
  const [selectedGuarantor, setSelectedGuarantor] = useState<any | null>(null)

  const [dbCandidates, setDbCandidates] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('pre_registrations')
      .select('id, code, full_name, category, cpf, email, phone, address')
      .then(({ data }) => setDbCandidates(data || []))
  }, [tenantOpen, ownerOpen, guarantorOpen])

  const [uploading, setUploading] = useState(false)
  const [scanningStatus, setScanningStatus] = useState('')
  const [sendToManager, setSendToManager] = useState(false)
  const [leaseNumber, setLeaseNumber] = useState('')
  const [folderNumber, setFolderNumber] = useState('')

  const [dpi, setDpi] = useState('300')
  const [colorMode, setColorMode] = useState('color')
  const [duplex, setDuplex] = useState(true)
  const [customFileName, setCustomFileName] = useState(
    mode === 'scanner' ? `Scan${Math.floor(Math.random() * 1000)}` : '',
  )

  useEffect(() => {
    if (mode === 'template' && template?.name) {
      const nameParts = template.name.split('.')
      const nameWithoutExt = nameParts.length > 1 ? nameParts.slice(0, -1).join('.') : template.name
      setCustomFileName(nameWithoutExt)
    }
  }, [mode, template])

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

        let erpProperties: any[] = []
        const normalizeErpResponse = (data: any): any[] => {
          if (!data) return []
          let items: any[] = []

          if (Array.isArray(data)) {
            items = data
          } else if (typeof data === 'object') {
            if (Array.isArray(data.data)) {
              items = data.data
            } else if (data.data && typeof data.data === 'object') {
              items = [data.data]
            } else if (data.imovel && typeof data.imovel === 'object') {
              items = [data.imovel]
            } else if (data.property && typeof data.property === 'object') {
              items = [data.property]
            } else {
              items = [data]
            }
          }

          return items
            .filter(
              (item: any) =>
                item &&
                typeof item === 'object' &&
                (item.id != null || item.code != null || item.codigo != null),
            )
            .map((item: any) => {
              if (item.id == null && item.code == null && item.codigo != null) {
                return { ...item, id: item.codigo }
              }
              return item
            })
        }
        try {
          if (isNumeric) {
            const url = `http://192.168.10.225:9000/imoveis/dados/${encodeURIComponent(searchQuery.trim())}`
            const response = await fetch(url)
            if (response.ok) {
              const data = await response.json()
              const items = normalizeErpResponse(data)
              erpProperties = items.map((item: any) => {
                const ownerName =
                  item.proprietario ||
                  item.Proprietario ||
                  item.nomeProprietario ||
                  item.proprietario_nome ||
                  item.proprietarioNome ||
                  item.locador ||
                  item.Locador ||
                  item.cliente ||
                  item.ownerName ||
                  (item.proprietarios &&
                  Array.isArray(item.proprietarios) &&
                  item.proprietarios.length > 0 &&
                  item.proprietarios[0]
                    ? item.proprietarios[0].nome ||
                      item.proprietarios[0].name ||
                      item.proprietarios[0].razaoSocial ||
                      item.proprietarios[0].fullName ||
                      ''
                    : '')
                return {
                  ...item,
                  proprietario: ownerName || item.title || '',
                }
              })
            } else if (response.status === 404) {
              erpProperties = []
            }
          } else {
            const url = searchQuery
              ? `http://192.168.10.225:9000/imoveis?name=${encodeURIComponent(searchQuery.trim())}`
              : 'http://192.168.10.225:9000/imoveis'
            const response = await fetch(url)
            if (response.ok) {
              const data = await response.json()
              erpProperties = normalizeErpResponse(data)
            }
          }
        } catch (error) {
          console.warn('Erro ao buscar imóveis do servidor local', error)
        }
        if (!Array.isArray(erpProperties)) {
          erpProperties = []
        }

        let query = supabase.from('properties').select('*')
        if (searchQuery.trim()) {
          query = query.or(
            `title.ilike.%${searchQuery.trim()}%,address.ilike.%${searchQuery.trim()}%,id.ilike.%${searchQuery.trim()}%`,
          )
        }
        const { data: dbData } = await query.limit(50)

        // Combinar imóveis do Supabase (query + mainStore.properties) para ter o banco local completo
        const allDbMap = new Map<string, any>()
        ;(dbData || []).forEach((p) => {
          allDbMap.set(String(p.id).trim().toLowerCase(), {
            ...p,
            code: p.id,
            isDb: true,
          })
        })
        ;(storeProperties || []).forEach((p) => {
          const key = String(p.id).trim().toLowerCase()
          if (!allDbMap.has(key)) {
            allDbMap.set(key, {
              ...p,
              code: p.id,
              isDb: true,
            })
          }
        })

        const dbProperties = Array.from(allDbMap.values())
        const dbIds = new Set(
          dbProperties.map((p) =>
            String(p.id || p.code)
              .trim()
              .toLowerCase(),
          ),
        )

        // Deduplicação: se o imóvel do ERP já existir no banco local, exibe apenas a versão do banco
        const combined = [...dbProperties]
        erpProperties.forEach((p) => {
          const erpKey = String(p.code || p.id || '')
            .trim()
            .toLowerCase()
          if (erpKey && !dbIds.has(erpKey)) {
            combined.push({
              ...p,
              code: p.code || p.id,
              isDb: false,
            })
          }
        })

        setServerProperties(combined)
      } catch (error) {
        console.error('Erro ao buscar imóveis', error)
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
        const normalizeStr = (str: any) =>
          str
            ? String(str)
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            : ''

        const normalizedQuery = normalizeStr(searchQuery)
        const nameStr = normalizeStr(getOwnerName(p))
        const addressStr = normalizeStr(getAddress(p))
        return (
          idStr.includes(normalizedQuery) ||
          nameStr.includes(normalizedQuery) ||
          addressStr.includes(normalizedQuery)
        )
      })
      .slice(0, 50)
  }, [serverProperties, searchQuery])

  useEffect(() => {
    if (selectedProperty && !selectedOwner) {
      let ownerToSelect = null

      if (selectedProperty.isDb) {
        if (selectedProperty.owner_id) {
          const found = owners.find(
            (o) => o.id === selectedProperty.owner_id || o.code === selectedProperty.owner_id,
          )
          if (found) {
            ownerToSelect = found
          }
        }
      } else {
        const ownerName = getOwnerName(selectedProperty)
        if (
          ownerName &&
          ownerName !== 'Proprietário não informado' &&
          ownerName !== 'Não informado'
        ) {
          const normalizedTarget = ownerName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
          const found = owners.find((o) => {
            const name = (o.fullName || '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
            return name === normalizedTarget
          })

          if (found) {
            ownerToSelect = found
          } else if (
            selectedProperty.proprietarios &&
            Array.isArray(selectedProperty.proprietarios) &&
            selectedProperty.proprietarios.length > 0
          ) {
            const firstProp = selectedProperty.proprietarios[0]
            if (firstProp) {
              ownerToSelect = {
                id: firstProp.idprop || firstProp.id || Math.random().toString(),
                code: firstProp.idprop || firstProp.code || 'ERP-P',
                fullName: ownerName,
                source: 'ERP',
              }
            }
          }
        }
      }

      if (ownerToSelect) {
        setSelectedOwner(ownerToSelect)
      }
    }
  }, [selectedProperty, owners, selectedOwner])

  const localServerOwners = useMemo(() => {
    const candidates = dbCandidates.map((c) => ({
      ...c,
      id: c.id,
      code: c.code || c.id,
      fullName: c.full_name,
      title: c.full_name,
      isDbCandidate: true,
      source: 'Candidato',
    }))
    const erpOwners = (owners || []).map((o: any) => ({
      ...o,
      isDbCandidate: false,
      source: o.source || 'ERP',
    }))
    const combined = [...candidates, ...erpOwners]

    const normalizeStr = (str: any) =>
      str
        ? String(str)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        : ''

    const normalizedQuery = normalizeStr(ownerSearchQuery)

    return combined
      .filter(
        (o: any) =>
          !normalizedQuery ||
          normalizeStr(o.code).includes(normalizedQuery) ||
          normalizeStr(o.fullName).includes(normalizedQuery) ||
          normalizeStr(o.name).includes(normalizedQuery) ||
          normalizeStr(o.title).includes(normalizedQuery),
      )
      .slice(0, 50)
  }, [owners, dbCandidates, ownerSearchQuery])

  const localServerTenants = useMemo(() => {
    const candidates = dbCandidates.map((c) => ({
      ...c,
      id: c.id,
      code: c.code || c.id,
      fullName: c.full_name + ' (Interessado)',
      title: c.full_name,
      isDbCandidate: true,
      source: 'Candidato',
    }))
    const erpTenants = (tenants || []).map((t: any) => ({
      ...t,
      isDbCandidate: false,
      source: t.source || 'ERP',
    }))
    const combined = [...candidates, ...erpTenants]

    const normalizeStr = (str: any) =>
      str
        ? String(str)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        : ''

    const normalizedQuery = normalizeStr(tenantSearchQuery)

    return combined
      .filter(
        (t: any) =>
          !normalizedQuery ||
          normalizeStr(t.code).includes(normalizedQuery) ||
          normalizeStr(t.fullName).includes(normalizedQuery) ||
          normalizeStr(t.name).includes(normalizedQuery),
      )
      .slice(0, 50)
  }, [tenants, dbCandidates, tenantSearchQuery])

  const localServerGuarantors = useMemo(() => {
    const spFiadores = dbCandidates
      .filter((c) => c.category === 'Fiador' || c.category === 'PJ')
      .map((c) => ({
        ...c,
        id: c.id,
        code: c.code || c.id,
        fullName: c.full_name,
        title: c.full_name,
        isDbCandidate: true,
        source: 'SharePoint' as const,
      }))

    const erpGuarantees = (guarantees || []).map((g: any) => ({
      ...g,
      id: g.id,
      code: g.id,
      fullName: g.nome || g.name || 'Sem Nome',
      title: g.nome || g.name || 'Sem Nome',
      isDbCandidate: false,
      source: 'ERP' as const,
    }))

    const combined = [...spFiadores, ...erpGuarantees]

    const seenIds = new Set<string>()
    const deduped = combined.filter((item) => {
      const key = String(item.id).toLowerCase()
      if (seenIds.has(key)) return false
      seenIds.add(key)
      return true
    })

    const normalizeStr = (str: any) =>
      str
        ? String(str)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        : ''

    const normalizedQuery = normalizeStr(guarantorSearchQuery)

    return deduped
      .filter((x) => !normalizedQuery || normalizeStr(x.fullName).includes(normalizedQuery))
      .slice(0, 50)
  }, [dbCandidates, guarantorSearchQuery, guarantees])

  useEffect(() => {
    if (preselectedPropertyId && !selectedProperty) {
      setSelectedProperty({ id: preselectedPropertyId, title: 'Imóvel Selecionado' })
    }
  }, [preselectedPropertyId, selectedProperty])

  useEffect(() => {
    const typeObj = DOCUMENT_TYPES.find((t) => t.id === docType)
    if (typeObj && typeObj.label.startsWith('Imovel - ') && selectedProperty) {
      if (docType === 'OWNER_DOCUMENT' && isEntityFromCandidate) {
        finalEntityCode = formatOwnerCodeForCandidate(finalEntityCode)
      }

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
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => {
        const existingNames = new Set(prev.map((f) => f.name))
        const unique = newFiles.filter((f) => !existingNames.has(f.name))
        return [...prev, ...unique]
      })
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!propertyId || !docType || !hasSpAccess || !selectedProperty) return
    if (mode === 'file' && files.length === 0) return
    if (mode === 'template' && !template) return

    setUploading(true)
    setScanningStatus('')
    try {
      let finalEntityName = ''
      let finalEntityCode = entityCode
      let isEntityFromCandidate = false

      if (docType === 'OWNER_DOCUMENT' && selectedOwner) {
        finalEntityName = selectedOwner.name || selectedOwner.fullName || selectedOwner.title || ''
        finalEntityCode = selectedOwner.code || selectedOwner.id || ''
        isEntityFromCandidate = selectedOwner.source === 'Candidato'
      } else if (docType === 'TENANT_DOCUMENT' && selectedTenant) {
        finalEntityName =
          selectedTenant.name || selectedTenant.fullName || selectedTenant.title || ''
        finalEntityCode = selectedTenant.code || selectedTenant.id || ''
      } else if (docType === 'GUARANTEE_DOCUMENT' && selectedGuarantor) {
        finalEntityName =
          selectedGuarantor.name || selectedGuarantor.fullName || selectedGuarantor.title || ''
        finalEntityCode = selectedGuarantor.code || selectedGuarantor.id || ''
      }

      if (selectedProperty?.isDb) {
        if (docType === 'OWNER_DOCUMENT' && selectedProperty.owner_id) {
          const { data: ownerData } = await supabase
            .from('owners')
            .select('code, full_name')
            .eq('id', selectedProperty.owner_id)
            .maybeSingle()
          if (ownerData?.code) {
            finalEntityCode = ownerData.code
            if (ownerData.full_name) finalEntityName = ownerData.full_name
            isEntityFromCandidate = false
          }
        } else if (docType === 'TENANT_DOCUMENT' && selectedProperty.tenant_id) {
          const { data: tenantData } = await supabase
            .from('pre_registrations')
            .select('code, full_name')
            .eq('id', selectedProperty.tenant_id)
            .maybeSingle()
          if (tenantData?.code) {
            finalEntityCode = tenantData.code
            if (tenantData.full_name) finalEntityName = tenantData.full_name
          }
        } else if (docType === 'GUARANTEE_DOCUMENT' && selectedProperty.guarantor_id) {
          const { data: guarantorData } = await supabase
            .from('pre_registrations')
            .select('code, full_name')
            .eq('id', selectedProperty.guarantor_id)
            .maybeSingle()
          if (guarantorData?.code) {
            finalEntityCode = guarantorData.code
            if (guarantorData.full_name) finalEntityName = guarantorData.full_name
          }
        }
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

      if (mode === 'scanner' || mode === 'template') {
        let finalFile: File | Blob | null = null
        let finalFileName = ''

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
            finalFileName = `${safeName}.pdf`
            finalFile = new File([blob], finalFileName, {
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
        } else if (mode === 'template') {
          setScanningStatus('Baixando modelo original...')
          try {
            const blob = await m365Service.downloadItemContent(
              template.siteId,
              template.driveId,
              template.id,
            )
            const ext = template.name.includes('.')
              ? template.name.substring(template.name.lastIndexOf('.'))
              : ''
            finalFileName = `${customFileName.trim() || 'Documento_Gerado'}${ext}`
            finalFile = new File([blob], finalFileName, { type: blob.type })
            setScanningStatus('Salvando cópia no destino...')
          } catch (e: any) {
            toast({
              variant: 'destructive',
              title: 'Erro',
              description: e.message || 'Não foi possível baixar o modelo selecionado.',
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
            description: 'Por favor, selecione um arquivo ou forneça um modelo válido.',
          })
          setUploading(false)
          return
        }

        const result = await m365Service.uploadStructuredDocument(
          finalFile,
          finalFileName,
          docType,
          propId,
          propTitle,
          user?.name || 'Sistema',
          finalEntityCode,
          finalEntityName,
          leaseNumber,
          folderNumber,
        )

        const path =
          typeof result === 'string'
            ? result
            : result?.path ||
              result?.serverRelativeUrl ||
              result?.webUrl ||
              result?.url ||
              `sharepoint:/${docType}/${finalFileName}`

        await documentsStore.addDocument({
          propertyId: propId,
          name: finalFileName,
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
              : 'Documento gerado e salvo com sucesso. Abrindo para edição...',
        })

        if (mode === 'template' && typeof result !== 'string' && result.webUrl) {
          window.open(result.webUrl, '_blank')
        }
      } else {
        let successCount = 0
        let failCount = 0
        const failedFiles: string[] = []

        for (let i = 0; i < files.length; i++) {
          const currentFile = files[i]
          setBatchProgress({
            current: i + 1,
            total: files.length,
            fileName: currentFile.name,
          })
          setScanningStatus(`Enviando ${currentFile.name} (${i + 1}/${files.length})...`)

          try {
            const result = await m365Service.uploadStructuredDocument(
              currentFile,
              currentFile.name,
              docType,
              propId,
              propTitle,
              user?.name || 'Sistema',
              finalEntityCode,
              finalEntityName,
              leaseNumber,
              folderNumber,
            )

            const path =
              typeof result === 'string'
                ? result
                : result?.path ||
                  result?.serverRelativeUrl ||
                  result?.webUrl ||
                  result?.url ||
                  `sharepoint:/${docType}/${currentFile.name}`

            await documentsStore.addDocument({
              propertyId: propId,
              name: currentFile.name,
              category: docType,
              entityCode: finalEntityCode || undefined,
              entityName: finalEntityName || undefined,
              filePath: path,
            })

            successCount++
          } catch (e: any) {
            console.warn(`Upload error for ${currentFile.name}:`, e)
            failCount++
            failedFiles.push(currentFile.name)
          }
        }

        if (sendToManager && successCount > 0) {
          mainStore.updateProperty(propId, { status: 'Análise Gerencial' })
        }

        if (failCount === 0) {
          toast({
            title: 'Upload Concluído',
            description: `${successCount} arquivo(s) enviado(s) e classificado(s) com sucesso no SharePoint.`,
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Upload Parcialmente Concluído',
            description: `${successCount} arquivo(s) enviado(s) com sucesso. ${failCount} falha(s): ${failedFiles.join(', ')}`,
          })
        }

        setBatchProgress(null)
      }

      setFiles([])
      setEntityCode('')
      setSelectedOwner(null)
      setSelectedTenant(null)
      setSelectedGuarantor(null)
      setLeaseNumber('')
      setFolderNumber('')
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      if (onSuccess) onSuccess()
    } catch (e: any) {
      console.warn('Upload error:', e)
    } finally {
      setUploading(false)
      setBatchProgress(null)
      setScanningStatus('')
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
                  {!isUuid(selectedProperty.code || selectedProperty.id) && (
                    <>
                      <strong className="mr-1">
                        {selectedProperty.code || selectedProperty.id}
                      </strong>
                      <span className="mr-1">-</span>
                    </>
                  )}
                  <span>{getOwnerName(selectedProperty)}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Selecione ou busque o imóvel (ERP/Novos)...
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Buscar imóvel por ID, Nome ou Endereço..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>
                  {loadingProperties ? (
                    <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Buscando imóveis...
                    </div>
                  ) : (
                    'Nenhum imóvel encontrado.'
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
                        <span className="font-medium text-sm truncate text-foreground flex items-center gap-2">
                          <span>
                            {!isUuid(p.code || p.id) && <>{p.code || p.id} - </>}
                            {getOwnerName(p)}
                          </span>
                          {p.isDb && (
                            <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider">
                              Novo
                            </span>
                          )}
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
          <Label>Proprietário (ERP ou Candidatos)</Label>
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
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate">
                      {!isUuid(selectedOwner.code || selectedOwner.id) && (
                        <>
                          <strong className="mr-1">{selectedOwner.code || selectedOwner.id}</strong>
                          <span> - </span>
                        </>
                      )}
                      <span>
                        {selectedOwner.name || selectedOwner.fullName || selectedOwner.title}
                      </span>
                    </span>
                    {selectedOwner.source === 'candidato' ? (
                      <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider shrink-0">
                        Candidato
                      </span>
                    ) : selectedOwner.source === 'erp' ? (
                      <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider shrink-0">
                        ERP
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    Buscar proprietário no servidor ou candidatos...
                  </span>
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
                    Nenhum proprietário encontrado no servidor local ou candidatos.
                  </CommandEmpty>
                  <CommandGroup>
                    {localServerOwners.map((o: any) => (
                      <CommandItem
                        key={o.id || o.code}
                        value={o.id || o.code}
                        onSelect={() => {
                          setSelectedOwner(o)
                          setEntityCode(o.code || o.id)
                          setOwnerOpen(false)
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center truncate">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 shrink-0',
                              selectedOwner?.id === o.id || selectedOwner?.code === o.code
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          <span className="truncate">
                            {!isUuid(o.code || o.id) && (
                              <>
                                <strong className="mr-1">{o.code || o.id}</strong>
                                <span> - </span>
                              </>
                            )}
                            <span>{o.name || o.fullName || o.title}</span>
                          </span>
                        </div>
                        {o.source === 'candidato' ? (
                          <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider ml-2 shrink-0">
                            Candidato
                          </span>
                        ) : (
                          <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider ml-2 shrink-0">
                            ERP
                          </span>
                        )}
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
          <Label>Locatário / Interessado</Label>
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
                    {!isUuid(selectedTenant.code || selectedTenant.id) && (
                      <>
                        <strong className="mr-1">{selectedTenant.code || selectedTenant.id}</strong>
                        <span> - </span>
                      </>
                    )}
                    <span>
                      {selectedTenant.name || selectedTenant.fullName || selectedTenant.title}
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
                  placeholder="Buscar locatário ou interessado..."
                  value={tenantSearchQuery}
                  onValueChange={setTenantSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
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
                          {!isUuid(t.code || t.id) && (
                            <>
                              <strong className="mr-1">{t.code || t.id}</strong>
                              <span> - </span>
                            </>
                          )}
                          <span>{t.name || t.fullName || t.title}</span>
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

      {docType === 'GUARANTEE_DOCUMENT' && (
        <div key="guarantor-field" className="grid gap-2 animate-fade-in">
          <Label>Fiador (Garantia)</Label>
          <Popover open={guarantorOpen} onOpenChange={setGuarantorOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={guarantorOpen}
                disabled={!hasSpAccess}
                className="w-full justify-between font-normal"
              >
                {selectedGuarantor ? (
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate">
                      {!isUuid(selectedGuarantor.code || selectedGuarantor.id) && (
                        <>
                          <strong className="mr-1">
                            {selectedGuarantor.code || selectedGuarantor.id}
                          </strong>
                          <span> - </span>
                        </>
                      )}
                      <span>{selectedGuarantor.fullName}</span>
                    </span>
                    {selectedGuarantor.source === 'SharePoint' ? (
                      <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider shrink-0">
                        SharePoint
                      </span>
                    ) : selectedGuarantor.source === 'ERP' ? (
                      <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider shrink-0">
                        ERP Local
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    Buscar fiador (SharePoint + ERP Local)...
                  </span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Buscar fiador..."
                  value={guarantorSearchQuery}
                  onValueChange={setGuarantorSearchQuery}
                />
                <CommandList>
                  {guaranteesError && (
                    <div className="px-3 py-2 text-xs text-amber-600 flex items-center gap-1.5 border-b border-border/40">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>ERP Local indisponível — exibindo apenas fiadores do SharePoint.</span>
                    </div>
                  )}
                  <CommandEmpty>Nenhum fiador encontrado.</CommandEmpty>
                  <CommandGroup>
                    {localServerGuarantors.map((g) => (
                      <CommandItem
                        key={g.id}
                        value={g.id}
                        onSelect={() => {
                          setSelectedGuarantor(g)
                          setEntityCode(g.code || g.id)
                          setGuarantorOpen(false)
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center truncate">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 shrink-0',
                              selectedGuarantor?.id === g.id ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <span className="truncate">
                            {!isUuid(g.code || g.id) && (
                              <>
                                <strong className="mr-1">{g.code || g.id}</strong>
                                <span> - </span>
                              </>
                            )}
                            <span>{g.fullName}</span>
                          </span>
                        </div>
                        {g.source === 'SharePoint' ? (
                          <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider ml-2 shrink-0">
                            SharePoint
                          </span>
                        ) : (
                          <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider ml-2 shrink-0">
                            ERP Local
                          </span>
                        )}
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

      {mode === 'file' && (
        <div className="grid gap-2">
          <Label>Arquivos Selecionados</Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={!hasSpAccess}
          />
          {files.length > 0 && (
            <div className="space-y-2 mt-2">
              {files.map((f, idx) => (
                <div
                  key={`${f.name}-${idx}`}
                  className="flex items-center justify-between gap-2 rounded-md border p-2 bg-muted/30"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm truncate">{f.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      ({(f.size / 1024).toFixed(0)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(idx)}
                    disabled={uploading}
                    className="h-7 w-7 p-0 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {batchProgress && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>
                Processando {batchProgress.current} de {batchProgress.total}:{' '}
                {batchProgress.fileName}
              </span>
            </div>
          )}
        </div>
      )}

      {mode === 'template' && (
        <div className="grid gap-2 animate-fade-in">
          <Label>Nome do Novo Arquivo</Label>
          <div className="flex items-center gap-2">
            <Input
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviço"
              disabled={!hasSpAccess}
            />
            <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              {template?.name?.includes('.')
                ? template.name.substring(template.name.lastIndexOf('.'))
                : ''}
            </span>
          </div>
        </div>
      )}

      {mode === 'scanner' && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/20 animate-fade-in">
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
          (mode === 'file' && files.length === 0) ||
          (mode === 'template' && (!template || !customFileName.trim())) ||
          (mode === 'scanner' && !customFileName.trim()) ||
          !propertyId ||
          !docType ||
          uploading ||
          !hasSpAccess ||
          (docType === 'OWNER_DOCUMENT' && !selectedOwner) ||
          (docType === 'TENANT_DOCUMENT' && !selectedTenant) ||
          (docType === 'GUARANTEE_DOCUMENT' && !selectedGuarantor) ||
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
        ) : mode === 'template' ? (
          <>
            <FileText className="h-4 w-4 shrink-0" />
            <span className="truncate">Gerar Documento e Editar</span>
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
