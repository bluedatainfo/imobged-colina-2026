import { createContext, useContext, useState, ReactNode } from 'react'

export type User = {
  name: string
  email: string
  avatar: string
}

type AuthContextType = {
  user: User | null
  loginM365: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const loginM365 = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          name: 'Ana Silva',
          email: 'ana.silva@imobged.m365.com',
          avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
        })
        resolve()
      }, 800)
    })
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loginM365, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
