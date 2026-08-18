import { formatPhoneForWhatsApp, BoletoBreakdownItem } from './boletoParser'

/**
 * Hybrid encoder for WhatsApp message URLs.
 *
 * `encodeURIComponent` turns emojis (and other non-ASCII) into `%XX` hex
 * sequences that WhatsApp Web cannot decode, showing � in their place.
 * This encoder keeps emojis, accents, letters and digits NATIVE (no %XX)
 * and only encodes the characters that would otherwise break the URL:
 * spaces, line breaks and the reserved/special URL characters.
 */
function encodeWhatsAppMessage(message: string): string {
  let result = ''
  for (const char of message) {
    switch (char) {
      case ' ':
        result += '%20'
        break
      case '\n':
        result += '%0A'
        break
      case '\r':
        result += '%0D'
        break
      case '#':
        result += '%23'
        break
      case '&':
        result += '%26'
        break
      case '=':
        result += '%3D'
        break
      case '?':
        result += '%3F'
        break
      case '%':
        result += '%25'
        break
      case '+':
        result += '%2B'
        break
      default:
        // Emojis, accents, letters and numbers stay native
        result += char
    }
  }
  return result
}

/**
 * Generates WhatsApp wa.me link with encoded message
 */
export function buildWhatsAppLink(
  phone: string,
  tenantName: string,
  dueDate: string,
  amount: string,
  pdfLink: string,
  breakdown?: BoletoBreakdownItem[],
): string {
  if (!phone || phone === 'NÃO ENCONTRADO' || phone === 'NÃO ENCONTRADOS') return ''

  // If phone contains multiple numbers like "11-99544-5749 / 11-96423-6385", use the first number
  let targetPhone = phone
  if (phone.includes('/')) {
    targetPhone = phone.split('/')[0].trim()
  } else if (phone.includes(';')) {
    targetPhone = phone.split(';')[0].trim()
  } else if (phone.includes(',')) {
    targetPhone = phone.split(',')[0].trim()
  }

  const cleanPhone = formatPhoneForWhatsApp(targetPhone)
  if (!cleanPhone) return ''

  let breakdownSection = ''
  if (breakdown && breakdown.length > 0) {
    breakdownSection =
      '\n' +
      breakdown
        .map((item) => {
          const datePart = item.dueDate ? ` (Vencimento: ${item.dueDate})` : ''
          return `${item.description}: R$ ${item.value}${datePart}`
        })
        .join('\n') +
      '\n'
  }

  const message = `BOLETO PARA PAGAMENTO

Olá, ${tenantName}!

Segue o boleto referente ao seu contrato de locação.

Vencimento: ${dueDate}
Valor: R$ ${amount}${breakdownSection}
Acesse o seu boleto aqui:
${pdfLink}

ATENÇÃO: Antes de realizar o pagamento, confira atentamente o beneficiário, vencimento, valor e demais informações do boleto.

Em caso de qualquer divergência, não efetue o pagamento e entre em contato conosco.

AVISO IMPORTANTE: Efetue o pagamento até a data de vencimento do boleto para evitar a incidência de encargos por atraso, conforme previsto em contrato.

Agradecemos pela atenção.

IMOBILIÁRIA COLINA
Cristina e Jackson
Setor Financeiro`

  const encodedMessage = encodeWhatsAppMessage(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

/**
 * Formats data and triggers a CSV file download (compatible with Excel)
 */
export function exportToCsv(
  filename: string,
  rows: Array<{
    name: string
    phone: string
    cpf: string
    dueDate: string
    amount: string
    pdfLink: string
    whatsappLink: string
  }>,
) {
  const headers = [
    'Nome',
    'Celular',
    'CPF/CNPJ',
    'Vencimento',
    'Valor',
    'Link PDF (OneDrive)',
    'Link WhatsApp',
  ]

  const csvContent = [
    headers.join(';'),
    ...rows.map((row) =>
      [
        `"${(row.name || '').replace(/"/g, '""')}"`,
        `"${(row.phone || '').replace(/"/g, '""')}"`,
        `"${(row.cpf || '').replace(/"/g, '""')}"`,
        `"${(row.dueDate || '').replace(/"/g, '""')}"`,
        `"${(row.amount || '').replace(/"/g, '""')}"`,
        `"${(row.pdfLink || '').replace(/"/g, '""')}"`,
        `"${(row.whatsappLink || '').replace(/"/g, '""')}"`,
      ].join(';'),
    ),
  ].join('\r\n')

  // BOM for Excel UTF-8 recognition
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
