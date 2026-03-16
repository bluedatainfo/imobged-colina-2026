import { useSyncExternalStore } from 'react'

export type ContractStatus =
  | 'Rascunho'
  | 'Em Análise'
  | 'Aprovado para Ajuste'
  | 'Finalizado'
  | 'Aguardando Assinatura'
  | 'Ativo'
  | 'Aguardando Renovação'
  | 'Rescisão em Andamento'
  | 'Rescindido'

export type DocuSignStatus = 'Sent' | 'Viewed' | 'Signed' | null

export type LeaseContract = {
  id: string
  propertyId: string
  tenantName: string
  template: string
  status: ContractStatus
  documentName: string
  updatedAt: string
  expirationDate?: string
  docusignStatus?: DocuSignStatus
  isCritical?: boolean
  managerApproval?: boolean
}

type State = {
  contracts: LeaseContract[]
}

let state: State = {
  contracts: [
    {
      id: 'CTR-001',
      propertyId: '101',
      tenantName: 'João Pedro',
      template: 'Apartamento Padrão (Caução)',
      status: 'Ativo',
      documentName: 'Contrato_Joao_Pedro.docx',
      updatedAt: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      docusignStatus: 'Signed',
    },
    {
      id: 'CTR-002',
      propertyId: '103',
      tenantName: 'Maria Souza',
      template: 'Residencial (Fiador - Alto Padrão)',
      status: 'Aguardando Assinatura',
      documentName: 'Minuta_Maria_Souza.docx',
      updatedAt: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      docusignStatus: null,
      isCritical: true, // Requires workflow approval
      managerApproval: false,
    },
    {
      id: 'CTR-003',
      propertyId: '104',
      tenantName: 'Carlos Silva',
      template: 'Comercial Padrão',
      status: 'Ativo',
      documentName: 'Contrato_Carlos_Silva.docx',
      updatedAt: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      docusignStatus: 'Signed',
    },
  ],
}

let listeners: Array<() => void> = []
const emit = () => listeners.forEach((l) => l())

export const contractsStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  addContract: (c: Omit<LeaseContract, 'id' | 'updatedAt'>) => {
    const newContract = {
      ...c,
      id: `CTR-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      updatedAt: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    }
    state = { ...state, contracts: [newContract, ...state.contracts] }
    emit()
  },
  updateStatus: (id: string, status: ContractStatus) => {
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c,
      ),
    }
    emit()
  },
  updateDocuSignStatus: (id: string, docusignStatus: DocuSignStatus) => {
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, docusignStatus, updatedAt: new Date().toISOString() } : c,
      ),
    }
    emit()
  },
  approveCriticalContract: (id: string) => {
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, managerApproval: true, updatedAt: new Date().toISOString() } : c,
      ),
    }
    emit()
  },
  extendExpiration: (id: string, days: number) => {
    state = {
      ...state,
      contracts: state.contracts.map((c) => {
        if (c.id === id) {
          const newDate = c.expirationDate ? new Date(c.expirationDate) : new Date()
          newDate.setDate(newDate.getDate() + days)
          return {
            ...c,
            expirationDate: newDate.toISOString(),
            updatedAt: new Date().toISOString(),
          }
        }
        return c
      }),
    }
    emit()
  },
}

export default function useContractsStore() {
  return useSyncExternalStore(contractsStore.subscribe, contractsStore.getState)
}
