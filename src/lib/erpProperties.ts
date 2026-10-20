/**
 * Utilitário centralizado para busca de imóveis no ERP Local (http://192.168.10.225:9000).
 *
 * Requisitos:
 * 1. Para busca por texto, efetua DUAS chamadas simultâneas:
 *    - ?name=<termo>
 *    - ?endereco=<termo>
 *    Ambas com o header Authorization: 'cadastro'.
 * 2. Unir os resultados sem duplicar (dedup por código/id do imóvel).
 * 3. Se uma chamada falhar, a outra deve continuar retornando resultados parciais.
 * 4. Manter o suporte a busca numérica quando aplicável (/imoveis/dados/<id>).
 */

export const ERP_BASE_URL = 'http://192.168.10.225:9000'
export const ERP_HEADERS = {
  Authorization: 'cadastro',
}

/**
 * Normaliza qualquer formato de resposta do ERP (array, objeto único, envelopado em .data, etc.)
 */
export function normalizeErpPropertyResponse(data: any): any[] {
  if (!data) return []
  let items: any[] = []

  if (Array.isArray(data)) {
    items = data
  } else if (typeof data === 'object') {
    if (Array.isArray(data.data)) {
      items = data.data
    } else if (data.data && typeof data.data === 'object') {
      items = [data.data]
    } else if (data.imovel && typeof data.imovel === 'object') {
      items = [data.imovel]
    } else if (data.property && typeof data.property === 'object') {
      items = [data.property]
    } else {
      items = [data]
    }
  }

  return items
    .filter(
      (item: any) =>
        item &&
        typeof item === 'object' &&
        (item.id != null || item.code != null || item.codigo != null),
    )
    .map((item: any) => {
      if (item.id == null && item.code == null && item.codigo != null) {
        return { ...item, id: item.codigo }
      }
      return item
    })
}

/**
 * Deduplica lista de imóveis com base no ID ou Código do imóvel.
 */
export function deduplicateErpProperties<T extends { id?: any; code?: any; codigo?: any }>(
  items: T[],
): T[] {
  const seen = new Set<string>()
  const result: T[] = []

  for (const item of items) {
    if (!item) continue
    const idKey = item.id != null ? String(item.id).trim().toLowerCase() : ''
    const codeKey = item.code != null ? String(item.code).trim().toLowerCase() : ''
    const codigoKey = item.codigo != null ? String(item.codigo).trim().toLowerCase() : ''
    const primaryKey = codeKey || codigoKey || idKey

    if (!primaryKey) continue

    if (
      seen.has(primaryKey) ||
      (idKey && seen.has(idKey)) ||
      (codeKey && seen.has(codeKey)) ||
      (codigoKey && seen.has(codigoKey))
    ) {
      continue
    }

    seen.add(primaryKey)
    if (idKey) seen.add(idKey)
    if (codeKey) seen.add(codeKey)
    if (codigoKey) seen.add(codigoKey)
    result.push(item)
  }

  return result
}

export interface SearchErpPropertiesOptions {
  headers?: HeadersInit
  signal?: AbortSignal
}

/**
 * Executa a busca de imóveis no ERP:
 * - Se termo estiver vazio: chama /imoveis
 * - Se termo for numérico: pode buscar /imoveis/dados/:id (opcional) ou busca dupla
 * - Para texto: executa Promise.allSettled nas duas URLs (?name= e ?endereco=) com Authorization: cadastro,
 *   unindo os resultados sem duplicidade. Se uma falhar, retorna os da outra.
 */
export async function searchErpProperties(
  rawTerm: string,
  options?: SearchErpPropertiesOptions,
): Promise<any[]> {
  const term = rawTerm ? rawTerm.trim() : ''
  const headers = { ...ERP_HEADERS, ...(options?.headers || {}) }

  if (!term) {
    try {
      const res = await fetch(`${ERP_BASE_URL}/imoveis`, {
        headers,
        signal: options?.signal,
      })
      if (!res.ok) return []
      const data = await res.json()
      return deduplicateErpProperties(normalizeErpPropertyResponse(data))
    } catch {
      return []
    }
  }

  const encodedTerm = encodeURIComponent(term)
  const nameUrl = `${ERP_BASE_URL}/imoveis?name=${encodedTerm}`
  const enderecoUrl = `${ERP_BASE_URL}/imoveis?endereco=${encodedTerm}`

  const fetchSafe = async (url: string) => {
    try {
      const res = await fetch(url, {
        headers,
        signal: options?.signal,
      })
      if (!res.ok) return []
      const data = await res.json()
      return normalizeErpPropertyResponse(data)
    } catch {
      return []
    }
  }

  const [nameResults, enderecoResults] = await Promise.all([
    fetchSafe(nameUrl),
    fetchSafe(enderecoUrl),
  ])

  return deduplicateErpProperties([...nameResults, ...enderecoResults])
}
