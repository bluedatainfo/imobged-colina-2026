const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const useLocalFallback = !SUPABASE_URL || !SUPABASE_ANON_KEY

function getLocal(table: string) {
  const data = localStorage.getItem(`@sb_${table}`)
  return data ? JSON.parse(data) : []
}

function setLocal(table: string, data: any) {
  localStorage.setItem(`@sb_${table}`, JSON.stringify(data))
}

export const supabase = {
  async get(table: string) {
    if (useLocalFallback) return getLocal(table)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      })
      if (res.ok) return await res.json()
    } catch (e) {
      console.error(`Supabase GET Error (${table}):`, e)
    }
    return []
  },
  async post(table: string, data: any) {
    if (useLocalFallback) {
      const items = getLocal(table)
      items.push(data)
      setLocal(table, items)
      return data
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const json = await res.json()
        return Array.isArray(json) ? json[0] : json
      }
    } catch (e) {
      console.error(`Supabase POST Error (${table}):`, e)
    }
    return data
  },
  async patch(table: string, id: string, data: any, idField: string = 'id') {
    if (useLocalFallback) {
      const items = getLocal(table)
      const idx = items.findIndex((i: any) => i[idField] === id)
      if (idx >= 0) {
        items[idx] = { ...items[idx], ...data }
        setLocal(table, items)
        return items[idx]
      }
      return data
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${idField}=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const json = await res.json()
        return Array.isArray(json) ? json[0] : json
      }
    } catch (e) {
      console.error(`Supabase PATCH Error (${table}):`, e)
    }
    return data
  },
  async delete(table: string, id: string, idField: string = 'id') {
    if (useLocalFallback) {
      const items = getLocal(table)
      setLocal(
        table,
        items.filter((i: any) => i[idField] !== id),
      )
      return
    }
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${table}?${idField}=eq.${id}`, {
        method: 'DELETE',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      })
    } catch (e) {
      console.error(`Supabase DELETE Error (${table}):`, e)
    }
  },
  async upsert(table: string, data: any, idField: string = 'id') {
    if (useLocalFallback) {
      const items = getLocal(table)
      const dynamicIdField = data.id ? 'id' : data.propertyId ? 'propertyId' : idField
      const idx = items.findIndex((i: any) => i[dynamicIdField] === data[dynamicIdField])
      if (idx >= 0) items[idx] = { ...items[idx], ...data }
      else items.push(data)
      setLocal(table, items)
      return data
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const json = await res.json()
        return Array.isArray(json) ? json[0] : json
      }
    } catch (e) {
      console.error(`Supabase UPSERT Error (${table}):`, e)
    }
    return data
  },
}
