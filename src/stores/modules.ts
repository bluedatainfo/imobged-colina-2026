import { supabase } from '@/lib/supabase/client'
import { useSyncExternalStore } from 'react'

export const defaultModules = {
  entities: true,
  properties: true,
  templates: true,
  contracts: true,
  manager_approval: true,
  documents: true,
  inspections: true,
  keys: true,
  document_alerts: true,
  sync_monitor: true,
  maintenance: true,
  renewals: true,
  legal: true,
  sales: true,
  financial: true,
  caixa: true,
}

export type ModulesSettings = typeof defaultModules

let modulesData = { ...defaultModules }
let loading = true
let snapshot = { modules: modulesData, loading }

const listeners = new Set<() => void>()

function emit() {
  snapshot = { modules: modulesData, loading }
  listeners.forEach((l) => l())
}

export const modulesStore = {
  getSnapshot: () => snapshot,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  async fetchModules() {
    try {
      const { data } = await supabase
        .from('app_settings')
        .select('module_settings')
        .limit(1)
        .maybeSingle()

      if (data?.module_settings) {
        modulesData = { ...defaultModules, ...(data.module_settings as any) }
      }
    } catch (error) {
      console.error('Error fetching modules', error)
    } finally {
      loading = false
      emit()
    }
  },
  async updateModules(newModules: ModulesSettings) {
    try {
      modulesData = newModules
      emit()
      const { data } = await supabase.from('app_settings').select('id').limit(1).maybeSingle()
      if (data?.id) {
        await supabase
          .from('app_settings')
          .update({ module_settings: newModules as any })
          .eq('id', data.id)
      } else {
        await supabase.from('app_settings').insert({ module_settings: newModules as any })
      }
    } catch (error) {
      console.error('Error updating modules', error)
    }
  },
}

export function useModulesStore() {
  const state = useSyncExternalStore(modulesStore.subscribe, modulesStore.getSnapshot)
  return {
    ...state,
    updateModules: modulesStore.updateModules,
  }
}

export const initModulesStore = () => modulesStore.fetchModules()
