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
}

export type SiteKey = 'locacao' | 'captacao' | 'vendas' | 'juridico' | 'financeiro'

export type SharePointSettings = {
  primaryDomain: string
  sharepointDomain: string
  tenantName: string
  teamsWebhookUrl?: string
  clientId?: string
  tenantId?: string
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

type State = {
  agencyProfile: AgencyProfile
  settings: RoleSettings
  sharepoint: SharePointSettings
  security: SecuritySettings
  properties: Property[]
  auditLogs: AuditLog[]
  inspectionsData: Record<string, InspectionData>
  maintenanceTickets: MaintenanceTicket[]
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
  },
  sharepoint: {
    primaryDomain: 'ismailabdo.onmicrosoft.com',
    sharepointDomain: 'ismailabdo.sharepoint.com',
    tenantName: 'Ismail Abdo Corp',
    teamsWebhookUrl: 'https://ismailabdo.onmicrosoft.com.webhook.office.com/teams/alertas-gerais',
    clientId: '',
    tenantId: '',
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
      sites: ap.sites || defaultState.sharepoint.sites,
      libraries: ap.libraries || defaultState.sharepoint.libraries,
      lists: ap.lists || defaultState.sharepoint.lists,
    }
    state.agencyProfile = ap.agencyProfile || defaultState.agencyProfile
    state.settings = (settingsData.role_settings as any) || defaultState.settings
    state.security = (settingsData.security_settings as any) || defaultState.security
  } else {
    // Only attempt to insert if we have an active session to satisfy RLS
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
      }
      const { data } = await supabase.from('app_settings').insert(payload).select('id').single()
      if (data) settingsId = data.id
    }
  }

  const { data: properties } = await supabase.from('properties').select('*')
  if (properties && properties.length > 0) {
    state.properties = properties.map((p) => ({
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
    }))
  }

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
  if (!sessionData?.session?.user) return // prevent anon updates

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
    updated_at: new Date().toISOString(),
  }

  if (settingsId) {
    await supabase.from('app_settings').update(payload).eq('id', settingsId)
  } else {
    // Attempt to select the most recent row to ensure upsert-like behavior
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
  addProperty: (p: Omit<Property, 'id' | 'status' | 'image'>) => {
    const newProperty: Property = {
      ...p,
      id: `PROP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      status: 'Pendente/Rascunho',
      image: 'https://img.usecurling.com/p/400/300?q=house',
    }
    state = { ...state, properties: [newProperty, ...state.properties] }
    emit()
    supabase
      .from('properties')
      .insert({
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
      })
      .then()
  },
  updatePropertyStatus: (id: string, status: PropertyStatus) => {
    state = {
      ...state,
      properties: state.properties.map((p) => (p.id === id ? { ...p, status } : p)),
    }
    emit()
    supabase.from('properties').update({ status }).eq('id', id).then()
  },
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: `LOG-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    }
    state = { ...state, auditLogs: [newLog, ...state.auditLogs] }
    emit()
    supabase
      .from('app_audit_logs')
      .insert({
        id: newLog.id,
        property_id: newLog.propertyId,
        action: newLog.action,
        user_name: newLog.user,
        user_email: newLog.userEmail,
        timestamp: newLog.timestamp,
        details: newLog.details,
        ip_address: newLog.ipAddress,
      })
      .then()
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
