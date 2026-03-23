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
  reviewNotes?: string
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
      reviewNotes: d.review_notes || undefined,
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
        reviewNotes: data.review_notes || undefined,
      }
      state = { ...state, documents: [newDoc, ...state.documents] }
      emit()
    }
  },
  updateDocument: async (id: string, updates: Partial<PropertyDocument>) => {
    const dbUpdates: any = {}
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.filePath !== undefined) dbUpdates.file_path = updates.filePath
    if (updates.reviewNotes !== undefined)
      dbUpdates.review_notes = updates.reviewNotes === '' ? null : updates.reviewNotes

    state = {
      ...state,
      documents: state.documents.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    }
    emit()

    if (Object.keys(dbUpdates).length > 0) {
      await (supabase as any).from('property_documents').update(dbUpdates).eq('id', id)
    }
  },
  updateReviewNotes: async (id: string, notes: string) => {
    const { error } = await (supabase as any)
      .from('property_documents')
      .update({ review_notes: notes === '' ? null : notes })
      .eq('id', id)

    if (!error) {
      state = {
        ...state,
        documents: state.documents.map((d) => (d.id === id ? { ...d, reviewNotes: notes } : d)),
      }
      emit()
    }
  },
}

export default function useDocumentsStore() {
  return useSyncExternalStore(documentsStore.subscribe, documentsStore.getState)
}
