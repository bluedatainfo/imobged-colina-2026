import { useSyncExternalStore } from 'react'

export type ContractStatus =
  | 'Rascunho'
  | 'Em Análise'
  | 'Aprovado para Ajuste'
  | 'Finalizado'
  | 'Aguardando Assinatura'
  | 'Ativo'
  | 'Aguardando Renovação'

export type LeaseContract = {
  id: string
  propertyId: string
  tenantName: string
  template: string
  status: ContractStatus
  documentName: string
  updatedAt: string
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
    },
    {
      id: 'CTR-002',
      propertyId: '103',
      tenantName: 'Maria Souza',
      template: 'Residencial (Fiador)',
      status: 'Rascunho',
      documentName: 'Minuta_Maria_Souza.docx',
      updatedAt: new Date().toISOString(),
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
}

export default function useContractsStore() {
  return useSyncExternalStore(contractsStore.subscribe, contractsStore.getState)
}
