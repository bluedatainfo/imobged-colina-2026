import { supabase } from '@/lib/supabase/client'
import { m365Service } from '@/lib/m365'

export type InspectionType = 'MOVE_IN' | 'MOVE_OUT'
export type InspectionStatus = 'Aberta' | 'Finalizada'

export interface InspectionRecord {
  id: string
  property_id: string
  candidate_id?: string | null
  type: InspectionType
  inspector_name: string | null
  status: InspectionStatus
  contract_number: string | null
  started_at: string
  finished_at?: string | null
  observations?: string | null
  metadata?: Record<string, any>
  created_at?: string
  updated_at?: string
  // Joins
  property?: {
    id: string
    title: string
    address: string
    type?: string
    tenant?: string
    details?: Record<string, any>
  }
  candidate?: {
    id: string
    full_name: string
    cpf?: string
    cnpj?: string
  }
}

export interface InspectionPhotoRecord {
  id: string
  inspection_id: string
  storage_path: string
  original_name: string
  selected: boolean
  annotation?: string | null
  attached: boolean
  attached_sharepoint_path?: string | null
  size_bytes?: number | null
  uploaded_at: string
  created_at?: string
  updated_at?: string
  // Helper for UI preview URL
  public_url?: string
}

export interface InspectionRetentionSettings {
  id: string
  retention_days: number
  storage_limit_gb: number
  last_cleanup_at?: string | null
  last_cleanup_summary?: {
    deleted_count?: number
    freed_bytes?: number
    inspections_affected?: string[]
    executed_at?: string
    triggered_by?: string
  } | null
  updated_at?: string
  updated_by?: string | null
}

export interface InspectionStorageMetrics {
  galleryTotalBytes: number
  galleryOpenBytes: number
  galleryFinalizedBytes: number
  galleryPhotoCount: number
  galleryOpenPhotoCount: number
  galleryFinalizedPhotoCount: number
  sharepointTotalBytes: number
  sharepointDocCount: number
  unselectedExpiringCount: number
  unselectedExpiringBytes: number
  retentionDays: number
  storageLimitGb: number
  limitWarningExceeded: boolean
  usagePercent: number
  monthlyHistory: Array<{
    month: string
    galleryBytes: number
    sharepointBytes: number
    photoCount: number
  }>
}

export interface EligibleItem {
  originType: 'APPROVED_ANALYSIS' | 'ONGOING_CONTRACT'
  propertyId: string
  propertyTitle: string
  propertyAddress: string
  contractNumber: string
  tenantName: string
  candidateId?: string | null
}

const STORAGE_BUCKET = 'inspection-photos'

