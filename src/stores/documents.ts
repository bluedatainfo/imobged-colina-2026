import { useSyncExternalStore } from 'react'

export type DocumentStatus = 'Regular' | 'Vencendo em breve' | 'Expirado' | 'Sem Vencimento'

export type PropertyDocument = {
  id: string
  propertyId: string
  name: string
  category: string
  uploadDate: string
  expirationDate?: string
}

type State = {
  documents: PropertyDocument[]
}

const today = new Date()
const addDays = (days: number) =>
  new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString()

let state: State = {
  documents: [
    // Imóvel 101
    {
      id: 'd1',
      propertyId: '101',
      name: 'Matricula_Atualizada_Imovel.pdf',
      category: 'Documentos do Proprietário',
      uploadDate: addDays(-100),
      expirationDate: addDays(45),
    },
    {
      id: 'd2',
      propertyId: '101',
      name: 'RG_CPF_Proprietario.pdf',
      category: 'Documentos do Proprietário',
      uploadDate: addDays(-100),
    },
    {
      id: 'd3',
      propertyId: '101',
      name: 'CNH_Inquilino_Joao.pdf',
      category: 'Documentos do Inquilino',
      uploadDate: addDays(-365),
      expirationDate: addDays(-5),
    }, // Expirado
    {
      id: 'd4',
      propertyId: '101',
      name: 'Apolice_Seguro_Fianca.pdf',
      category: 'Garantias',
      uploadDate: addDays(-300),
      expirationDate: addDays(15),
    }, // Vencendo em breve

    // Imóvel 103
    {
      id: 'd5',
      propertyId: '103',
      name: 'Procuracao_Publica.pdf',
      category: 'Documentos Legais',
      uploadDate: addDays(-150),
      expirationDate: addDays(-12),
    }, // Expirado
    {
      id: 'd6',
      propertyId: '103',
      name: 'Comprovante_Renda.pdf',
      category: 'Documentos do Inquilino',
      uploadDate: addDays(-150),
    },

    // Imóvel 104
    {
      id: 'd7',
      propertyId: '104',
      name: 'Alvara_Bombeiros.pdf',
      category: 'Documentos Comerciais',
      uploadDate: addDays(-350),
      expirationDate: addDays(20),
    }, // Vencendo em breve
    {
      id: 'd8',
      propertyId: '104',
      name: 'Contrato_Social_Empresa.pdf',
      category: 'Documentos do Inquilino',
      uploadDate: addDays(-350),
    },
  ],
}

let listeners: Array<() => void> = []
const emit = () => listeners.forEach((l) => l())

export const getDocumentStatus = (expirationDate?: string): DocumentStatus => {
  if (!expirationDate) return 'Sem Vencimento'

  const now = new Date()
  const exp = new Date(expirationDate)
  now.setHours(0, 0, 0, 0)
  exp.setHours(0, 0, 0, 0)

  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Expirado'
  if (diffDays <= 30) return 'Vencendo em breve'
  return 'Regular'
}

export const documentsStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
}

export default function useDocumentsStore() {
  return useSyncExternalStore(documentsStore.subscribe, documentsStore.getState)
}
