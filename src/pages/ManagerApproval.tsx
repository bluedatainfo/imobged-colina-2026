import { useState, useMemo, useEffect } from 'react'
import {
  Check,
  X,
  FileText,
  UserCheck,
  Eye,
  AlertCircle,
  Clock,
  ChevronLeft,
  FolderOpen,
  User,
  Users,
  FileSignature,
  FolderSearch,
  Loader2,
  MessageSquare,
  ArrowLeftRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import useMainStore, { mainStore, isSlaBreached, Property } from '@/stores/main'
import useDocumentsStore, { documentsStore } from '@/stores/documents'
import useContractsStore, { contractsStore } from '@/stores/contracts'
import useEntitiesStore from '@/stores/entities'
import { useAuth } from '@/contexts/AuthContext'
import { m365Service } from '@/lib/m365'
import { DocumentViewer } from '@/components/DocumentViewer'
import { supabase } from '@/lib/supabase/client'

const DocItem = ({
  name,
  badge,
  hasNotes,
  onClick,
}: {
  name: string
  badge?: string
  hasNotes?: boolean
  onClick: () => void
}) => (
  <div
    className="flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-accent transition-colors group cursor-pointer shadow-sm relative overflow-hidden"
    onClick={onClick}
  >
    {hasNotes && <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>}
    <div
      className={`p-2 rounded-md ${
        hasNotes ? 'bg-amber-100 text-amber-700' : 'bg-blue-100/50 text-blue-700'
      }`}
    >
      {hasNotes ? <MessageSquare className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
    </div>
    <div className="flex-1 flex flex-col min-w-0">
      <span className="text-sm font-medium truncate" title={name}>
        {name}
      </span>
      {badge && (
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
          {badge}
        </span>
      )}
    </div>
    {hasNotes && (
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertCircle className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
        </TooltipTrigger>
        <TooltipContent>Documento possui notas de revisão pendentes</TooltipContent>
      </Tooltip>
    )}
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
    >
      <Eye className="h-4 w-4 text-muted-foreground" />
    </Button>
  </div>
)

const ManagerApproval = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const store = useMainStore()
  const { documents } = useDocumentsStore()
  const { contracts } = useContractsStore()
  const { owners, tenants } = useEntitiesStore()

  const approvals = useMemo(() => {
    return store.properties
      .filter((p) => p.status === 'Análise Gerencial')
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.slaStart || a.updatedAt || 0).getTime()
        const dateB = new Date(b.createdAt || b.slaStart || b.updatedAt || 0).getTime()
        return dateB - dateA
      })
  }, [store.properties])

  const interessados = useMemo(() => approvals.filter((p) => (p as any).tenant_id), [approvals])
  const locatarios = useMemo(() => approvals.filter((p) => !(p as any).tenant_id), [approvals])

  const [selectedHub, setSelectedHub] = useState<Property | null>(null)
  const [viewingItem, setViewingItem] = useState<{
    type: 'document' | 'contract'
    id: string
  } | null>(null)

  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const [spFiles, setSpFiles] = useState<any[]>([])
  const [scanningSp, setScanningSp] = useState(false)

  const [spOwnerDocs, setSpOwnerDocs] = useState<any[] | null>(null)
  const [spTenantDocs, setSpTenantDocs] = useState<any[] | null>(null)
  const [scanningSpEntities, setScanningSpEntities] = useState(false)

  const [hubTenant, setHubTenant] = useState<any>(null)
  const [hubGuarantor, setHubGuarantor] = useState<any>(null)

  const ownerEntity = useMemo(() => {
    return selectedHub?.ownerId ? owners.find((o) => o.id === selectedHub.ownerId) : null
  }, [selectedHub, owners])

  const tenantEntity = useMemo(() => {
    return selectedHub?.tenant ? tenants.find((t) => t.fullName === selectedHub.tenant) : null
  }, [selectedHub, tenants])

  const ownerDocs = useMemo(() => {
    if (!selectedHub) return []
    const docs = documents.filter(
      (d) =>
        (d.propertyId === selectedHub.id && d.category === 'OWNER_DOCUMENT') ||
        (ownerEntity && d.entityCode === ownerEntity.code && d.category === 'OWNER_DOCUMENT'),
    )
    return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id)!)
  }, [selectedHub, documents, ownerEntity])

  const tenantDocs = useMemo(() => {
    if (!selectedHub) return []
    const docs = documents.filter(
      (d) =>
        (d.propertyId === selectedHub.id && d.category === 'TENANT_DOCUMENT') ||
        (tenantEntity && d.entityCode === tenantEntity.code && d.category === 'TENANT_DOCUMENT') ||
        (hubTenant && d.entityCode === hubTenant.id && d.category === 'TENANT_DOCUMENT'),
    )
    return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id)!)
  }, [selectedHub, documents, tenantEntity, hubTenant])

  const guarantorDocs = useMemo(() => {
    if (!selectedHub) return []
    const docs = documents.filter(
      (d) =>
        (d.propertyId === selectedHub.id && d.category === 'GUARANTEE_DOCUMENT') ||
        (hubGuarantor && d.entityCode === hubGuarantor.id && d.category === 'GUARANTEE_DOCUMENT'),
    )
    return Array.from(new Set(docs.map((a) => a.id))).map((id) => docs.find((a) => a.id === id)!)
  }, [selectedHub, documents, hubGuarantor])

  useEffect(() => {
    if (selectedHub) {
      const fetchHubEntities = async () => {
        // Safe check using 'any' to bypass TS strict typing for added columns
        const tId = (selectedHub as any).tenant_id
        const gId = (selectedHub as any).guarantor_id

        if (tId) {
          const { data } = await supabase
            .from('pre_registrations')
            .select('*')
            .eq('id', tId)
            .maybeSingle()
          setHubTenant(data)
        } else {
          setHubTenant(null)
        }

        if (gId) {
          const { data } = await supabase
            .from('pre_registrations')
            .select('*')
            .eq('id', gId)
            .maybeSingle()
          setHubGuarantor(data)
        } else {
          setHubGuarantor(null)
        }
      }
      fetchHubEntities()
    }
  }, [selectedHub])

  useEffect(() => {
    if (selectedHub) {
      let isMounted = true
      setScanningSpEntities(true)

      const fetchAndSyncEntities = async () => {
        try {
          const [oDocs, tDocs] = await Promise.all([
            ownerEntity
              ? m365Service.getEntityDocuments('OWNER_DOCUMENT', ownerEntity.code)
              : Promise.resolve(null),
            tenantEntity
              ? m365Service.getEntityDocuments('TENANT_DOCUMENT', tenantEntity.code)
              : Promise.resolve(null),
          ])

          if (!isMounted) return

          const syncMissing = async (spFiles: any[], category: string, entity: any) => {
            if (!spFiles || !entity) return
            for (const spFile of spFiles) {
              const currentDocs = documentsStore.getState().documents
              const exists = currentDocs.some(
                (d) =>
                  d.name.toLowerCase() === spFile.name.toLowerCase() &&
                  d.category === category &&
                  d.entityCode === entity.code,
              )
              if (!exists) {
                await documentsStore.addDocument({
                  propertyId: selectedHub.id,
                  name: spFile.name,
                  category: category,
                  entityCode: entity.code,
                  entityName: entity.fullName,
                  filePath: spFile.name,
                })
              }
            }
          }

          if (oDocs) await syncMissing(oDocs, 'OWNER_DOCUMENT', ownerEntity)
          if (tDocs) await syncMissing(tDocs, 'TENANT_DOCUMENT', tenantEntity)

          if (isMounted) {
            setSpOwnerDocs(oDocs)
            setSpTenantDocs(tDocs)
            setScanningSpEntities(false)
          }
        } catch (e) {
          console.error('Error fetching entity docs', e)
          if (isMounted) setScanningSpEntities(false)
        }
      }

      fetchAndSyncEntities()
    } else {
      setSpOwnerDocs(null)
      setSpTenantDocs(null)
    }
  }, [selectedHub, ownerEntity, tenantEntity])

  const finalOwnerDocs = useMemo(() => {
    if (spOwnerDocs === null) return ownerDocs
    return ownerDocs.filter((d) =>
      spOwnerDocs.some((sp) => sp.name.toLowerCase() === d.name.toLowerCase()),
    )
  }, [ownerDocs, spOwnerDocs])

  const finalTenantDocs = useMemo(() => {
    if (spTenantDocs === null) return tenantDocs
    return tenantDocs.filter((d) =>
      spTenantDocs.some((sp) => sp.name.toLowerCase() === d.name.toLowerCase()),
    )
  }, [tenantDocs, spTenantDocs])

  const uploadedContracts = selectedHub
    ? documents.filter((d) => d.propertyId === selectedHub.id && d.category.startsWith('CONTRACT_'))
    : []
  const systemContracts = selectedHub
    ? contracts.filter((c) => c.propertyId === selectedHub.id && c.status !== 'Rescindido')
    : []

  const hasPendingNotes = useMemo(() => {
    if (!selectedHub) return false
    const allDocs = [...finalOwnerDocs, ...finalTenantDocs, ...guarantorDocs, ...uploadedContracts]
    const hasDocNotes = allDocs.some((d) => d.reviewNotes && d.reviewNotes.trim() !== '')
    const hasContractNotes = systemContracts.some(
      (c) => c.reviewNotes && c.reviewNotes.trim() !== '',
    )
    return hasDocNotes || hasContractNotes
  }, [finalOwnerDocs, finalTenantDocs, systemContracts, uploadedContracts, selectedHub])

  useEffect(() => {
    if (selectedHub) {
      let isMounted = true
      setScanningSp(true)
      m365Service
        .searchFilesByPropertyId(selectedHub.id)
        .then((files) => {
          if (isMounted) {
            setSpFiles(files)
            setScanningSp(false)
          }
        })
        .catch(() => {
          if (isMounted) setScanningSp(false)
        })
      return () => {
        isMounted = false
      }
    } else {
      setSpFiles([])
    }
  }, [selectedHub])

  const handleApprove = (id: string) => {
    mainStore.updateProperty(id, { status: 'Vistoria', isResubmission: false })

    systemContracts.forEach((c) => {
      if (c.status === 'Em Análise') {
        contractsStore.updateStatus(c.id, 'Aprovado para Ajuste')
      }
    })

    mainStore.addAuditLog({
      propertyId: id,
      action: 'Aprovação Gerencial (Hub)',
      user: user?.name || 'Sistema',
      details:
        'Documentação validada no Hub SharePoint. Handoff para vistoria e contratos liberados.',
    })

    m365Service.syncToList('Audit Log', `Aprovação do Imóvel ID: ${id} por ${user?.name}`)
    m365Service.sendEmail(
      `${store.settings.administrativeEmails}, ${store.settings.operationalEmails}`,
      `Documentação Aprovada - Imóvel ID: ${id}`,
      'A gerência aprovou a documentação. Próximo passo: Vistoria.',
    )

    toast({
      title: 'Dossiê Aprovado',
      description: 'O imóvel foi movido para a etapa de Vistoria com sucesso.',
    })
    setSelectedHub(null)
  }

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Motivo obrigatório',
        description: 'Informe o motivo da rejeição.',
      })
      return
    }

    if (rejectId) {
      const allNotes: string[] = []
      finalOwnerDocs.forEach((d) => {
        if (d.reviewNotes) allNotes.push(`- Proprietário (${d.name}): ${d.reviewNotes}`)
      })
      finalTenantDocs.forEach((d) => {
        const label = (selectedHub as any).tenant_id ? 'Interessado' : 'Locatário'
        if (d.reviewNotes) allNotes.push(`- ${label} (${d.name}): ${d.reviewNotes}`)
      })
      guarantorDocs.forEach((d) => {
        if (d.reviewNotes) allNotes.push(`- Fiador (${d.name}): ${d.reviewNotes}`)
      })
      systemContracts.forEach((c) => {
        if (c.reviewNotes) allNotes.push(`- Contrato (${c.documentName}): ${c.reviewNotes}`)
      })
      uploadedContracts.forEach((d) => {
        if (d.reviewNotes) allNotes.push(`- Contrato Importado (${d.name}): ${d.reviewNotes}`)
      })

      const notesText =
        allNotes.length > 0 ? `\n\nApontamentos nos Documentos:\n${allNotes.join('\n')}` : ''
      const finalReason = `${rejectReason}${notesText}`

      mainStore.updateProperty(rejectId, { status: 'Pendente/Rascunho', isResubmission: false })

      systemContracts.forEach((c) => {
        if (c.status === 'Em Análise') {
          contractsStore.updateStatus(c.id, 'Rascunho')
        }
      })

      mainStore.addAuditLog({
        propertyId: rejectId,
        action: 'Documentação Rejeitada',
        user: user?.name || 'Sistema',
        details: `Motivo Geral: ${rejectReason}${
          notesText ? ' (Ver apontamentos nos documentos)' : ''
        }`,
      })

      m365Service.syncToList('Audit Log', `Rejeição do Imóvel ID: ${rejectId} por ${user?.name}`)
      m365Service.sendEmail(
        `${store.settings.administrativeEmails}, ${store.settings.managementEmails}`,
        `Documentação Rejeitada - Imóvel ID: ${rejectId}`,
        `Motivo: ${finalReason}\n\nPor favor, corrija as informações e reenvie para análise.`,
      )

      toast({
        title: 'Dossiê Rejeitado',
        description: 'A análise foi reprovada e devolvida para correção.',
      })
    }
    setRejectId(null)
    setRejectReason('')
    setSelectedHub(null)
  }

  if (selectedHub) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setSelectedHub(null)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hub de Validação</h1>
            <p className="text-muted-foreground">
              Analisando dossiê do imóvel: <strong>{selectedHub.title}</strong> (ID:{' '}
              {selectedHub.id})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" /> Proprietário
              </CardTitle>
              <CardDescription>
                Documentos vinculados ({ownerEntity?.fullName || 'Não definido'})
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {scanningSpEntities ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : finalOwnerDocs.length > 0 ? (
                finalOwnerDocs.map((doc) => (
                  <DocItem
                    key={doc.id}
                    name={doc.name}
                    hasNotes={!!doc.reviewNotes}
                    onClick={() => setViewingItem({ type: 'document', id: doc.id })}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum documento de proprietário localizado no GED.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />{' '}
                {(selectedHub as any).tenant_id ? 'Interessado' : 'Locatário'}
              </CardTitle>
              <CardDescription>
                {hubTenant?.full_name || selectedHub.tenant || 'Não informado'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {scanningSpEntities ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : finalTenantDocs.length > 0 ? (
                finalTenantDocs.map((doc) => (
                  <DocItem
                    key={doc.id}
                    name={doc.name}
                    hasNotes={!!doc.reviewNotes}
                    onClick={() => setViewingItem({ type: 'document', id: doc.id })}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum documento de {(selectedHub as any).tenant_id ? 'interessado' : 'locatário'}{' '}
                  localizado no GED.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="h-5 w-5 text-primary" /> Fiador
              </CardTitle>
              <CardDescription>{hubGuarantor?.full_name || 'Sem fiador vinculado'}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {guarantorDocs.length > 0 ? (
                guarantorDocs.map((doc) => (
                  <DocItem
                    key={doc.id}
                    name={doc.name}
                    hasNotes={!!doc.reviewNotes}
                    onClick={() => setViewingItem({ type: 'document', id: doc.id })}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum documento de garantia localizado.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-blue-200">
            <CardHeader className="bg-blue-50/50 pb-4 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
                <FileSignature className="h-5 w-5 text-blue-600" /> Contrato (GED + Ciclo)
              </CardTitle>
              <CardDescription>Minuta gerada ou contrato importado</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {systemContracts.length > 0 || uploadedContracts.length > 0 ? (
                <>
                  {systemContracts.map((c) => (
                    <DocItem
                      key={c.id}
                      name={c.documentName}
                      badge="Ciclo de Contratos"
                      hasNotes={!!c.reviewNotes}
                      onClick={() => setViewingItem({ type: 'contract', id: c.id })}
                    />
                  ))}
                  {uploadedContracts.map((doc) => (
                    <DocItem
                      key={doc.id}
                      name={doc.name}
                      badge="Contrato Importado"
                      hasNotes={!!doc.reviewNotes}
                      onClick={() => setViewingItem({ type: 'document', id: doc.id })}
                    />
                  ))}
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic text-center p-4">
                  Nenhum contrato vinculado a este imóvel.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {scanningSp ? (
          <div className="flex items-center justify-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg bg-muted/20">
            <Loader2 className="w-5 h-5 animate-spin mr-3 text-primary" />
            Buscando arquivos físicos adicionais vinculados a este imóvel no SharePoint...
          </div>
        ) : spFiles.length > 0 ? (
          <Card className="shadow-sm border-purple-200 mt-6 animate-fade-in-up">
            <CardHeader className="bg-purple-50/50 pb-4 border-b border-purple-100">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-900">
                <FolderSearch className="h-5 w-5 text-purple-600" /> Arquivos Físicos no SharePoint
              </CardTitle>
              <CardDescription>
                Resultado da pesquisa híbrida automática na pasta do imóvel e arredores
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {spFiles.map((file) => {
                const isDocStore = documents.some((d) => d.name === file.name)
                const isContractStore = contracts.some((c) => c.documentName === file.name)
                if (isDocStore || isContractStore) return null

                return (
                  <DocItem
                    key={file.id}
                    name={file.name}
                    badge="SharePoint Online"
                    onClick={() => window.open(file.webUrl, '_blank')}
                  />
                )
              })}
              {spFiles.filter(
                (f) =>
                  !documents.some((d) => d.name === f.name) &&
                  !contracts.some((c) => c.documentName === f.name),
              ).length === 0 && (
                <p className="col-span-full text-sm text-muted-foreground italic text-center p-2">
                  Todos os arquivos encontrados já estão listados nos cards acima.
                </p>
              )}
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
          <Button variant="outline" onClick={() => setSelectedHub(null)}>
            Voltar para Lista
          </Button>
          <Button variant="destructive" onClick={() => setRejectId(selectedHub.id)}>
            <X className="h-4 w-4 mr-2" /> Rejeitar Documentação
          </Button>

          {hasPendingNotes ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-block cursor-not-allowed w-full sm:w-auto">
                  <Button
                    className="bg-emerald-600/50 text-white pointer-events-none w-full"
                    tabIndex={-1}
                  >
                    <Check className="h-4 w-4 mr-2" /> Aprovar e Enviar p/ Vistoria
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-destructive text-destructive-foreground border-destructive">
                <p className="font-semibold text-sm mb-1">Aprovação Bloqueada</p>
                <p className="text-xs">
                  Existem anotações pendentes nos documentos. Rejeite o dossiê para correções.
                </p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
              onClick={() => handleApprove(selectedHub.id)}
            >
              <Check className="h-4 w-4 mr-2" /> Aprovar e Enviar p/ Vistoria
            </Button>
          )}
        </div>

        <DocumentViewer
          open={!!viewingItem}
          onClose={() => setViewingItem(null)}
          viewItem={viewingItem}
        />

        <Dialog open={!!rejectId} onOpenChange={(val) => !val && setRejectId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" /> Rejeitar Documentação
              </DialogTitle>
              <DialogDescription>
                Informe o motivo da rejeição. As notas inseridas individualmente nos documentos
                serão enviadas aos gestores automaticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Ex: Faltou enviar o verso do RG ou o comprovante está ilegível..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectId(null)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleRejectConfirm}>
                Confirmar Rejeição
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const renderList = (items: any[], type: 'interessado' | 'locatario') => {
    if (items.length === 0) {
      return (
        <Card className="p-12 text-center text-muted-foreground flex flex-col items-center shadow-sm">
          <Check className="h-12 w-12 mb-4 text-emerald-500 opacity-50" />
          <p className="text-lg font-medium text-foreground">Todas as análises concluídas!</p>
          <p>Não há documentação pendente nesta categoria.</p>
        </Card>
      )
    }

    return (
      <div className="grid gap-4">
        {items.map((item) => {
          const breached = isSlaBreached(item.slaStart, store.settings.slaHours)
          return (
            <Card
              key={item.id}
              className={`flex flex-col md:flex-row gap-4 p-5 items-center md:items-start ${
                breached ? 'border-destructive bg-destructive/5' : ''
              }`}
            >
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      breached ? 'bg-destructive/20' : 'bg-primary/10'
                    }`}
                  >
                    <UserCheck
                      className={`h-6 w-6 ${breached ? 'text-destructive' : 'text-primary'}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5 flex flex-wrap gap-x-2 gap-y-1">
                      <span>
                        ID:{' '}
                        <span className="font-mono bg-muted px-1 py-0.5 rounded">{item.id}</span>
                      </span>
                      <span>
                        • {type === 'interessado' ? 'Interessado' : 'Locatário'}:{' '}
                        <strong>{item.tenant || 'Aguardando'}</strong>
                      </span>
                      {(item as any).guarantor_id && (
                        <span>
                          •{' '}
                          <Badge variant="secondary" className="text-xs h-5">
                            Com Fiador
                          </Badge>
                        </span>
                      )}
                    </p>
                    <div className="flex gap-2 pt-3 flex-wrap">
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-600 bg-amber-50"
                      >
                        Análise Gerencial
                      </Badge>
                      {item.isResubmission && (
                        <Badge
                          variant="outline"
                          className="border-purple-500 text-purple-700 bg-purple-50 animate-in fade-in"
                        >
                          <ArrowLeftRight className="w-3 h-3 mr-1" /> Nova Análise (Retorno)
                        </Badge>
                      )}
                      {breached && (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertCircle className="w-3 h-3 mr-1" /> SLA Violado (&gt;{' '}
                          {store.settings.slaHours}h)
                        </Badge>
                      )}
                      {item.slaStart && !breached && (
                        <span className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> SLA Em Dia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-56 shrink-0 mt-4 md:mt-0">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  onClick={() => setSelectedHub(item)}
                >
                  <FolderOpen className="h-4 w-4 mr-2" /> Analisar Dossiê
                </Button>
                <p className="text-xs text-center text-muted-foreground px-2">
                  Acesse os documentos reais vinculados
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise do Gerente</h1>
        <p className="text-muted-foreground">
          Abra o Hub de Validação para conferir a documentação completa de proprietários,
          interessados e locatários antes da vistoria.
        </p>
      </div>

      <Tabs defaultValue="interessados" className="w-full">
        <TabsList className="mb-4 grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="interessados">Interessados ({interessados.length})</TabsTrigger>
          <TabsTrigger value="locatarios">Locatários ({locatarios.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="interessados" className="mt-0">
          {renderList(interessados, 'interessado')}
        </TabsContent>
        <TabsContent value="locatarios" className="mt-0">
          {renderList(locatarios, 'locatario')}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ManagerApproval
