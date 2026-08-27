import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

export type AgencyProfile = {
  name: string
  address: string
  website: string
  logo: string
  primaryColor: string
}

export type RoleSettings = {
  managementEmails: string
  administrativeEmails: string
  operationalEmails: string
  slaHours: number
  spIntegrationRoles?: string[]
  rbac?: Record<string, string[]>
}

export type SiteKey = 'locacao' | 'captacao' | 'vendas' | 'juridico' | 'financeiro'

export type SharePointSettings = {
  primaryDomain: string
  sharepointDomain: string
  tenantName: string
  teamsWebhookUrl?: string
  clientId?: string
  tenantId?: string
  creatorEmail?: string
  sites: Record<SiteKey, string>
  libraries: {
    contracts: string
    ownerDocs: string
    tenantDocs: string
    archive: string
    templates: string
  }
  lists: { processControl: string; auditLog: string }
}

export type SecuritySettings = {
  restrictDomain: boolean
  allowedIps: string
  requireManagedDevice: boolean
}

export type AuditLog = {
  id: string
  propertyId?: string
  action: string
  user: string
  userEmail?: string
  timestamp: string
  details?: string
  ipAddress?: string
  operator?: string | null
}

export type InspectionData = {
  propertyId: string
  wallCondition: string
  furnitureNotes: string
  generalNotes?: string
}

export type PropertyStatus =
  | 'Disponível para Locação'
  | 'Pendente/Rascunho'
  | 'Análise Gerencial'
  | 'Vistoria'
  | 'Confecção de Contrato'
  | 'Assinatura'

export type Property = {
  id: string
  title: string
  address: string
  type: string
  status: PropertyStatus
  image: string
  slaStart?: string
  tenant?: string
  rentValue?: number
  location?: { x: number; y: number }
  ownerId?: string
  isResubmission?: boolean
  erpData?: any
}

export type MaintenanceStatus = 'Pendente' | 'Em Andamento' | 'Concluído'

export type MaintenanceTicket = {
  id: string
  propertyId: string
  address: string
  item: string
  notes: string
  photo: string | null
  status: MaintenanceStatus
  createdAt: string
}

export type MenuOrderSettings = Record<string, string[]>

type State = {
  agencyProfile: AgencyProfile
  settings: RoleSettings
  sharepoint: SharePointSettings
  security: SecuritySettings
  menuOrder: MenuOrderSettings
  properties: Property[]
  auditLogs: AuditLog[]
  inspectionsData: Record<string, InspectionData>
  maintenanceTickets: MaintenanceTicket[]
}

const defaultRbac: Record<string, string[]> = {
  Admin: ['all'],
  Diretor: ['all'],
  Caixa: ['/', '/caixa', '/profile'],
  Gerente: [
    '/',
    '/entities',
    '/documents',
    '/additional-documents',
    '/document-alerts',
    '/sync-monitor',
    '/manager-approval',
    '/analysis-pending',
    '/inspections',
    '/keys',
    '/contracts',
    '/properties',
    '/maintenance',
    '/renewals',
    '/legal',
    '/sales',
    '/financial',
    '/profile',
    '/templates',
    '/ongoing-contracts',
  ],
  Vistoriador: [
    '/',
    '/properties',
    '/inspections',
    '/keys',
    '/profile',
    '/ongoing-contracts',
    '/analysis-pending',
  ],
  Jurídico: [
    '/',
    '/documents',
    '/additional-documents',
    '/document-alerts',
    '/contracts',
    '/properties',
    '/legal',
    '/profile',
    '/templates',
    '/ongoing-contracts',
    '/analysis-pending',
  ],
  Financeiro: [
    '/',
    '/entities',
    '/documents',
    '/additional-documents',
    '/document-alerts',
    '/properties',
    '/renewals',
    '/maintenance',
    '/financial',
    '/profile',
    '/ongoing-contracts',
    '/analysis-pending',
  ],
  'Gestor de Contrato': [
    '/',
    '/manager-approval',
    '/analysis-pending',
    '/contracts',
    '/documents',
    '/additional-documents',
    '/document-alerts',
    '/properties',
    '/inspections',
    '/renewals',
    '/keys',
    '/entities',
    '/profile',
    '/ongoing-contracts',
  ],
  Corretor: ['/', '/properties', '/sales', '/profile', '/ongoing-contracts', '/analysis-pending'],
}

