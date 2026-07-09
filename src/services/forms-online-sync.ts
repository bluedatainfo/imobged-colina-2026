import { supabase } from '@/lib/supabase/client'

type PreRegistrationRow = {
  code: string
  full_name: string
  cpf?: string | null
  cnpj?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  category: string
  status?: string
  form_data?: Record<string, unknown> | null
  documents_link?: string | null
}

function getField(row: Record<string, any>, keys: string[]): string | null {
  for (const key of keys) {
    const val = row[key]
    if (val !== undefined && val !== null && String(val).trim() !== '') {
      return String(val)
    }
  }
  return null
}

function sanitizeFormData(row: Record<string, any>): Record<string, unknown> {
  const clean: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) {
    if (key.startsWith('@odata') || key.startsWith('ItemInternalId')) continue
    if (typeof value === 'object' && value !== null) continue
    clean[key] = value
  }
  return clean
}

function mapRow(
  row: Record<string, any>,
  category: string,
  index: number,
): PreRegistrationRow | null {
  const isPJ = category === 'PJ'
  const fullName = isPJ
    ? getField(row, ['Razão Social', 'Razao Social'])
    : getField(row, ['Nome1', 'Nome', 'Name'])

  if (!fullName) return null

  const itemInternalId = getField(row, ['ItemInternalId'])
  const timestamp = getField(row, ['Hora de início', 'Start time', 'Data', 'Date']) || ''
  const code = itemInternalId || `${category}-${timestamp}-${index}`

  return {
    code,
    full_name: fullName,
    cpf: getField(row, ['CPF', 'cpf', 'Cpf']),
    cnpj: isPJ ? getField(row, ['CNPJ', 'cnpj', 'Cnpj']) : null,
    email: getField(row, ['Email', 'E-mail', 'email']),
    phone: getField(row, ['Telefone', 'Phone', 'Celular', 'telefone']),
    address: getField(row, ['Endereço', 'Address', 'endereco', 'Endereco']),
    category,
    status: getField(row, ['Status', 'status']) || 'Novo',
    form_data: sanitizeFormData(row),
    documents_link: getField(row, ['Link dos Documentos', 'Documents Link', 'link_documentos']),
  }
}

export async function syncFormsToPreRegistrations(
  data: Record<string, any>[],
  category: string,
): Promise<{ synced: number; error: string | null }> {
  if (!data || data.length === 0) {
    return { synced: 0, error: null }
  }

  const rows: PreRegistrationRow[] = []
  for (let i = 0; i < data.length; i++) {
    const mapped = mapRow(data[i], category, i)
    if (mapped) rows.push(mapped)
  }

  if (rows.length === 0) {
    return { synced: 0, error: null }
  }

  try {
    const { error } = await supabase.from('pre_registrations').upsert(rows, { onConflict: 'code' })

    if (error) {
      console.error('Error syncing to pre_registrations:', error)
      return { synced: 0, error: error.message }
    }

    return { synced: rows.length, error: null }
  } catch (err) {
    console.error('Exception syncing to pre_registrations:', err)
    return { synced: 0, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
