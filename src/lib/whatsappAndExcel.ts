import { formatPhoneForWhatsApp } from './boletoParser'

/**
 * Generates WhatsApp wa.me link with encoded message
 */
export function buildWhatsAppLink(
  phone: string,
  tenantName: string,
  dueDate: string,
  amount: string,
  pdfLink: string,
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

  const message = `📨BOLETO PARA PAGAMENTO📨

Olá, ${tenantName}!

Segue o boleto referente ao seu contrato de locação.

📅 Vencimento: ${dueDate}
💰 Valor: R$ ${amount}

🔗 Acesse o seu boleto aqui ⬇️:
${pdfLink}

⚠️ ATENÇÃO: Antes de realizar o pagamento, confira atentamente o beneficiário, vencimento, valor e demais informações do boleto.

Em caso de qualquer divergência, não efetue o pagamento e entre em contato conosco.

🚨 AVISO IMPORTANTE: Efetue o pagamento até a data de vencimento do boleto para evitar a incidência de encargos por atraso, conforme previsto em contrato.

Agradecemos pela atenção.

IMOBILIÁRIA COLINA
Cristina e Jackson
Setor Financeiro`

  const encodedMessage = encodeURIComponent(message)
  // WhatsApp Web não decodifica corretamente os emojis codificados por
  // encodeURIComponent (sequências como %F0%9F%93%A8), exibindo um caractere
  // estranho no lugar. Decodificamos seletivamente apenas os bytes dos emojis
  // (sequências UTF-8 de 4 bytes, plano astral) de volta para caracteres
  // Unicode nativos, mantendo espaços (%20), quebras de linha (%0A), acentos
  // e demais caracteres codificados.
  const emojiDecodedMessage = encodedMessage.replace(
    /(?:%F[0-4]%[0-9A-F]{2}%[0-9A-F]{2}%[0-9A-F]{2})/gi,
    (match) => decodeURIComponent(match),
  )
  return `https://wa.me/${cleanPhone}?text=${emojiDecodedMessage}`
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
