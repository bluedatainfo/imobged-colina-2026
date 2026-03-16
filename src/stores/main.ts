import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase'

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
  properties: [
    {
      id: '101',
      title: 'Apto Centro',
      address: 'Rua Flores, 123',
      type: 'Residencial',
      status: 'Análise Gerencial',
      image: 'https://img.usecurling.com/p/400/300?q=apartment',
      tenant: 'João Pedro',
      rentValue: 2500,
      location: { x: 30, y: 40 },
    },
    {
      id: '102',
      title: 'Casa Vila Nova',
      address: 'Rua das Margaridas, 88',
      type: 'Residencial',
      status: 'Vistoria',
      image: 'https://img.usecurling.com/p/400/300?q=house',
      tenant: 'Carlos Silva',
      location: { x: 55, y: 65 },
      slaStart: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '103',
      title: 'Casa Jardim',
      address: 'Rua dos Ipês, 45',
      type: 'Residencial',
      status: 'Confecção de Contrato',
      image: 'https://img.usecurling.com/p/400/300?q=house+modern',
      tenant: 'Maria Souza',
      rentValue: 3200,
      location: { x: 75, y: 25 },
    },
  ],
  auditLogs: [
    {
      id: 'log1',
      propertyId: '101',
      action: 'Upload SP (Contrato_Locacao.pdf)',
      user: 'Admin Sistema',
      userEmail: 'admin@ismailabdo.onmicrosoft.com',
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.0.10',
    },
  ],
  inspectionsData: {},
  maintenanceTickets: [],
}

let state: State = { ...defaultState }
let listeners: Array<() => void> = []

export const initMainStore = async () => {
  const configs = await supabase.get('app_config')
  let configData = Array.isArray(configs) ? configs.find((c: any) => c.id === 'default') : null

  if (!configData) {
    configData = {
      id: 'default',
      agencyProfile: defaultState.agencyProfile,
      settings: defaultState.settings,
      sharepoint: defaultState.sharepoint,
      security: defaultState.security,
    }
    await supabase.upsert('app_config', configData)
  }

  const properties = await supabase.get('app_properties')
  const auditLogs = await supabase.get('app_audit_logs')
  const inspections = await supabase.get('app_inspections')
  const maintenanceTickets = await supabase.get('app_maintenance')

  const inspectionsData = Array.isArray(inspections)
    ? inspections.reduce((acc: any, val: any) => {
        acc[val.propertyId] = val
        return acc
      }, {})
    : {}

  state = {
    ...state,
    agencyProfile: configData.agencyProfile || defaultState.agencyProfile,
    settings: configData.settings || defaultState.settings,
    sharepoint: configData.sharepoint || defaultState.sharepoint,
    security: configData.security || defaultState.security,
    properties:
      Array.isArray(properties) && properties.length ? properties : defaultState.properties,
    auditLogs: Array.isArray(auditLogs) && auditLogs.length ? auditLogs : defaultState.auditLogs,
    inspectionsData: Object.keys(inspectionsData).length
      ? inspectionsData
      : defaultState.inspectionsData,
    maintenanceTickets:
      Array.isArray(maintenanceTickets) && maintenanceTickets.length
        ? maintenanceTickets
        : defaultState.maintenanceTickets,
  }

  if (!Array.isArray(properties) || !properties.length) {
    for (const p of defaultState.properties) {
      await supabase.upsert('app_properties', p)
    }
  }
  if (!Array.isArray(auditLogs) || !auditLogs.length) {
    for (const a of defaultState.auditLogs) {
      await supabase.upsert('app_audit_logs', a)
    }
  }

  emit()
}

const emit = () => {
  listeners.forEach((l) => l())
}

const syncConfig = () => {
  supabase.upsert('app_config', {
    id: 'default',
    agencyProfile: state.agencyProfile,
    settings: state.settings,
    sharepoint: state.sharepoint,
    security: state.security,
  })
}

export const mainStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
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
  updateSecuritySettings: (s: Partial<SecuritySettings>) => {
    state = { ...state, security: { ...state.security, ...s } }
    emit()
    syncConfig()
  },
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    }
    state = { ...state, auditLogs: [newLog, ...state.auditLogs] }
    emit()
    supabase.upsert('app_audit_logs', newLog)
  },
  updatePropertyStatus: (id: string, status: PropertyStatus) => {
    state = {
      ...state,
      properties: state.properties.map((p) => (p.id === id ? { ...p, status } : p)),
    }
    emit()
    supabase.patch('app_properties', id, { status })
  },
  saveInspection: (data: InspectionData) => {
    state = {
      ...state,
      inspectionsData: { ...state.inspectionsData, [data.propertyId]: data },
    }
    emit()
    supabase.upsert('app_inspections', data, 'propertyId')
  },
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => {
    state = {
      ...state,
      maintenanceTickets: state.maintenanceTickets.map((t) => (t.id === id ? { ...t, status } : t)),
    }
    emit()
    supabase.patch('app_maintenance', id, { status })
  },
}

export default function useMainStore() {
  return useSyncExternalStore(mainStore.subscribe, mainStore.getState)
}

export const isSlaBreached = (slaStart: string | undefined, slaHours: number) => {
  if (!slaStart) return false
  return (Date.now() - new Date(slaStart).getTime()) / (1000 * 60 * 60) > slaHours
}
