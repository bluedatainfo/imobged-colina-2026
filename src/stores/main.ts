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
  tenantId: string
  teamsWebhookUrl?: string
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

export type AuditLog = {
  id: string
  propertyId: string
  action: string
  user: string
  timestamp: string
  details?: string
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
}

type State = {
  agencyProfile: AgencyProfile
  settings: RoleSettings
  sharepoint: SharePointSettings
  properties: Property[]
  auditLogs: AuditLog[]
  inspectionsData: Record<string, InspectionData>
}

let state: State = {
  agencyProfile: {
    name: 'Imobiliária Prime',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    website: 'https://imobiliariaprime.com.br',
    logo: 'https://img.usecurling.com/i?q=building&shape=lineal-color&color=blue',
    primaryColor: '#0f172a',
  },
  settings: {
    managementEmails: 'gerencia@imobged.com',
    administrativeEmails: 'admin@imobged.com',
    operationalEmails: 'operacao@imobged.com',
    slaHours: 24,
  },
  sharepoint: {
    tenantId: 'a1b2c3d4-e5f6',
    teamsWebhookUrl: 'https://imobged.webhook.office.com/teams',
    sites: {
      locacao: 'https://imobged.sharepoint.com/sites/GestaoDeLocacao',
      captacao: 'https://imobged.sharepoint.com/sites/Captacao',
      vendas: 'https://imobged.sharepoint.com/sites/Vendas',
      juridico: 'https://imobged.sharepoint.com/sites/Juridico',
      financeiro: 'https://imobged.sharepoint.com/sites/Financeiro',
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
    },
    {
      id: '103',
      title: 'Casa Jardim',
      address: 'Rua dos Ipês, 45',
      type: 'Residencial',
      status: 'Confecção de Contrato',
      image: 'https://img.usecurling.com/p/400/300?q=house',
      tenant: 'Maria Souza',
      rentValue: 3200,
    },
    {
      id: '104',
      title: 'Sala Comercial',
      address: 'Av. Paulista, 1000',
      type: 'Comercial',
      status: 'Disponível para Locação',
      image: 'https://img.usecurling.com/p/400/300?q=office',
      rentValue: 4800,
    },
  ],
  auditLogs: [
    {
      id: 'log1',
      propertyId: '101',
      action: 'Upload SP',
      user: 'Ana',
      timestamp: new Date().toISOString(),
    },
  ],
  inspectionsData: {},
}

let listeners: Array<() => void> = []
const emit = () => listeners.forEach((l) => l())

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
    state = { ...state, inspectionsData: { ...state.inspectionsData, [data.propertyId]: data } }
    emit()
  },
  addProperty: (property: Omit<Property, 'id' | 'status' | 'image'>) => {
    const newProperty: Property = {
      ...property,
      id: Math.floor(Math.random() * 1000).toString(),
      status: 'Pendente/Rascunho',
      image: `https://img.usecurling.com/p/400/300?q=${property.type === 'Comercial' ? 'office' : 'house'}`,
    }
    state = { ...state, properties: [...state.properties, newProperty] }
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
