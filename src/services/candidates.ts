import { supabase } from '@/lib/supabase/client'
import { m365Service } from '@/lib/m365'
import { resolveOperatorForPersistence } from '@/lib/operator'

export type PreRegistrationStatus =
  | 'Novo'
  | 'Documentação Pendente'
  | 'Em Análise da Gerência'
  | 'Aguardando Vistoria'
  | 'Aprovado'
  | 'Reprovado'

export type PreRegistrationCategory = 'PF' | 'PJ' | 'Fiador'

export interface PreRegistration {
  id: string
  code: string
  full_name: string
  cpf: string | null
  cnpj: string | null
  email: string | null
  phone: string | null
  address: string | null
  category: PreRegistrationCategory
  sp_list_id: string | null
  status: PreRegistrationStatus
  documents_link: string | null
  form_data: any
  operator: string | null
  created_at: string
  updated_at: string
}

export const candidatesService = {
  async getCandidates() {
    const { data, error } = await supabase
      .from('pre_registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as PreRegistration[]
  },

  async updateStatus(id: string, status: PreRegistrationStatus) {
    // Ao analisar/mudar o status de um interessado, grava o operador atual
    // (quando a conta usa seleção de operador). Contas sem operadores gravam
    // NULL e seguem o fluxo normal.
    const { data, error } = await supabase
      .from('pre_registrations')
      .update({ status, operator: resolveOperatorForPersistence() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as PreRegistration
  },

  async syncFromSharePoint() {
    const lists = [
      { name: 'Fichas Cadastrais  Locatrios', category: 'PF' as PreRegistrationCategory },
      { name: 'Fichas Cadastrais Candidatos PJ', category: 'PJ' as PreRegistrationCategory },
      { name: 'Fichas Cadastrais  Fiador', category: 'Fiador' as PreRegistrationCategory },
    ]

    let syncedCount = 0

    for (const list of lists) {
      const items = await m365Service.fetchListItems('locacoes', list.name)

      if (items && items.length > 0) {
        for (const item of items) {
          const fields = item.fields || {}
          const sp_list_id = `${list.category}-${item.id}`

          let full_name = fields.Nome || fields.RazaoSocial || fields.Title || 'Sem Nome'
          let email =
            fields.E_x002d_mail ||
            fields.Email ||
            fields.EMail ||
            fields.eMail ||
            fields.EmailCorporativo ||
            null
          let phone = fields.Celular || fields.Telefone || fields.Contato || null
          let cpf = fields.CPF || null
          let cnpj = fields.CNPJ || null
          let address = fields.Endereco || fields.Endereço || null

          const payload: any = {
            full_name,
            email,
            phone,
            cpf,
            cnpj,
            address,
            category: list.category,
            sp_list_id,
            status: 'Novo',
            form_data: fields,
            // Rastreia o operador atual no cadastro sincronizado a partir do
            // SharePoint. Contas sem operadores gravam NULL.
            operator: resolveOperatorForPersistence(),
          }

          // Try to insert directly, if sp_list_id already exists it will fail with unique violation constraint which we safely ignore.
          const { error } = await supabase.from('pre_registrations').insert(payload)

          if (!error) {
            syncedCount++
          }
        }
      }
    }
    return syncedCount
  },
}