const defaultState: State = {
  agencyProfile: {
    name: 'Imobiliária Prime',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    website: 'https://imobiliariaprime.com.br',
    logo: 'https://img.usecurling.com/i?q=building&shape=lineal-color&color=blue',
    primaryColor: '#0f172a',
  },
  settings: {
    managementEmails: 'gerencia@ismailabdo.onmicrosoft.com',
    administrativeEmails: 'admin@ismailabdo.onmicrosoft.com',
    operationalEmails: 'operacao@ismailabdo.onmicrosoft.com',
    slaHours: 24,
    spIntegrationRoles: [
      'Admin',
      'Diretor',
      'Gerente',
      'Vistoriador',
      'Jurídico',
      'Financeiro',
      'Gestor de Contrato',
      'Corretor',
    ],
    rbac: defaultRbac,
  },
  sharepoint: {
    primaryDomain: 'ismailabdo.onmicrosoft.com',
    sharepointDomain: 'ismailabdo.sharepoint.com',
    tenantName: 'Ismail Abdo Corp',
    teamsWebhookUrl: 'https://ismailabdo.onmicrosoft.com.webhook.office.com/teams/alertas-gerais',
    clientId: '',
    tenantId: '',
    creatorEmail: 'administracao@imobiliariacolina.com.br',
    sites: {
      locacao: 'https://ismailabdo.sharepoint.com/sites/locacao',
      captacao: 'https://ismailabdo.sharepoint.com/sites/captacao',
      vendas: 'https://ismailabdo.sharepoint.com/sites/vendas',
      juridico: 'https://ismailabdo.sharepoint.com/sites/juridico',
      financeiro: 'https://ismailabdo.sharepoint.com/sites/financeiro',
    },
    libraries: {
      contracts: 'Contratos',
      ownerDocs: 'Doc Proprietários',
      tenantDocs: 'Doc Inquilinos',
      archive: 'Arquivo Permanente',
      templates: 'Modelos de Contrato',
    },
    lists: { processControl: 'Dados Contratuais', auditLog: 'Audit Log' },
  },
  security: {
    restrictDomain: true,
    allowedIps: '',
    requireManagedDevice: false,
  },
  menuOrder: {},
  properties: [],
  auditLogs: [],
  inspectionsData: {},
  maintenanceTickets: [],
}

let state: State = { ...defaultState }
let listeners: Array<() => void> = []
let settingsId: string | null = null

