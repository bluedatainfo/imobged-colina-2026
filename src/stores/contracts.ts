import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

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
  reviewNotes?: string
  content?: string
}

type State = {
  contracts: LeaseContract[]
}

let state: State = { contracts: [] }
let listeners: Array<() => void> = []

export const initContractsStore = async () => {
  const { data } = await supabase.from('contracts').select('*')

  if (data && data.length > 0) {
    state.contracts = data.map((c: any) => ({
      id: c.id,
      propertyId: c.property_id || '',
      tenantName: c.tenant_name || '',
      template: c.template || '',
      status: c.status as ContractStatus,
      documentName: c.document_name || '',
      updatedAt: c.updated_at || new Date().toISOString(),
      expirationDate: c.expiration_date || undefined,
      docusignStatus: c.docusign_status as any,
      isCritical: c.is_critical || false,
      managerApproval: c.manager_approval || false,
      reviewNotes: c.review_notes || undefined,
      content: c.content || undefined,
    }))
  } else if (localStorage.getItem('app_user_id')) {
    const defaultContracts: LeaseContract[] = [
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
        isCritical: true,
        managerApproval: false,
      },
    ]
    state.contracts = defaultContracts
    for (const c of defaultContracts) {
      await supabase.from('contracts').insert({
        id: c.id,
        property_id: c.propertyId,
        tenant_name: c.tenantName,
        template: c.template,
        status: c.status,
        document_name: c.documentName,
        updated_at: c.updatedAt,
        expiration_date: c.expirationDate,
        docusign_status: c.docusignStatus,
        is_critical: c.isCritical,
        manager_approval: c.managerApproval,
        content: c.content,
      } as any)
    }
  }
  emit()
}

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
    supabase
      .from('contracts')
      .insert({
        id: newContract.id,
        property_id: newContract.propertyId,
        tenant_name: newContract.tenantName,
        template: newContract.template,
        status: newContract.status,
        document_name: newContract.documentName,
        updated_at: newContract.updatedAt,
        expiration_date: newContract.expirationDate,
        docusign_status: newContract.docusignStatus,
        is_critical: newContract.isCritical,
        manager_approval: newContract.managerApproval,
        content: newContract.content,
      } as any)
      .then()
  },
  updateContract: async (id: string, updates: Partial<LeaseContract>) => {
    const updatedStr = new Date().toISOString()
    const dbUpdates: any = { updated_at: updatedStr }

    if (updates.tenantName !== undefined) dbUpdates.tenant_name = updates.tenantName
    if (updates.documentName !== undefined) dbUpdates.document_name = updates.documentName
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.reviewNotes !== undefined)
      dbUpdates.review_notes = updates.reviewNotes === '' ? null : updates.reviewNotes
    if (updates.content !== undefined) dbUpdates.content = updates.content

    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: updatedStr } : c,
      ),
    }
    emit()

    if (Object.keys(dbUpdates).length > 1) {
      await supabase.from('contracts').update(dbUpdates).eq('id', id)
    }
  },
  updateStatus: (id: string, status: ContractStatus) => {
    const updatedStr = new Date().toISOString()
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, status, updatedAt: updatedStr } : c,
      ),
    }
    emit()
    supabase.from('contracts').update({ status, updated_at: updatedStr }).eq('id', id).then()

    if (status === 'Ativo') {
      const contract = state.contracts.find((c) => c.id === id)
      import('@/lib/m365').then(({ m365Service }) => {
        if (contract) {
          m365Service.saveToLibrary(
            'Contratos Ativos',
            contract.documentName,
            'File Data',
            'locacao',
          )
        }
      })
    }
  },
  updateDocuSignStatus: (id: string, docusignStatus: DocuSignStatus) => {
    const updatedStr = new Date().toISOString()
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, docusignStatus, updatedAt: updatedStr } : c,
      ),
    }
    emit()
    supabase
      .from('contracts')
      .update({ docusign_status: docusignStatus, updated_at: updatedStr })
      .eq('id', id)
      .then()
  },
  approveCriticalContract: (id: string) => {
    const updatedStr = new Date().toISOString()
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, managerApproval: true, updatedAt: updatedStr } : c,
      ),
    }
    emit()
    supabase
      .from('contracts')
      .update({ manager_approval: true, updated_at: updatedStr })
      .eq('id', id)
      .then()
  },
  updateReviewNotes: (id: string, notes: string) => {
    const updatedStr = new Date().toISOString()
    state = {
      ...state,
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, reviewNotes: notes, updatedAt: updatedStr } : c,
      ),
    }
    emit()
    supabase
      .from('contracts')
      .update({ review_notes: notes === '' ? null : notes, updated_at: updatedStr })
      .eq('id', id)
      .then()
  },
}

export default function useContractsStore() {
  return useSyncExternalStore(contractsStore.subscribe, contractsStore.getState)
}
