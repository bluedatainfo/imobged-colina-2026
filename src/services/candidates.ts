import { supabase } from '@/lib/supabase/client'

export type PreRegistrationStatus =
  | 'Novo'
  | 'Documentação Pendente'
  | 'Em Análise da Gerência'
  | 'Aguardando Vistoria'
  | 'Aprovado'
  | 'Reprovado'

export interface PreRegistration {
  id: string
  full_name: string
  cpf: string | null
  email: string | null
  phone: string | null
  status: PreRegistrationStatus
  documents_link: string | null
  form_data: any
  created_at: string
  updated_at: string
}

export const candidatesService = {
  async getCandidates() {
    const { data, error } = await supabase
      .from('pre_registrations')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as PreRegistration[]
  },

  async updateStatus(id: string, status: PreRegistrationStatus) {
    const { data, error } = await supabase
      .from('pre_registrations')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as PreRegistration
  },
}
