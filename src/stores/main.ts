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
  libraries: { contracts: string; ownerDocs: string; tenantDocs: string }
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
}

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

const getInitialSlaStart = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString()

let state: State = {
  settings: {
    managementEmails: 'gerencia@imobged.onmicrosoft.com',
    administrativeEmails: 'admin@imobged.onmicrosoft.com',
    operationalEmails: 'operacao@imobged.onmicrosoft.com',
    slaHours: 24,
  },
  sharepoint: {
    siteUrl: 'https://imobged.sharepoint.com/sites/GestaoDeLocacao',
    tenantId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    libraries: {
      contracts: 'Contratos',
      ownerDocs: 'Documentos de Proprietários',
      tenantDocs: 'Documentos de Inquilinos',
    },
    lists: {
      processControl: 'Dados Contratuais',
      auditLog: 'Audit Log',
    },
  },
  properties: [
    {
      id: '101',
      title: 'Apartamento Centro',
      address: 'Rua das Flores, 123',
      type: 'Residencial',
      status: 'Análise Gerencial',
      image: 'https://img.usecurling.com/p/400/300?q=apartment',
      slaStart: getInitialSlaStart(36),
      tenant: 'João Pedro',
    },
    {
      id: '102',
      title: 'Sala Comercial',
      address: 'Av. Paulista, 1000',
      type: 'Comercial',
      status: 'Análise Gerencial',
      image: 'https://img.usecurling.com/p/400/300?q=office',
      slaStart: getInitialSlaStart(10),
      tenant: 'Empresa Alpha Ltda',
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
      action: 'Upload SharePoint',
      user: 'Ana Silva',
      timestamp: getInitialSlaStart(36),
    },
    {
      id: 'log2',
      propertyId: '102',
      action: 'Upload SharePoint',
      user: 'Carlos Santos',
      timestamp: getInitialSlaStart(10),
    },
  ],
  inspectionsData: {
    '103': {
      propertyId: '103',
      wallCondition: 'Pintura nova',
      furnitureNotes: 'Cozinha com armários intactos',
    },
  },
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
      properties: state.properties.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              slaStart: status === 'Análise Gerencial' ? new Date().toISOString() : undefined,
            }
          : p,
      ),
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