export const initMainStore = async () => {
  const { data: settingsData } = await supabase
    .from('app_settings')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (settingsData) {
    settingsId = settingsData.id
    const ap = (settingsData.agency_profile as any) || {}
    state.sharepoint = {
      primaryDomain: settingsData.default_domain || '',
      sharepointDomain: ap.sharepointDomain || '',
      tenantName: ap.tenantName || '',
      teamsWebhookUrl: ap.teamsWebhookUrl || '',
      clientId: settingsData.client_id || '',
      tenantId: settingsData.tenant_id || '',
      creatorEmail:
        (settingsData.module_settings as any)?.creator_email ||
        'administracao@imobiliariacolina.com.br',
      sites: ap.sites || defaultState.sharepoint.sites,
      libraries: ap.libraries || defaultState.sharepoint.libraries,
      lists: ap.lists || defaultState.sharepoint.lists,
    }
    state.agencyProfile = ap.agencyProfile || defaultState.agencyProfile

    let rbac = (settingsData.role_settings as any)?.rbac || defaultState.settings.rbac
    if (!rbac['Admin']?.includes('all')) rbac['Admin'] = ['all']

    const patchRole = (role: string, paths: string[]) => {
      if (rbac[role]) {
        let missing = paths.filter((p) => !rbac[role].includes(p))
        if (missing.length > 0) rbac[role] = [...rbac[role], ...missing]
      }
    }

    patchRole('Gerente', ['/sales', '/financial', '/additional-documents'])
    patchRole('Caixa', ['/caixa'])
    patchRole('Financeiro', ['/financial', '/additional-documents'])
    patchRole('Corretor', ['/sales'])
    patchRole('Gerente', ['/ongoing-contracts'])
    patchRole('Vistoriador', ['/ongoing-contracts'])
    patchRole('Jurídico', ['/ongoing-contracts', '/additional-documents'])
    patchRole('Financeiro', ['/ongoing-contracts'])
    patchRole('Gestor de Contrato', ['/ongoing-contracts', '/additional-documents'])
    patchRole('Corretor', ['/ongoing-contracts'])
    // Pendências de Análise: mesma permissão de Análise da Gerência
    patchRole('Gerente', ['/analysis-pending'])
    patchRole('Gestor de Contrato', ['/analysis-pending'])
    patchRole('Diretor', ['/analysis-pending'])
    patchRole('Vistoriador', ['/analysis-pending'])
    patchRole('Jurídico', ['/analysis-pending'])
    patchRole('Financeiro', ['/analysis-pending'])
    patchRole('Corretor', ['/analysis-pending'])
    patchRole('Caixa', ['/analysis-pending'])

    state.settings = {
      ...defaultState.settings,
      ...(settingsData.role_settings as any),
      rbac,
    }
    state.security = (settingsData.security_settings as any) || defaultState.security
    state.menuOrder = ((settingsData as any).menu_order as MenuOrderSettings) || {}
  } else {
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData?.session?.user) {
      const payload = {
        default_domain: state.sharepoint.primaryDomain,
        client_id: state.sharepoint.clientId,
        tenant_id: state.sharepoint.tenantId,
        agency_profile: {
          agencyProfile: state.agencyProfile,
          sharepointDomain: state.sharepoint.sharepointDomain,
          tenantName: state.sharepoint.tenantName,
          teamsWebhookUrl: state.sharepoint.teamsWebhookUrl,
          sites: state.sharepoint.sites,
          libraries: state.sharepoint.libraries,
          lists: state.sharepoint.lists,
        },
        role_settings: state.settings as any,
        security_settings: state.security as any,
        menu_order: state.menuOrder as any,
      }
      const { data } = await supabase.from('app_settings').insert(payload).select('id').single()
      if (data) settingsId = data.id
    }
  }

  const { data: properties } = await supabase.from('properties').select('*')
  let combinedProperties: Property[] = []

  if (properties && properties.length > 0) {
    combinedProperties = properties.map((p) => ({
      id: p.id,
      title: p.title,
      address: p.address,
      type: p.type,
      status: p.status as PropertyStatus,
      image: p.image || '',
      slaStart: p.sla_start || undefined,
      tenant: p.tenant || undefined,
      rentValue: p.rent_value ? Number(p.rent_value) : undefined,
      location:
        p.location_x && p.location_y
          ? { x: Number(p.location_x), y: Number(p.location_y) }
          : undefined,
      ownerId: (p as any).owner_id || undefined,
      isResubmission: (p as any).is_resubmission || false,
    }))
  }

  state.properties = combinedProperties

  const { data: auditLogs } = await supabase
    .from('app_audit_logs')
    .select('*')
    .order('timestamp', { ascending: false })
  if (auditLogs && auditLogs.length > 0) {
    state.auditLogs = auditLogs.map((a) => ({
      id: a.id,
      propertyId: a.property_id || undefined,
      action: a.action || '',
      user: a.user_name || '',
      userEmail: a.user_email || undefined,
      timestamp: a.timestamp || new Date().toISOString(),
      details: a.details || undefined,
      ipAddress: a.ip_address || undefined,
      operator: a.operator ?? undefined,
    }))
  }

  const { data: inspections } = await supabase.from('inspections').select('*')
  if (inspections && inspections.length > 0) {
    state.inspectionsData = inspections.reduce(
      (acc, val) => {
        acc[val.property_id] = {
          propertyId: val.property_id,
          wallCondition: val.wall_condition || '',
          furnitureNotes: val.furniture_notes || '',
          generalNotes: val.general_notes || '',
        }
        return acc
      },
      {} as Record<string, InspectionData>,
    )
  }

  const { data: maintenance } = await supabase.from('maintenance').select('*')
  if (maintenance && maintenance.length > 0) {
    state.maintenanceTickets = maintenance.map((m) => ({
      id: m.id,
      propertyId: m.property_id || '',
      address: m.address || '',
      item: m.item || '',
      notes: m.notes || '',
      photo: m.photo,
      status: m.status as MaintenanceStatus,
      createdAt: m.created_at || new Date().toISOString(),
    }))
  }

  emit()
}

const emit = () => {
  listeners.forEach((l) => l())
}