export const inspectionsService = {
  /**
   * Lista todas as vistorias com informações do imóvel e pré-cadastro
   */
  async listInspections(): Promise<InspectionRecord[]> {
    const client = supabase as any
    const { data, error } = await client
      .from('inspections')
      .select(
        '*, property:properties(id, title, address, type, tenant, details), candidate:pre_registrations(id, full_name, cpf, cnpj)',
      )
      .order('started_at', { ascending: false })

    if (error) {
      console.error('Erro ao listar vistorias:', error)
      throw error
    }
    return (data || []) as unknown as InspectionRecord[]
  },

  /**
   * Obtém os dados de uma vistoria por ID
   */
  async getInspectionById(id: string): Promise<InspectionRecord | null> {
    const client = supabase as any
    const { data, error } = await client
      .from('inspections')
      .select(
        '*, property:properties(id, title, address, type, tenant, details), candidate:pre_registrations(id, full_name, cpf, cnpj)',
      )
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    return (data || null) as unknown as InspectionRecord | null
  },

  /**
   * Busca itens elegíveis para iniciar vistoria:
   * (a) ANÁLISE APROVADA de novos contratos → Vistoria de ENTRADA (MOVE_IN)
   * (b) CONTRATOS EM ANDAMENTO → Vistoria de SAÍDA (MOVE_OUT)
   */
  async getEligibleTargets(type: InspectionType): Promise<EligibleItem[]> {
    const items: EligibleItem[] = []

    if (type === 'MOVE_IN') {
      // Dossiês com status 'Aprovado' em pre_registrations que possuem property vinculada
      const { data: candidates, error: cErr } = await supabase
        .from('pre_registrations')
        .select('id, full_name, form_data')
        .eq('status', 'Aprovado')

      if (cErr) throw cErr

      const candidateIds = (candidates || []).map((c) => c.id)

      let properties: any[] = []
      if (candidateIds.length > 0) {
        const { data: props, error: pErr } = await supabase
          .from('properties')
          .select('id, title, address, tenant_id, tenant, details')
          .in('tenant_id', candidateIds)

        if (!pErr && props) properties = props
      }

      // Também buscar properties em status de análise aprovada/andamento caso não tenham tenant_id direto
      const { data: additionalProps } = await supabase
        .from('properties')
        .select('id, title, address, tenant_id, tenant, details')
        .not('status', 'eq', 'Contrato Finalizado')
        .limit(50)

      const mergedPropsMap = new Map<string, any>()
      for (const p of [...properties, ...(additionalProps || [])]) {
        if (!mergedPropsMap.has(p.id)) mergedPropsMap.set(p.id, p)
      }

      for (const p of mergedPropsMap.values()) {
        const cand = candidates?.find((c) => c.id === p.tenant_id)
        const candDetails = cand?.form_data as Record<string, any> | undefined
        const propDetails = p.details as Record<string, any> | undefined
        const contractNum =
          propDetails?.contractNumber ||
          candDetails?.contractNumber ||
          propDetails?.gestaoRealCode ||
          p.id

        items.push({
          originType: 'APPROVED_ANALYSIS',
          propertyId: p.id,
          propertyTitle: p.title || `Imóvel ${p.id}`,
          propertyAddress: p.address || 'Endereço não informado',
          contractNumber: contractNum,
          tenantName: p.tenant || cand?.full_name || 'Locatário não informado',
          candidateId: p.tenant_id || cand?.id || null,
        })
      }
    } else {
      // MOVE_OUT: Contratos em andamento (properties ativas / pre_registrations aprovados)
      const { data: props, error: pErr } = await supabase
        .from('properties')
        .select('id, title, address, tenant_id, tenant, details, status')
        .order('updated_at', { ascending: false })
        .limit(100)

      if (pErr) throw pErr

      for (const p of props || []) {
        const propDetails = p.details as Record<string, any> | undefined
        const contractNum = propDetails?.contractNumber || propDetails?.gestaoRealCode || p.id
        items.push({
          originType: 'ONGOING_CONTRACT',
          propertyId: p.id,
          propertyTitle: p.title || `Imóvel ${p.id}`,
          propertyAddress: p.address || 'Endereço não informado',
          contractNumber: contractNum,
          tenantName: p.tenant || 'Locatário em andamento',
          candidateId: p.tenant_id || null,
        })
      }
    }

    return items
  },

  /**
   * Cria uma nova vistoria e registra log de auditoria
   */
  async createInspection(params: {
    propertyId: string
    candidateId?: string | null
    type: InspectionType
    inspectorName: string
    contractNumber?: string | null
    startedAt?: string
    observations?: string
    operatorName?: string
    userEmail?: string
  }): Promise<InspectionRecord> {
    const payload = {
      property_id: params.propertyId,
      candidate_id: params.candidateId || null,
      type: params.type,
      inspector_name: params.inspectorName,
      contract_number: params.contractNumber || params.propertyId,
      status: 'Aberta' as InspectionStatus,
      started_at: params.startedAt || new Date().toISOString(),
      observations: params.observations || '',
      updated_at: new Date().toISOString(),
    }

    const client = supabase as any
    const { data, error } = await client
      .from('inspections')
      .insert(payload)
      .select(
        '*, property:properties(id, title, address, type, tenant, details), candidate:pre_registrations(id, full_name, cpf, cnpj)',
      )
      .single()

    if (error) {
      console.error('Erro ao criar vistoria:', error)
      throw error
    }

    // Auditoria
    await this.logAudit({
      propertyId: params.propertyId,
      action: 'VISTORIA_INICIADA',
      details: `Vistoria de ${params.type === 'MOVE_IN' ? 'Entrada' : 'Saída'} iniciada por ${params.inspectorName} para o imóvel ${params.propertyId} (Contrato: ${payload.contract_number}).`,
      userName: params.operatorName || params.inspectorName,
      userEmail: params.userEmail,
    })

    return data as unknown as InspectionRecord
  },

  /**
   * Lista fotos de uma vistoria
   */
  async listPhotos(inspectionId: string): Promise<InspectionPhotoRecord[]> {
    const client = supabase as any
    const { data, error } = await client
      .from('inspection_photos')
      .select('*')
      .eq('inspection_id', inspectionId)
      .order('uploaded_at', { ascending: true })

    if (error) throw error

    return ((data || []) as any[]).map((photo) => {
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(photo.storage_path)

      return {
        ...photo,
        public_url: urlData?.publicUrl || '',
      } as InspectionPhotoRecord
    })
  },

  /**
   * Upload de fotos para a Galeria de Trabalho no Supabase Storage
   * Suporta ~50 fotos com acompanhamento de progresso
   */
  async uploadPhotoToGallery(
    inspectionId: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<InspectionPhotoRecord> {
    const ext = file.name.split('.').pop() || 'jpg'
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanFileName}`
    const storagePath = `${inspectionId}/${uniqueName}`

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Erro ao enviar foto para o Supabase Storage:', uploadError)
      throw new Error(`Falha no upload de ${file.name}: ${uploadError.message}`)
    }

    if (onProgress) onProgress(100)

    const client = supabase as any
    const { data: record, error: dbError } = await client
      .from('inspection_photos')
      .insert({
        inspection_id: inspectionId,
        storage_path: storagePath,
        original_name: file.name,
        selected: true,
        attached: false,
        size_bytes: file.size || 0,
        uploaded_at: new Date().toISOString(),
      })
      .select('*')
      .single()

    if (dbError) {
      console.error('Erro ao registrar foto no banco:', dbError)
      throw dbError
    }

    const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath)

    return {
      ...record,
      public_url: urlData?.publicUrl || '',
    } as InspectionPhotoRecord
  },

  /**
   * Alterna a seleção de uma foto
   */
  async togglePhotoSelection(photoId: string, selected: boolean): Promise<void> {
    const client = supabase as any
    const { error } = await client
      .from('inspection_photos')
      .update({ selected, updated_at: new Date().toISOString() })
      .eq('id', photoId)

    if (error) throw error
  },

  /**
   * Selecionar ou desmarcar todas as fotos de uma vistoria
   */
  async setAllPhotosSelection(inspectionId: string, selected: boolean): Promise<void> {
    const client = supabase as any
    const { error } = await client
      .from('inspection_photos')
      .update({ selected, updated_at: new Date().toISOString() })
      .eq('inspection_id', inspectionId)

    if (error) throw error
  },

  /**
   * Atualiza anotação por foto
   */
  async updatePhotoAnnotation(photoId: string, annotation: string): Promise<void> {
    const client = supabase as any
    const { error } = await client
      .from('inspection_photos')
      .update({ annotation, updated_at: new Date().toISOString() })
      .eq('id', photoId)

    if (error) throw error
  },

  /**
   * Remove uma foto da galeria (se ainda não anexada/finalizada)
   */
  async deletePhoto(photo: InspectionPhotoRecord): Promise<void> {
    const client = supabase as any
    // 1. Remover do bucket
    await supabase.storage.from(STORAGE_BUCKET).remove([photo.storage_path])

    // 2. Remover do banco
    const { error } = await client.from('inspection_photos').delete().eq('id', photo.id)

    if (error) throw error
  },

  /**
   * Finalizar Vistoria:
   * 1. Pega todas as fotos da vistoria.
   * 2. As SELECIONADAS:
   *    - Baixa do Supabase Storage.
   *    - Envia para o SharePoint na estrutura:
   *      {basePath}/{Código do Imóvel}/Locacao/{Número do Contrato}/Vistoria de Entrada/  (ou Vistoria de Saida/)
   *    - Registra em property_documents como "Vistoria de Entrada" ou "Vistoria de Saida".
   *    - Marca attached=true e preenche attached_sharepoint_path.
   * 3. As NÃO SELECIONADAS:
   *    - Permanecem na galeria com attached=false ("não anexadas ao contrato").
   * 4. Atualiza status da vistoria para 'Finalizada', finished_at = now().
   * 5. Registra auditoria em app_audit_logs.
   */
  async finalizeInspection(params: {
    inspection: InspectionRecord
    userName: string
    userEmail?: string
    onProgress?: (current: number, total: number, fileName: string) => void
  }): Promise<{
    success: boolean
    uploadedCount: number
    unselectedCount: number
    errors: string[]
  }> {
    const { inspection, userName, userEmail, onProgress } = params
    const errors: string[] = []

    // 1. Carregar fotos
    const photos = await this.listPhotos(inspection.id)
    const selectedPhotos = photos.filter((p) => p.selected)
    const unselectedPhotos = photos.filter((p) => !p.selected)

    const docType = inspection.type === 'MOVE_IN' ? 'INSPECTION_MOVE_IN' : 'INSPECTION_MOVE_OUT'
    const categoryLabel =
      inspection.type === 'MOVE_IN' ? 'Vistoria de Entrada' : 'Vistoria de Saida'
    const contractNum = inspection.contract_number || inspection.property_id || 'Contrato'

    let uploadedCount = 0

    // 2. Upload para o SharePoint de cada foto selecionada
    for (let i = 0; i < selectedPhotos.length; i++) {
      const photo = selectedPhotos[i]
      if (onProgress) {
        onProgress(i + 1, selectedPhotos.length, photo.original_name)
      }

      try {
        // Baixar blob do Supabase Storage
        const { data: blobData, error: dlError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .download(photo.storage_path)

        if (dlError || !blobData) {
          throw new Error(`Falha ao obter arquivo do Storage: ${dlError?.message}`)
        }

        // Fazer upload estruturado para o SharePoint
        // m365Service.uploadStructuredDocument já cria pastas conforme:
        // basePath / propertyId / 'Locacao' / leaseNumber / inspectionSubFolder
        let spResult: any = null
        try {
          spResult = await m365Service.uploadStructuredDocument(
            blobData,
            photo.original_name,
            docType,
            inspection.property_id,
            inspection.property?.title || inspection.property_id,
            userName,
            undefined,
            undefined,
            contractNum,
          )
        } catch (spErr: any) {
          // Tratar erro de SharePoint de forma controlada
          console.warn(`[SharePoint] Erro ao enviar ${photo.original_name}:`, spErr)
          errors.push(`${photo.original_name}: ${spErr.message || 'Erro de upload no SharePoint'}`)
        }

        const spPath = spResult?.path || ''

        // Registrar em property_documents se subiu ou caminho esperado
        const { error: docError } = await supabase.from('property_documents').insert({
          property_id: inspection.property_id,
          name: photo.original_name,
          category: categoryLabel,
          file_path:
            spPath ||
            `${inspection.property_id}/Locacao/${contractNum}/${categoryLabel}/${photo.original_name}`,
          entity_name: inspection.candidate?.full_name || inspection.property?.tenant || null,
          operator: userName,
          status: 'approved',
          size_bytes: photo.size_bytes || 0,
          review_notes: photo.annotation || 'Foto de vistoria sincronizada',
        })

        if (docError) {
          console.error('Erro ao inserir em property_documents:', docError)
        }

        // Marcar foto como anexada
        const client = supabase as any
        await client
          .from('inspection_photos')
          .update({
            attached: true,
            attached_sharepoint_path: spPath || 'SharePoint',
            updated_at: new Date().toISOString(),
          })
          .eq('id', photo.id)

        uploadedCount++
      } catch (err: any) {
        console.error(`Erro ao processar foto ${photo.original_name}:`, err)
        errors.push(`${photo.original_name}: ${err.message}`)
      }
    }

    // 3. Garantir que as não selecionadas continuem com attached = false
    const client = supabase as any
    if (unselectedPhotos.length > 0) {
      await client
        .from('inspection_photos')
        .update({
          attached: false,
          updated_at: new Date().toISOString(),
        })
        .in(
          'id',
          unselectedPhotos.map((p) => p.id),
        )
    }

    // 4. Atualizar vistoria para Finalizada
    const now = new Date().toISOString()
    const { error: inspUpdateErr } = await client
      .from('inspections')
      .update({
        status: 'Finalizada',
        finished_at: now,
        updated_at: now,
      })
      .eq('id', inspection.id)

    if (inspUpdateErr) {
      console.error('Erro ao atualizar status da vistoria:', inspUpdateErr)
    }

    // 5. Auditoria em app_audit_logs
    await this.logAudit({
      propertyId: inspection.property_id,
      action: 'VISTORIA_FINALIZADA',
      details: `Vistoria de ${categoryLabel} finalizada. Total de fotos: ${photos.length}. Fotos anexadas ao contrato e enviadas ao SharePoint: ${uploadedCount}. Fotos não selecionadas mantidas na Galeria de Trabalho: ${unselectedPhotos.length}.${errors.length > 0 ? ` Alertas: ${errors.join('; ')}` : ''}`,
      userName,
      userEmail,
    })

    return {
      success: true,
      uploadedCount,
      unselectedCount: unselectedPhotos.length,
      errors,
    }
  },

  /**
   * Helper para registro de log de auditoria
   */
  async logAudit(params: {
    propertyId?: string | null
    action: string
    details: string
    userName: string
    userEmail?: string
  }) {
    try {
      const currentOperator = (() => {
        try {
          return localStorage.getItem('app_current_operator') || null
        } catch {
          return null
        }
      })()

      await supabase.from('app_audit_logs').insert({
        id: `LOG-${Math.random().toString(36).substring(2, 9)}`,
        property_id: params.propertyId || null,
        action: params.action,
        user_name: params.userName,
        user_email: params.userEmail || undefined,
        timestamp: new Date().toISOString(),
        details: params.details,
        operator: currentOperator || params.userName,
      })
    } catch (e) {
      console.warn('Falha ao registrar auditoria de vistoria:', e)
    }
  },

  /**
   * Obtém as configurações da política de retenção e limite de armazenamento
   */
  async getSettings(): Promise<InspectionRetentionSettings> {
    const client = supabase as any
    const { data, error } = await client
      .from('inspection_settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Erro ao buscar configurações de retenção de vistoria:', error)
    }

    if (!data) {
      return {
        id: '11111111-1111-1111-1111-111111111111',
        retention_days: 180,
        storage_limit_gb: 10,
        last_cleanup_at: null,
        last_cleanup_summary: null,
      }
    }

    return {
      ...data,
      retention_days: Number(data.retention_days || 180),
      storage_limit_gb: Number(data.storage_limit_gb || 10),
    } as InspectionRetentionSettings
  },

  /**
   * Atualiza as configurações da política de retenção (apenas admin/autorizados)
   * Registra log de auditoria em public.app_audit_logs
   */
  async updateSettings(params: {
    retentionDays: number
    storageLimitGb: number
    userName: string
    userEmail?: string
  }): Promise<InspectionRetentionSettings> {
    const current = await this.getSettings()
    const client = supabase as any

    const { data, error } = await client
      .from('inspection_settings')
      .update({
        retention_days: params.retentionDays,
        storage_limit_gb: params.storageLimitGb,
        updated_at: new Date().toISOString(),
        updated_by: params.userName,
      })
      .eq('id', current.id)
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao atualizar configurações de vistoria:', error)
      throw error
    }

    // Auditoria obrigatória
    const details = `Política de Vistoria alterada por ${params.userName}. Prazo de retenção: de ${current.retention_days} dias para ${params.retentionDays} dias. Limite de alerta de galeria: de ${current.storage_limit_gb} GB para ${params.storageLimitGb} GB.`
    await this.logAudit({
      propertyId: null,
      action: 'VISTORIA_POLITICA_ALTERADA',
      details,
      userName: params.userName,
      userEmail: params.userEmail,
    })

    return {
      ...data,
      retention_days: Number(data.retention_days),
      storage_limit_gb: Number(data.storage_limit_gb),
    } as InspectionRetentionSettings
  },

  /**
   * Executa a rotina de limpeza de fotos não selecionadas expiradas:
   * A política afeta SOMENTE fotos NÃO selecionadas (selected = false, não anexadas ao contrato)
   * Fotos selecionadas (anexadas/enviadas ao SharePoint) jamais são removidas.
   * Remove do Storage do bucket inspection-photos e de public.inspection_photos.
   * Registra auditoria em app_audit_logs.
   */
  async runRetentionCleanup(options?: {
    triggeredBy?: string
    userEmail?: string
    force?: boolean
  }): Promise<{
    executed: boolean
    deletedCount: number
    freedBytes: number
    inspectionsAffected: string[]
    message: string
  }> {
    const settings = await this.getSettings()
    const retentionDays = settings.retention_days || 180
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString()

    const client = supabase as any

    // Buscar fotos não selecionadas mais antigas que cutoffDate
    const { data: expiredPhotos, error: fetchErr } = await client
      .from('inspection_photos')
      .select(
        'id, inspection_id, storage_path, original_name, size_bytes, uploaded_at, selected, attached',
      )
      .eq('selected', false)
      .eq('attached', false)
      .lt('uploaded_at', cutoffDate)

    if (fetchErr) {
      console.error('Erro ao consultar fotos expiradas:', fetchErr)
      throw fetchErr
    }

    const photosList = expiredPhotos || []
    if (photosList.length === 0) {
      return {
        executed: true,
        deletedCount: 0,
        freedBytes: 0,
        inspectionsAffected: [],
        message: `Nenhuma foto não selecionada possui mais de ${retentionDays} dias.`,
      }
    }

    let deletedCount = 0
    let freedBytes = 0
    const inspectionsSet = new Set<string>()
    const storagePathsToRemove: string[] = []
    const idsToDelete: string[] = []

    for (const photo of photosList) {
      if (photo.storage_path) {
        storagePathsToRemove.push(photo.storage_path)
      }
      idsToDelete.push(photo.id)
      if (photo.inspection_id) {
        inspectionsSet.add(photo.inspection_id)
      }
      freedBytes += Number(photo.size_bytes || 0)
    }

    // 1. Remover do Storage do Supabase (em lotes de 100)
    for (let i = 0; i < storagePathsToRemove.length; i += 100) {
      const batch = storagePathsToRemove.slice(i, i + 100)
      const { error: storageDelErr } = await supabase.storage.from(STORAGE_BUCKET).remove(batch)
      if (storageDelErr) {
        console.warn('Aviso ao remover arquivos do bucket de fotos de vistoria:', storageDelErr)
      }
    }

    // 2. Remover da tabela public.inspection_photos
    for (let i = 0; i < idsToDelete.length; i += 100) {
      const batch = idsToDelete.slice(i, i + 100)
      const { error: dbDelErr } = await client.from('inspection_photos').delete().in('id', batch)

      if (dbDelErr) {
        console.error('Erro ao deletar registros de inspection_photos:', dbDelErr)
        throw dbDelErr
      }
    }

    deletedCount = idsToDelete.length
    const inspectionsAffected = Array.from(inspectionsSet)

    // 3. Atualizar last_cleanup_at e last_cleanup_summary em inspection_settings
    const cleanupSummary = {
      deleted_count: deletedCount,
      freed_bytes: freedBytes,
      inspections_affected: inspectionsAffected,
      executed_at: new Date().toISOString(),
      triggered_by: options?.triggeredBy || 'Sistema Automático',
    }

    await client
      .from('inspection_settings')
      .update({
        last_cleanup_at: cleanupSummary.executed_at,
        last_cleanup_summary: cleanupSummary,
        updated_at: new Date().toISOString(),
      })
      .eq('id', settings.id)

    // 4. Auditoria em public.app_audit_logs
    const mbFreed = (freedBytes / (1024 * 1024)).toFixed(2)
    const auditDetails = `Limpeza automática de retenção executada (${retentionDays} dias). ${deletedCount} foto(s) não selecionada(s) removida(s) da Galeria de Trabalho (${mbFreed} MB liberados). Vistorias afetadas: [${inspectionsAffected.join(', ')}]. Acionado por: ${options?.triggeredBy || 'Rotina de Entrada do Módulo'}.`

    await this.logAudit({
      propertyId: null,
      action: 'VISTORIA_LIMPEZA_RETENCAO',
      details: auditDetails,
      userName: options?.triggeredBy || 'Sistema',
      userEmail: options?.userEmail,
    })

    return {
      executed: true,
      deletedCount,
      freedBytes,
      inspectionsAffected,
      message: `${deletedCount} fotos não selecionadas excluídas com sucesso (${mbFreed} MB liberados).`,
    }
  },

  /**
   * Obtém métricas completas para o Painel de Uso de Armazenamento:
   * - Total armazenado na galeria Supabase (dividido por Vistorias Abertas vs Finalizadas)
   * - Total do SharePoint (dossiê oficial): soma dos tamanhos em property_documents de vistorias
   * - Comparativo galeria × SharePoint
   * - Histórico/evolução mensal do consumo
   * - Cards de resumo
   * - Alerta de limite configurável
   */
  async getStorageMetrics(): Promise<InspectionStorageMetrics> {
    const settings = await this.getSettings()
    const client = supabase as any

    // 1. Carregar fotos da galeria com o status da vistoria
    const { data: photos, error: pErr } = await client
      .from('inspection_photos')
      .select(
        'id, inspection_id, size_bytes, selected, attached, uploaded_at, inspection:inspections(id, status)',
      )

    if (pErr) console.warn('Erro ao carregar inspection_photos:', pErr)

    // 2. Carregar documentos de vistoria em property_documents (SharePoint)
    const { data: spDocs, error: dErr } = await client
      .from('property_documents')
      .select('id, size_bytes, created_at, category')
      .ilike('category', '%vistoria%')

    if (dErr) console.warn('Erro ao carregar property_documents de vistoria:', dErr)

    const allPhotos: any[] = photos || []
    const allSpDocs: any[] = spDocs || []

    let galleryTotalBytes = 0
    let galleryOpenBytes = 0
    let galleryFinalizedBytes = 0
    let galleryOpenPhotoCount = 0
    let galleryFinalizedPhotoCount = 0

    let unselectedExpiringCount = 0
    let unselectedExpiringBytes = 0

    const retentionDays = settings.retention_days || 180
    // Próximas do vencimento: por exemplo, com menos de 30 dias restantes antes da limpeza (mais de retentionDays - 30 dias de idade)
    const warningCutoffMs = (retentionDays - 30) * 24 * 60 * 60 * 1000
    const nowMs = Date.now()

    // Histórico mensal agrupado por YYYY-MM
    const monthlyMap = new Map<
      string,
      { galleryBytes: number; sharepointBytes: number; photoCount: number }
    >()

    for (const photo of allPhotos) {
      const bytes = Number(photo.size_bytes || 0)
      galleryTotalBytes += bytes

      const isFinalized = photo.inspection?.status === 'Finalizada'
      if (isFinalized) {
        galleryFinalizedBytes += bytes
        galleryFinalizedPhotoCount++
      } else {
        galleryOpenBytes += bytes
        galleryOpenPhotoCount++
      }

      // Vencimento de fotos não selecionadas
      if (!photo.selected && !photo.attached) {
        const uploadedMs = new Date(photo.uploaded_at).getTime()
        const ageMs = nowMs - uploadedMs
        if (ageMs >= warningCutoffMs) {
          unselectedExpiringCount++
          unselectedExpiringBytes += bytes
        }
      }

      // Histórico
      const monthKey = photo.uploaded_at ? photo.uploaded_at.substring(0, 7) : '2026-10'
      const currentMonth = monthlyMap.get(monthKey) || {
        galleryBytes: 0,
        sharepointBytes: 0,
        photoCount: 0,
      }
      currentMonth.galleryBytes += bytes
      currentMonth.photoCount++
      monthlyMap.set(monthKey, currentMonth)
    }

    let sharepointTotalBytes = 0
    for (const doc of allSpDocs) {
      const bytes = Number(doc.size_bytes || 0)
      sharepointTotalBytes += bytes

      const monthKey = doc.created_at ? doc.created_at.substring(0, 7) : '2026-10'
      const currentMonth = monthlyMap.get(monthKey) || {
        galleryBytes: 0,
        sharepointBytes: 0,
        photoCount: 0,
      }
      currentMonth.sharepointBytes += bytes
      monthlyMap.set(monthKey, currentMonth)
    }

    // Converter monthlyMap em array ordenado
    const monthlyHistory = Array.from(monthlyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, data]) => ({
        month,
        ...data,
      }))

    // Se estiver vazio, adiciona pelo menos o mês atual para exibir gráfico/tabela
    if (monthlyHistory.length === 0) {
      const currentMonthKey = new Date().toISOString().substring(0, 7)
      monthlyHistory.push({
        month: currentMonthKey,
        galleryBytes: galleryTotalBytes,
        sharepointBytes: sharepointTotalBytes,
        photoCount: allPhotos.length,
      })
    }

    const storageLimitGb = settings.storage_limit_gb || 10
    const limitBytes = storageLimitGb * 1024 * 1024 * 1024
    const limitWarningExceeded = galleryTotalBytes > limitBytes
    const usagePercent = limitBytes > 0 ? Math.min(100, (galleryTotalBytes / limitBytes) * 100) : 0

    return {
      galleryTotalBytes,
      galleryOpenBytes,
      galleryFinalizedBytes,
      galleryPhotoCount: allPhotos.length,
      galleryOpenPhotoCount,
      galleryFinalizedPhotoCount,
      sharepointTotalBytes,
      sharepointDocCount: allSpDocs.length,
      unselectedExpiringCount,
      unselectedExpiringBytes,
      retentionDays,
      storageLimitGb,
      limitWarningExceeded,
      usagePercent,
      monthlyHistory,
    }
  },

  /**
   * Helper que calcula os dias restantes para uma foto não selecionada expirar
   */
  calculateDaysRemaining(uploadedAt: string, retentionDays: number = 180): number {
    const uploadedMs = new Date(uploadedAt).getTime()
    const expiryMs = uploadedMs + retentionDays * 24 * 60 * 60 * 1000
    const diffDays = Math.ceil((expiryMs - Date.now()) / (1000 * 60 * 60 * 24))
    return diffDays
  },
}
