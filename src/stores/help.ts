import { useSyncExternalStore } from 'react'

type State = {
  isOpen: boolean
}

let state: State = {
  isOpen: false,
}

let listeners: Array<() => void> = []
const emit = () => listeners.forEach((l) => l())

export const helpStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.push(l)
    return () => {
      listeners = listeners.filter((fn) => fn !== l)
    }
  },
  setOpen: (isOpen: boolean) => {
    state = { ...state, isOpen }
    emit()
  },
  toggle: () => {
    state = { ...state, isOpen: !state.isOpen }
    emit()
  },
}

export default function useHelpStore() {
  return useSyncExternalStore(helpStore.subscribe, helpStore.getState)
}