const syncConfig = async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  if (!sessionData?.session?.user) return

  let existingModuleSettings: any = {}
  if (settingsId) {
    const { data: existingSettings } = await supabase
      .from('app_settings')
      .select('module_settings')
      .eq('id', settingsId)
      .maybeSingle()
    existingModuleSettings = (existingSettings?.module_settings as any) || {}
  }

  const payload = {
    default_domain: state.sharepoint.primaryDomain,
    client_id: state.sharepoint.clientId,
    tenant_id: state.sharepoint.tenantId,
    agency_profile: {
      agencyProfile: state.agencyProfile,
      sharepointDomain: state.sharepoint.sharepointDomain,
      tenantName: state.sharepoint.tenantName,
      teamsWebhookUrl: state.sharepoint.teamsWebhookUrl,
      sites: state.sharepoint.sites,
      libraries: state.sharepoint.libraries,
      lists: state.sharepoint.lists,
    },
    role_settings: state.settings as any,
    security_settings: state.security as any,
    menu_order: state.menuOrder as any,
    module_settings: {
      ...existingModuleSettings,
      creator_email: state.sharepoint.creatorEmail || 'administracao@imobiliariacolina.com.br',
    },
    updated_at: new Date().toISOString(),
  }

  if (settingsId) {
    await supabase.from('app_settings').update(payload).eq('id', settingsId)
  } else {
    const { data: existing } = await supabase
      .from('app_settings')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing) {
      settingsId = existing.id
      await supabase.from('app_settings').update(payload).eq('id', settingsId)
    } else {
      const { data } = await supabase.from('app_settings').insert(payload).select('id').single()
      if (data) settingsId = data.id
    }
  }
}

