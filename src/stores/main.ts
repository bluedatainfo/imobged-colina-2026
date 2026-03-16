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
    {
      id: '104',
      title: 'Sala Comercial',
      address: 'Av. Paulista, 1000',
      type: 'Comercial',
      status: 'Disponível para Locação',
      image: 'https://img.usecurling.com/p/400/300?q=office',
      rentValue: 4800,
      location: { x: 80, y: 80 },
    },
    {
      id: '105',
      title: 'Galpão Industrial',
      address: 'Rodovia BR-116, Km 42',
      type: 'Comercial',
      status: 'Vistoria',
      image: 'https://img.usecurling.com/p/400/300?q=warehouse',
      location: { x: 20, y: 80 },
    },
  ],
  auditLogs: [
    {
      id: 'log1',
      propertyId: '101',
      action: 'Upload SP (Contrato_Locacao.pdf)',
      user: 'Ana Silva',
      userEmail: 'ana.silva@imobged.com',
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.0.10',
    },
    {
      id: 'log2',
      action: 'Login efetuado com sucesso',
      user: 'Carlos Santos',
      userEmail: 'carlos.santos@imobged.com',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: '172.16.254.1',
    },
    {
      id: 'log3',
      action: 'Visualização de Documento (RG_Locatario_Joao.pdf)',
      user: 'Mariana Costa',
      userEmail: 'mariana.costa@imobged.com',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ipAddress: '10.0.0.15',
    },
    {
      id: 'log4',
      action: 'Configurações de Segurança Atualizadas',
      user: 'Ana Silva',
      userEmail: 'ana.silva@imobged.com',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      ipAddress: '192.168.0.10',
    },
  ],
  inspectionsData: {},
  maintenanceTickets: [
    {
      id: 'MT-8821',
      propertyId: '104',
      address: 'Av. Paulista, 1000',
      item: 'Elétrica',
      notes: 'Quadro de força com disjuntores desarmando sozinhos.',
      photo: 'https://img.usecurling.com/p/200/200?q=electrical',
      status: 'Pendente',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'MT-8822',
      propertyId: '101',
      address: 'Rua Flores, 123',
      item: 'Hidráulica',
      notes: 'Vazamento no banheiro social.',
      photo: null,
      status: 'Em Andamento',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 'MT-8823',
      propertyId: '102',
      address: 'Rua das Margaridas, 88',
      item: 'Pintura',
      notes: 'Pintura descascando na sala de estar.',
      photo: 'https://img.usecurling.com/p/200/200?q=wall',
      status: 'Concluído',
      createdAt: new Date(Date.now() - 432000000).toISOString(),
    },
    {
      id: 'MT-8824',
      propertyId: '103',
      address: 'Rua dos Ipês, 45',
      item: 'Estrutural',
      notes: 'Rachadura na varanda externa.',
      photo: null,
      status: 'Pendente',
      createdAt: new Date(Date.now() - 50000000).toISOString(),
    },
    {
      id: 'MT-8825',
      propertyId: '101',
      address: 'Rua Flores, 123',
      item: 'Elétrica',
      notes: 'Tomada em curto na cozinha.',
      photo: null,
      status: 'Concluído',
      createdAt: new Date(Date.now() - 250000000).toISOString(),
    },
    {
      id: 'MT-8826',
      propertyId: '105',
      address: 'Rodovia BR-116, Km 42',
      item: 'Estrutural',
      notes: 'Goteira identificada no galpão principal.',
      photo: 'https://img.usecurling.com/p/200/200?q=roof',
      status: 'Em Andamento',
      createdAt: new Date(Date.now() - 90000000).toISOString(),
    },
  ],
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
    state = { ...state, inspectionsData: { ...state.inspectionsData, [data.propertyId]: data } }
    emit()
  },
  addProperty: (property: Omit<Property, 'id' | 'status' | 'image'>) => {
    const newProperty: Property = {
      ...property,
      id: Math.floor(Math.random() * 1000).toString(),
      status: 'Pendente/Rascunho',
      image: `https://img.usecurling.com/p/400/300?q=${property.type === 'Comercial' ? 'office' : 'house'}`,
      location: { x: Math.floor(Math.random() * 80) + 10, y: Math.floor(Math.random() * 80) + 10 },
    }
    state = { ...state, properties: [...state.properties, newProperty] }
    emit()
  },
  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: `MT-${Math.floor(Math.random() * 10000)}`,
      status: 'Pendente',
      createdAt: new Date().toISOString(),
    }
    state = { ...state, maintenanceTickets: [newTicket, ...state.maintenanceTickets] }
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
