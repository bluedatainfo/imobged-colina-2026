import * as pdfjsLib from 'pdfjs-dist'

// Configure worker to use cdnjs CDN matching pdfjs-dist version or standard worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export interface ParsedBoleto {
  fileName: string
  name: string
  cpf: string
  dueDate: string // DD/MM/YYYY
  amount: string // e.g. "1.234,56" or "1234.56" formatted
  rawText: string
}

export async function extractTextFromPdfBlob(blob: Blob): Promise<string> {
  try {
    const arrayBuffer = await blob.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(' ')
      fullText += pageText + '\n'
    }

    return fullText
  } catch (err) {
    console.error('Failed to extract text from PDF blob:', err)
    return ''
  }
}

/**
 * Normalizes CPF string to XXX.XXX.XXX-XX format or raw digits
 */
export function cleanCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  }
  return cpf.trim()
}

/**
 * Normalizes phone number for WhatsApp wa.me links
 * e.g. (11) 98765-4321 -> 5511987654321
 */
export function formatPhoneForWhatsApp(phone: string): string {
  let digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  // If starts with 0, remove leading zero
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  // Add Brazil country code if not present
  if (digits.length === 10 || digits.length === 11) {
    digits = '55' + digits
  }
  return digits
}

/**
 * Parses Itaú Boleto text to extract: Name, CPF, Due Date (Vencimento), Amount (Valor)
 */
export function parseItauBoletoText(rawText: string, fileName: string): ParsedBoleto {
  let name = ''
  let cpf = ''
  let dueDate = ''
  let amount = ''

  // 1. CPF extraction
  // Pattern: CPF: XXX.XXX.XXX-XX or CPF/CNPJ or 11 digits
  const cpfRegex = /(?:CPF|CNPJ|Pagador|Inscricao)?[:\s]*(\d{3}\.?\d{3}\.?\d{3}[-.\s]?\d{2})/i
  const cpfMatch = rawText.match(cpfRegex) || rawText.match(/(\d{3}\.\d{3}\.\d{3}-\d{2})/)
  if (cpfMatch) {
    cpf = cleanCpf(cpfMatch[1])
  }

  // 2. Due Date (Vencimento) extraction
  // Patterns like: Vencimento DD/MM/YYYY or Vencimento: DD/MM/YYYY
  const dueDateRegex = /(?:Vencimento|Venc|Data de Vencimento)[:\s]*(\d{2}\/\d{2}\/\d{4})/i
  const dueDateMatch = rawText.match(dueDateRegex) || rawText.match(/(\d{2}\/\d{2}\/\d{4})/)
  if (dueDateMatch) {
    dueDate = dueDateMatch[1]
  }

  // 3. Amount (Valor) extraction
  // Patterns like: Valor do Documento R$ 1.234,56 or Valor: R$ 1.234,56 or R$ 123,45
  const amountRegex =
    /(?:Valor\s+do\s+Documento|Valor\s+Cobrado|Valor|(=>\s*Valor))[:\s]*(?:R\$\s*)?([\d.,]+)/i
  const amountMatch = rawText.match(amountRegex)
  if (amountMatch) {
    amount = amountMatch[2].trim()
  } else {
    // Fallback search for R$ XX,XX
    const rsMatch = rawText.match(/R\$\s*([\d.,]+)/i)
    if (rsMatch) {
      amount = rsMatch[1].trim()
    }
  }

  // 4. Name extraction
  // Pagador: [NOME DO INQUILINO] or Beneficiário / Sacado / Nome
  const pagadorRegex =
    /(?:Pagador|Sacado|Nome)[:\s]+([A-ZÁÀÂÃÉÊÍÓÔÕÚÇ\s]{3,50})(?=\s+(?:CPF|CNPJ|CPF\/CNPJ|Rua|Av|Endereço|-\s*CPF|\d{3}))/i
  const pagadorMatch = rawText.match(pagadorRegex)
  if (pagadorMatch && pagadorMatch[1]) {
    name = pagadorMatch[1].trim()
  } else {
    // Try extract from fileName if name not found in rawText
    // e.g. "ANDRE LUIZ 3496-8326e.pdf" -> "ANDRE LUIZ"
    const fileNameClean = fileName
      .replace(/\.pdf$/i, '')
      .replace(/[-_].*$/, '')
      .replace(/\d+/g, '')
      .trim()
    if (fileNameClean.length >= 3) {
      name = fileNameClean
    }
  }

  return {
    fileName,
    name: name || 'NÃO IDENTIFICADO',
    cpf: cpf || 'NÃO IDENTIFICADO',
    dueDate: dueDate || 'NÃO IDENTIFICADO',
    amount: amount || '0,00',
    rawText,
  }
}
