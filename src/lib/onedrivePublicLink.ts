import { fetchWithAuth, getGraphToken } from './m365'

/**
 * Builds the Microsoft Graph `createLink` endpoint URL for a given drive item.
 *
 * - Personal OneDrive (`/me/drive`) when no site/drive context is provided.
 * - SharePoint/Shared drive when `driveId` is provided.
 */
const buildCreateLinkUrl = (itemId: string, driveId?: string, siteId?: string): string => {
  if (driveId) {
    return `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/createLink`
  }
  return `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/createLink`
}

/**
 * Creates an anonymous ("Qualquer pessoa com o link pode visualizar") sharing
 * link for a OneDrive/SharePoint drive item via the Microsoft Graph API.
 *
 * @param itemId   The Graph `id` of the drive item (PDF file).
 * @param driveId  Optional drive id (required for SharePoint site libraries).
 * @param siteId   Optional site id (kept for API symmetry; the `/drives/{driveId}`
 *                 form is preferred when available and works for site drives too).
 * @param fallback Direct link to use if creation fails (e.g. the item `webUrl`).
 * @returns The anonymous `webUrl` sharing link, or the `fallback` when creation fails.
 */
export const createOneDrivePublicLink = async (
  itemId: string,
  driveId?: string,
  siteId?: string,
  fallback?: string,
): Promise<string> => {
  // No session → cannot call Graph; keep the direct link.
  if (!getGraphToken()) {
    if (fallback) return fallback
    console.warn('[onedrivePublicLink] Nenhum token M365 disponível; usando link direto.')
    return '#'
  }

  try {
    const url = buildCreateLinkUrl(itemId, driveId, siteId)
    const res = await fetchWithAuth(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'view', scope: 'anonymous' }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.warn(
        `[onedrivePublicLink] createLink falhou para o item ${itemId} (status ${res.status}):`,
        errText,
      )
      return fallback || '#'
    }

    const data = await res.json()
    const webUrl: string | undefined = data?.link?.webUrl
    if (webUrl) return webUrl

    console.warn(
      `[onedrivePublicLink] Resposta do createLink sem link.webUrl para o item ${itemId}:`,
      data,
    )
    return fallback || '#'
  } catch (e) {
    console.error(`[onedrivePublicLink] Erro ao criar link público para o item ${itemId}:`, e)
    return fallback || '#'
  }
}
