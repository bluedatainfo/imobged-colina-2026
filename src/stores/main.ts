import { useSyncExternalStore } from 'react'

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

const STORAGE_KEY = '@imobged/config_v1'

const loadState = (): State => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultState, ...parsed }
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage', e)
  }
  return defaultState
}

let state: State = loadState()
let listeners: Array<() => void> = []

const emit = () => {
  try {
    // Persist configuration settings dynamically
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        agencyProfile: state.agencyProfile,
        settings: state.settings,
        sharepoint: state.sharepoint,
        security: state.security,
      }),
    )
  } catch (e) {
    console.warn('Failed to persist state', e)
  }
  listeners.forEach((l) => l())
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
  },
  updateSettings: (s: Partial<RoleSettings>) => {
    state = { ...state, settings: { ...state.settings, ...s } }
    emit()
  },
  updateSharePointSettings: (s: Partial<SharePointSettings>) => {
    state = { ...state, sharepoint: { ...state.sharepoint, ...s } }
    emit()
  },
  updateSecuritySettings: (s: Partial<SecuritySettings>) => {
    state = { ...state, security: { ...state.security, ...s } }
    emit()
  },
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    }
    state = { ...state, auditLogs: [newLog, ...state.auditLogs] }
    emit()
  },
  updatePropertyStatus: (id: string, status: PropertyStatus) => {
    state = {
      ...state,
      properties: state.properties.map((p) => (p.id === id ? { ...p, status } : p)),
    }
    emit()
  },
  saveInspection: (data: InspectionData) => {
    state = {
      ...state,
      inspectionsData: { ...state.inspectionsData, [data.propertyId]: data },
    }
    emit()
  },
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => {
    state = {
      ...state,
      maintenanceTickets: state.maintenanceTickets.map((t) => (t.id === id ? { ...t, status } : t)),
    }
    emit()
  },
}

export default function useMainStore() {
  return useSyncExternalStore(mainStore.subscribe, mainStore.getState)
}

export const isSlaBreached = (slaStart: string | undefined, slaHours: number) => {
  if (!slaStart) return false
  return (Date.now() - new Date(slaStart).getTime()) / (1000 * 60 * 60) > slaHours
}
