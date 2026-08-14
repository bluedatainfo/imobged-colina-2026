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

  const message = `🚨 BOLETO PARA PAGAMENTO 🚨

Olá, ${tenantName}!

Segue o boleto referente à sua locação.

📅 Vencimento: ${dueDate}
💰 Valor: R$ ${amount}

🔗 Acesse o boleto:
${pdfLink}

⚠️ Antes de efetuar o pagamento, confira atentamente todos os dados e itens apresentados no boleto, incluindo beneficiário, vencimento, valor e demais informações.

Em caso de qualquer divergência, entre em contato conosco antes de realizar o pagamento.

Agradecemos pela atenção!

Jackson e Cristina
Setor Financeiro
IMOBILIÁRIA COLINA`

  const encodedMessage = encodeURIComponent(message)
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
    'CPF',
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