export const mainStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  reloadCoreConfig: async () => {
    try {
      const { data: coreData } = await supabase
        .from('app_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (coreData && (coreData.default_domain || coreData.client_id || coreData.tenant_id)) {
        state = {
          ...state,
          sharepoint: {
            ...state.sharepoint,
            primaryDomain: coreData.default_domain || state.sharepoint.primaryDomain,
            clientId: coreData.client_id || state.sharepoint.clientId,
            tenantId: coreData.tenant_id || state.sharepoint.tenantId,
          },
        }
        emit()
      }
    } catch (e) {
      console.error('Failed to reload core config', e)
    }
  },
  updateAgencyProfile: (s: Partial<AgencyProfile>) => {
    state = { ...state, agencyProfile: { ...state.agencyProfile, ...s } }
    emit()
    syncConfig()
  },
  updateSettings: (s: Partial<RoleSettings>) => {
    state = { ...state, settings: { ...state.settings, ...s } }
    emit()
    syncConfig()
  },
  updateSharePointSettings: (s: Partial<SharePointSettings>) => {
    state = { ...state, sharepoint: { ...state.sharepoint, ...s } }
    emit()
    syncConfig()
  },
  hydrateSharePointSettings: (s: Partial<SharePointSettings>) => {
    state = { ...state, sharepoint: { ...state.sharepoint, ...s } }
    emit()
  },
  updateSecuritySettings: (s: Partial<SecuritySettings>) => {
    state = { ...state, security: { ...state.security, ...s } }
    emit()
    syncConfig()
  },
  updateMenuOrder: async (role: string, paths: string[] | null) => {
    const updated = { ...state.menuOrder }
    if (paths === null) {
      delete updated[role]
    } else {
      updated[role] = paths
    }
    state = { ...state, menuOrder: updated }
    emit()
    await syncConfig()
  },
  addProperty: (p: Omit<Property, 'id' | 'status' | 'image' | 'isResubmission'>) => {
    const prefixMap: Record<string, string> = {
      Casa: 'CA',
      Sala: 'SA',
      Salão: 'SL',
      Galpão: 'GA',
      Garagem: 'GA',
      'Ponto Comercial': 'PO',
      Apartamento: 'AP',
      Prédio: 'PR',
    }
    const prefix = prefixMap[p.type] || 'IM'

    let max = 0
    state.properties.forEach((prop) => {
      if (prop.id.startsWith(prefix)) {
        const num = parseInt(prop.id.substring(prefix.length), 10)
        if (!isNaN(num) && num > max) max = num
      }
    })
    const newId = `${prefix}${(max + 1).toString().padStart(6, '0')}`

    const newProperty: Property = {
      ...p,
      id: newId,
      status: 'Pendente/Rascunho',
      image: 'https://img.usecurling.com/p/400/300?q=house',
      isResubmission: false,
    }
    state = { ...state, properties: [newProperty, ...state.properties] }
    emit()

    const insertPayload: any = {
      id: newProperty.id,
      title: newProperty.title,
      address: newProperty.address,
      type: newProperty.type,
      status: newProperty.status,
      image: newProperty.image,
      rent_value: newProperty.rentValue,
      location_x: newProperty.location?.x,
      location_y: newProperty.location?.y,
      tenant: newProperty.tenant,
      sla_start: newProperty.slaStart,
      owner_id: newProperty.ownerId,
      is_resubmission: newProperty.isResubmission,
    }

    supabase.from('properties').insert(insertPayload).then()
  },
  updatePropertyStatus: (id: string, status: PropertyStatus) => {
    state = {
      ...state,
      properties: state.properties.map((p) => (p.id === id ? { ...p, status } : p)),
    }
    emit()
    supabase.from('properties').update({ status }).eq('id', id).then()
  },
  updateProperty: (id: string, updates: Partial<Property>) => {
    state = {
      ...state,
      properties: state.properties.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }
    emit()
    const payload: any = {}
    if (updates.status !== undefined) payload.status = updates.status
    if (updates.tenant !== undefined) payload.tenant = updates.tenant
    if (updates.slaStart !== undefined) payload.sla_start = updates.slaStart
    if (updates.rentValue !== undefined) payload.rent_value = updates.rentValue
    if (updates.ownerId !== undefined) payload.owner_id = updates.ownerId
    if (updates.isResubmission !== undefined) payload.is_resubmission = updates.isResubmission

    if (Object.keys(payload).length > 0) {
      supabase.from('properties').update(payload).eq('id', id).then()
    }
  },
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: `LOG-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    }
    // Importa de forma dinâmica para evitar dependência circular com
    // mainStore (que pode ser referenciado por componentes do AuthContext).
    // Contas sem operadores gravam NULL; contas com operador gravam o nome.
    import('@/lib/operator').then(({ resolveOperatorForPersistence }) => {
      const newLogWithOperator = { ...newLog, operator: resolveOperatorForPersistence() }
      state = { ...state, auditLogs: [newLogWithOperator, ...state.auditLogs] }
      emit()
      supabase
        .from('app_audit_logs')
        .insert({
          id: newLogWithOperator.id,
          property_id: newLogWithOperator.propertyId,
          action: newLogWithOperator.action,
          user_name: newLogWithOperator.user,
          user_email: newLogWithOperator.userEmail,
          timestamp: newLogWithOperator.timestamp,
          details: newLogWithOperator.details,
          ip_address: newLogWithOperator.ipAddress,
          operator: newLogWithOperator.operator,
        })
        .then()
    })
  },
  saveInspection: (data: InspectionData) => {
    const isNew = !state.inspectionsData[data.propertyId]
    state = {
      ...state,
      inspectionsData: { ...state.inspectionsData, [data.propertyId]: data },
    }
    emit()
    supabase
      .from('inspections')
      .upsert({
        property_id: data.propertyId,
        wall_condition: data.wallCondition,
        furniture_notes: data.furnitureNotes,
        general_notes: data.generalNotes,
        updated_at: new Date().toISOString(),
      })
      .then()

    const prop = state.properties.find((p) => p.id === data.propertyId)
    import('@/lib/m365').then(({ m365Service }) => {
      m365Service.sendTeamsMessage(
        state.sharepoint.teamsWebhookUrl,
        `Vistoria ${isNew ? 'Registrada' : 'Concluída'} para o imóvel: ${prop?.title || data.propertyId}. Verifique no sistema: /properties/${data.propertyId}/dossier`,
      )
    })
  },
  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'createdAt'>) => {
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: `TKT-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    }
    state = { ...state, maintenanceTickets: [newTicket, ...state.maintenanceTickets] }
    emit()
    supabase
      .from('maintenance')
      .insert({
        id: newTicket.id,
        property_id: newTicket.propertyId,
        address: newTicket.address,
        item: newTicket.item,
        notes: newTicket.notes,
        photo: newTicket.photo,
        status: newTicket.status,
        created_at: newTicket.createdAt,
      })
      .then()
  },
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => {
    state = {
      ...state,
      maintenanceTickets: state.maintenanceTickets.map((t) => (t.id === id ? { ...t, status } : t)),
    }
    emit()
    supabase.from('maintenance').update({ status }).eq('id', id).then()
  },
}

export default function useMainStore() {
  return useSyncExternalStore(mainStore.subscribe, mainStore.getState)
}

export const isSlaBreached = (slaStart: string | undefined, slaHours: number) => {
  if (!slaStart) return false
  return (Date.now() - new Date(slaStart).getTime()) / (1000 * 60 * 60) > slaHours
}
