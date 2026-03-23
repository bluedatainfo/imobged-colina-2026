import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

export type DocumentStatus = 'Regular' | 'Vencendo em breve' | 'Expirado' | 'Sem Vencimento'

export type PropertyDocument = {
  id: string
  propertyId: string
  name: string
  category: string
  entityCode?: string
  entityName?: string
  filePath?: string
  createdAt: string
  uploadDate: string
  expirationDate?: string
}

type State = {
  documents: PropertyDocument[]
}

let state: State = { documents: [] }
let listeners: Array<() => void> = []

export const initDocumentsStore = async () => {
  const { data } = await (supabase as any)
    .from('property_documents')
    .select('*')
    .order('created_at', { ascending: false })

  if (data && data.length > 0) {
    state.documents = data.map((d: any) => ({
      id: d.id,
      propertyId: d.property_id,
      name: d.name,
      category: d.category,
      entityCode: d.entity_code || undefined,
      entityName: d.entity_name || undefined,
      filePath: d.file_path || undefined,
      createdAt: d.created_at,
      uploadDate: d.created_at,
    }))
  }
  emit()
}

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
  addDocument: async (doc: Omit<PropertyDocument, 'id' | 'createdAt' | 'uploadDate'>) => {
    const { data, error } = await (supabase as any)
      .from('property_documents')
      .insert({
        property_id: doc.propertyId,
        name: doc.name,
        category: doc.category,
        entity_code: doc.entityCode,
        entity_name: doc.entityName,
        file_path: doc.filePath,
      })
      .select('*')
      .single()

    if (error) {
      console.error('Failed to add document', error)
      return
    }

    if (data) {
      const newDoc = {
        id: data.id,
        propertyId: data.property_id,
        name: data.name,
        category: data.category,
        entityCode: data.entity_code || undefined,
        entityName: data.entity_name || undefined,
        filePath: data.file_path || undefined,
        createdAt: data.created_at,
        uploadDate: data.created_at,
      }
      state = { ...state, documents: [newDoc, ...state.documents] }
      emit()
    }
  },
}

export default function useDocumentsStore() {
  return useSyncExternalStore(documentsStore.subscribe, documentsStore.getState)
}
