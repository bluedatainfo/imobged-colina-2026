import { useSyncExternalStore } from 'react'

export type RoleSettings = {
  managementEmails: string
  administrativeEmails: string
  operationalEmails: string
  slaHours: number
}

export type SharePointSettings = {
  siteUrl: string
  tenantId: string
  teamsWebhookUrl?: string
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

export type InspectionData = { propertyId: string; wallCondition: string; furnitureNotes: string }
export type PropertyStatus =
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
}

type State = {
  settings: RoleSettings
  sharepoint: SharePointSettings
  properties: Property[]
  auditLogs: AuditLog[]
  inspectionsData: Record<string, InspectionData>
}

let state: State = {
  settings: {
    managementEmails: 'gerencia@imobged.com',
    administrativeEmails: 'admin@imobged.com',
    operationalEmails: 'operacao@imobged.com',
    slaHours: 24,
  },
  sharepoint: {
    siteUrl: 'https://imobged.sharepoint.com/sites/GestaoDeLocacao',
    tenantId: 'a1b2c3d4-e5f6',
    teamsWebhookUrl: 'https://imobged.webhook.office.com/teams',
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
    },
    {
      id: '103',
      title: 'Casa Jardim',
      address: 'Rua dos Ipês, 45',
      type: 'Residencial',
      status: 'Confecção de Contrato',
      image: 'https://img.usecurling.com/p/400/300?q=house',
      tenant: 'Maria Souza',
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
}

export default function useMainStore() {
  return useSyncExternalStore(mainStore.subscribe, mainStore.getState)
}

export const isSlaBreached = (slaStart: string | undefined, slaHours: number) => {
  if (!slaStart) return false
  return (Date.now() - new Date(slaStart).getTime()) / (1000 * 60 * 60) > slaHours
}
