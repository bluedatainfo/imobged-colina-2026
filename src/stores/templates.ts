import { useSyncExternalStore } from 'react'
import { supabase } from '@/lib/supabase/client'

export type DocumentTemplate = {
  id: string
  name: string
  category: 'owner_onboarding' | 'tenant_contract'
  propertyType: string
  guaranteeType: string
  content: string
  createdAt: string
  updatedAt: string
}

type State = {
  templates: DocumentTemplate[]
}

let state: State = { templates: [] }
let listeners: Array<() => void> = []

export const initTemplatesStore = async () => {
  const { data } = await supabase.from('document_templates').select('*').order('name')

  if (data && data.length > 0) {
    state.templates = data.map((t: any) => ({
      id: t.id,
      name: t.name,
      category: t.category,
      propertyType: t.property_type,
      guaranteeType: t.guarantee_type,
      content: t.content || '',
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    }))
    emit()
  }
}

const emit = () => listeners.forEach((l) => l())

export const templatesStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  addTemplate: async (t: Omit<DocumentTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await supabase
      .from('document_templates')
      .insert({
        name: t.name,
        category: t.category,
        property_type: t.propertyType,
        guarantee_type: t.guaranteeType,
        content: t.content,
      })
      .select('*')
      .single()

    if (data) {
      const newTemplate: DocumentTemplate = {
        id: data.id,
        name: data.name,
        category: data.category,
        propertyType: data.property_type,
        guaranteeType: data.guarantee_type,
        content: data.content || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
      state = { ...state, templates: [...state.templates, newTemplate] }
      emit()
    }
  },
  updateTemplate: async (id: string, t: Partial<DocumentTemplate>) => {
    const updateData: any = { updated_at: new Date().toISOString() }
    if (t.name !== undefined) updateData.name = t.name
    if (t.category !== undefined) updateData.category = t.category
    if (t.propertyType !== undefined) updateData.property_type = t.propertyType
    if (t.guaranteeType !== undefined) updateData.guarantee_type = t.guaranteeType
    if (t.content !== undefined) updateData.content = t.content

    const { data } = await supabase
      .from('document_templates')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single()

    if (data) {
      state = {
        ...state,
        templates: state.templates.map((existing) =>
          existing.id === id
            ? {
                ...existing,
                name: data.name,
                category: data.category,
                propertyType: data.property_type,
                guaranteeType: data.guarantee_type,
                content: data.content || '',
                updatedAt: data.updated_at,
              }
            : existing,
        ),
      }
      emit()
    }
  },
  deleteTemplate: async (id: string) => {
    await supabase.from('document_templates').delete().eq('id', id)
    state = {
      ...state,
      templates: state.templates.filter((t) => t.id !== id),
    }
    emit()
  },
}

export default function useTemplatesStore() {
  return useSyncExternalStore(templatesStore.subscribe, templatesStore.getState)
}
