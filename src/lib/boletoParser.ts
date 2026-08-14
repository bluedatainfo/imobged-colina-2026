import * as pdfjsLib from 'pdfjs-dist'

// Configure worker to use cdnjs CDN matching pdfjs-dist version or standard worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export interface ParsedBoleto {
  fileName: string
  name: string
  cpf: string
  dueDate: string // DD/MM/YYYY
  amount: string // e.g. "1.234,56"
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
 * Validates Brazilian CPF checksum
 */
export function isValidCpf(cpf: string): boolean {
  if (!cpf) return false
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i), 10) * (10 - i)
  }
  let rev = (sum * 10) % 11
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(digits.charAt(9), 10)) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i), 10) * (11 - i)
  }
  rev = (sum * 10) % 11
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(digits.charAt(10), 10)) return false

  return true
}

/**
 * Validates Brazilian CNPJ checksum
 */
export function isValidCnpj(cnpj: string): boolean {
  if (!cnpj) return false
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return false
  if (/^(\d)\1{13}$/.test(digits)) return false

  let size = digits.length - 2
  let numbers = digits.substring(0, size)
  const digitsPart = digits.substring(size)
  let sum = 0
  let pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--
    if (pos < 2) pos = 9
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digitsPart.charAt(0), 10)) return false

  size = size + 1
  numbers = digits.substring(0, size)
  sum = 0
  pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--
    if (pos < 2) pos = 9
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digitsPart.charAt(10), 10)) return false

  return true
}

/**
 * Normalizes CPF string to XXX.XXX.XXX-XX format or XX.XXX.XXX/XXXX-XX for CNPJ
 */
export function cleanCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  }
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
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
 * Extracts valid CPF or CNPJ from text, excluding barcode/linha digitável segments
 */
export function extractCpfFromText(rawText: string): string {
  if (!rawText) return ''

  interface CpfCandidate {
    raw: string
    cleaned: string
    score: number
  }

  const candidates: CpfCandidate[] = []

  // Regex for potential 11-digit CPF sequences (formatted or digits only)
  // Ensures boundaries so we don't pick up mid-digit sequences from long barcode numbers
  const cpfRegex = /(?<!\d)(?:\d{3}[.\s]?\d{3}[.\s]?\d{3}[-.\s]?\d{2}|\d{11})(?!\d)/g

  let match: RegExpExecArray | null
  while ((match = cpfRegex.exec(rawText)) !== null) {
    const rawMatch = match[0]
    const digits = rawMatch.replace(/\D/g, '')

    if (isValidCpf(digits)) {
      const idx = match.index
      const ctxBefore = rawText.substring(Math.max(0, idx - 80), idx)
      const ctxAfter = rawText.substring(
        idx + rawMatch.length,
        Math.min(rawText.length, idx + rawMatch.length + 80),
      )
      const fullCtx = (ctxBefore + ' ' + ctxAfter).toLowerCase()

      let score = 10

      // Priority if context mentions CPF / Pagador / Sacado / Inscrição
      if (/cpf|pagador|sacado|inquilino|inscricao|inscrição/i.test(fullCtx)) {
        score += 200
      }

      // Extra priority if preceded immediately by CPF or Pagador label
      if (/(?:cpf|pagador|sacado)[:\s]*$/i.test(ctxBefore.trim())) {
        score += 300
      }

      // Prefer standard formatted CPF string over raw digits
      if (/\d{3}\.\d{3}\.\d{3}[-.\s]?\d{2}/.test(rawMatch)) {
        score += 50
      }

      // Penalize if context indicates Beneficiário / Payee instead of Pagador
      if (/beneficiar|cedente/i.test(ctxBefore.toLowerCase())) {
        score -= 50
      }

      candidates.push({
        raw: rawMatch,
        cleaned: cleanCpf(digits),
        score,
      })
    }
  }

  // Fallback: Check if there's a valid CNPJ if no valid CPF was found
  if (candidates.length === 0) {
    const cnpjRegex = /(?<!\d)(?:\d{2}\.\d{3}\.\d{3}\/\d{4}[-.\s]?\d{2}|\d{14})(?!\d)/g
    while ((match = cnpjRegex.exec(rawText)) !== null) {
      const rawMatch = match[0]
      const digits = rawMatch.replace(/\D/g, '')

      if (isValidCnpj(digits)) {
        const idx = match.index
        const ctxBefore = rawText.substring(Math.max(0, idx - 80), idx)
        if (/pagador|sacado|inquilino/i.test(ctxBefore)) {
          candidates.push({
            raw: rawMatch,
            cleaned: cleanCpf(digits),
            score: 100,
          })
        }
      }
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score)
    return candidates[0].cleaned
  }

  return ''
}

const STOP_WORDS_NAME = new Set([
  'CPF',
  'CNPJ',
  'RUA',
  'AV',
  'AVENIDA',
  'ALAMEDA',
  'PRAÇA',
  'PRACA',
  'ESTRADA',
  'RODOVIA',
  'ENDEREÇO',
  'ENDERECO',
  'CEP',
  'BAIRRO',
  'CIDADE',
  'UF',
  'VENCIMENTO',
  'VALOR',
  'DOCUMENTO',
  'NOSSO',
  'NUMERO',
  'NÚMERO',
  'AGENCIA',
  'AGÊNCIA',
  'CONTA',
  'CARTEIRA',
  'SANTANDER',
  'ITAÚ',
  'ITAU',
  'BRADESCO',
  'CAIXA',
  'BANCO',
  'S/A',
  'SA',
  'BENEFICIARIO',
  'BENEFICIÁRIO',
  'CEDENTE',
  'SACADOR',
  'AVALISTA',
  'DEMONSTRATIVO',
  'INSTRUÇÕES',
  'INSTRUCOES',
  'AUTENTICAÇÃO',
  'AUTENTICACAO',
  'MUNICÍPIO',
  'MUNICIPIO',
  'COMPLEMENTO',
  'PAGADOR',
  'SACADO',
  'DADOS',
  'NOME',
  'RAZÃO',
  'RAZAO',
  'SOCIAL',
  'INSCRICAO',
  'INSCRIÇÃO',
  'CHAVE',
  'PIX',
  'RECIBO',
  'LOCAL',
  'PAGAMENTO',
  'MULTA',
  'JUROS',
  'DESCONTO',
  'ABATIMENTO',
  'DESCONTOS',
  'OUTROS',
  'ACRÉSCIMOS',
  'ACRESCIMOS',
  'COBRADO',
  'ESPÉCIE',
  'ESPECIE',
  'MOEDA',
  'QUANTIDADE',
  'ACEITE',
  'PROCESSAMENTO',
])

function cleanExtractedName(raw: string): string {
  if (!raw) return ''
  const tokens = raw.trim().split(/\s+/)
  const validWords: string[] = []

  for (const token of tokens) {
    if (/\d/.test(token)) {
      if (validWords.length >= 2) break
      continue
    }
    const cleanWord = token.replace(
      /^[^A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]+|[^A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]+$/g,
      '',
    )
    if (!cleanWord) continue

    const upperWord = cleanWord.toUpperCase()
    if (STOP_WORDS_NAME.has(upperWord)) {
      if (validWords.length >= 2) break
      continue
    }

    // Connectors like 'de', 'da', 'do', 'dos', 'das', 'e' are allowed
    if (cleanWord.length === 1 && !/^[eEaA]$/.test(cleanWord)) continue

    validWords.push(upperWord)
  }

  if (validWords.length === 0) return ''
  return validWords.join(' ')
}

function extractNameFromFileName(fileName: string): string {
  if (!fileName) return 'NÃO IDENTIFICADO'
  const clean = fileName
    .replace(/\.pdf$/i, '')
    .replace(/[-_].*$/, '')
    .replace(/\d+/g, '')
    .trim()
  return clean || 'NÃO IDENTIFICADO'
}

/**
 * Extracts the tenant full name from PDF text, prioritizing Pagador/Sacado fields over fileName
 */
export function extractNameFromText(rawText: string, validCpf: string, fileName: string): string {
  if (!rawText) return extractNameFromFileName(fileName)

  interface NameCandidate {
    name: string
    score: number
  }

  const candidates: NameCandidate[] = []

  // Strategy 1: Search after explicit "Pagador" / "Sacado" / "Nome" labels
  const pagadorPatterns = [
    /(?:Pagador\s*\/\s*Sacado|Pagador\s*\/\s*Avalista|Nome\s+do\s+Pagador|Dados\s+do\s+Pagador|Pagador|Sacado)[:\s-]+\s*([A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç\s'.-]{3,80})/gi,
    /(?:Nome[:\s]+)([A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç\s'.-]{3,80})/gi,
  ]

  for (const rx of pagadorPatterns) {
    let m: RegExpExecArray | null
    while ((m = rx.exec(rawText)) !== null) {
      const captured = m[1]
      const cleaned = cleanExtractedName(captured)
      const words = cleaned.split(/\s+/).filter(Boolean)
      if (words.length >= 2) {
        let score = 500 + words.length * 10
        if (/pagador/i.test(m[0])) score += 300
        candidates.push({ name: cleaned, score })
      } else if (words.length === 1 && words[0].length >= 3) {
        candidates.push({ name: cleaned, score: 100 })
      }
    }
  }

  // Strategy 2: Proximity to valid CPF (if found)
  if (validCpf) {
    const rawDigits = validCpf.replace(/\D/g, '')
    const formattedCpf = cleanCpf(rawDigits)

    const cpfPatternStr = `(?:${formattedCpf.replace(/\./g, '\\.').replace(/-/g, '\\-')}|${rawDigits})`
    const cpfRx = new RegExp(cpfPatternStr, 'g')

    let m: RegExpExecArray | null
    while ((m = cpfRx.exec(rawText)) !== null) {
      const idx = m.index
      // Text before CPF
      const beforeText = rawText.substring(Math.max(0, idx - 100), idx)
      const nameBefore = cleanExtractedName(beforeText)
      const wordsBefore = nameBefore.split(/\s+/).filter(Boolean)
      if (wordsBefore.length >= 2) {
        candidates.push({ name: nameBefore, score: 800 + wordsBefore.length * 10 })
      }

      // Text after CPF
      const afterText = rawText.substring(
        idx + m[0].length,
        Math.min(rawText.length, idx + m[0].length + 100),
      )
      const nameAfter = cleanExtractedName(afterText)
      const wordsAfter = nameAfter.split(/\s+/).filter(Boolean)
      if (wordsAfter.length >= 2) {
        candidates.push({ name: nameAfter, score: 700 + wordsAfter.length * 10 })
      }
    }
  }

  // Strategy 3: Search for blocks of capitalized words representing full names in text
  const fullNameRegex =
    /(?<![A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç])([A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ]+(?:\s+(?:de|da|do|dos|das|e|[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ]+)){1,5})(?![A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç])/g
  let fnMatch: RegExpExecArray | null
  while ((fnMatch = fullNameRegex.exec(rawText)) !== null) {
    const cleaned = cleanExtractedName(fnMatch[1])
    const words = cleaned.split(/\s+/).filter(Boolean)
    if (words.length >= 2) {
      const idx = fnMatch.index
      const ctx = rawText.substring(
        Math.max(0, idx - 40),
        Math.min(rawText.length, idx + fnMatch[0].length + 40),
      )
      if (!/beneficiar|cedente|imobiliaria|banco|ltda|s\/a|condominio/i.test(ctx)) {
        candidates.push({ name: cleaned, score: 200 + words.length * 10 })
      }
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score)
    return candidates[0].name
  }

  return extractNameFromFileName(fileName)
}

/**
 * Extracts document amount (Valor do Documento), ignoring interest / late fees
 */
export function extractAmountFromText(rawText: string): string {
  if (!rawText) return '0,00'

  const parseBrlFloat = (str: string): number => {
    if (!str) return 0
    const clean = str.replace(/[^\d.,]/g, '').trim()
    if (!clean) return 0
    if (clean.includes(',')) {
      const norm = clean.replace(/\./g, '').replace(',', '.')
      const val = parseFloat(norm)
      return isNaN(val) ? 0 : val
    }
    const val = parseFloat(clean)
    return isNaN(val) ? 0 : val
  }

  const isJurosOrAtraso = (ctx: string): boolean => {
    return /juros|atraso|multa|mora|por\s+dia|dia\s+de|encargo|perman/i.test(ctx)
  }

  interface AmountCandidate {
    raw: string
    val: number
    score: number
  }

  const candidates: AmountCandidate[] = []

  // Strategy A: Explicit Label Match ("Valor do Documento", "Valor Cobrado", "(=>) Valor do Documento", "Valor (R$)")
  const labelRegexes = [
    /(?:Valor\s+do\s+Documento|Valor\s+Documento|Valor\s+Cobrado|\(=>\)\s*Valor\s*(?:do\s*Documento)?)[:\s]*R?\$?\s*([\d.]+,\d{2})/gi,
    /(?:Valor\s+do\s+Documento|Valor\s+Documento|Valor\s+Cobrado|\(=>\)\s*Valor)[:\s\S]{0,40}?(?:R\$\s*)?([\d.]+,\d{2})/gi,
  ]

  for (const rx of labelRegexes) {
    let m: RegExpExecArray | null
    while ((m = rx.exec(rawText)) !== null) {
      const valStr = m[1]?.trim()
      if (!valStr) continue
      const idx = m.index
      const ctx = rawText.substring(
        Math.max(0, idx - 40),
        Math.min(rawText.length, idx + m[0].length + 40),
      )
      if (!isJurosOrAtraso(ctx)) {
        const num = parseBrlFloat(valStr)
        if (num > 0) {
          candidates.push({ raw: valStr, val: num, score: 2000 + num })
        }
      }
    }
  }

  // Strategy B: General currency match scan (e.g. "1.573,00" or "R$ 1.573,00")
  const currencyRegex = /(?:R\$\s*)?([\d]{1,3}(?:\.[\d]{3})*,[\d]{2})/g
  let cm: RegExpExecArray | null
  while ((cm = currencyRegex.exec(rawText)) !== null) {
    const valStr = cm[1]?.trim()
    if (!valStr) continue
    const idx = cm.index
    const ctx = rawText.substring(
      Math.max(0, idx - 50),
      Math.min(rawText.length, idx + cm[0].length + 50),
    )

    if (!isJurosOrAtraso(ctx)) {
      const num = parseBrlFloat(valStr)
      if (num > 0) {
        let score = 10
        if (/valor|documento|cobrado/i.test(ctx)) {
          score += 200
        }
        if (num > 5) {
          score += 100
        }
        candidates.push({ raw: valStr, val: num, score: score + num / 100 })
      }
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score)
    const topNum = candidates[0].val
    return topNum.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return '0,00'
}

/**
 * Extracts due date (Vencimento) in DD/MM/YYYY format
 */
export function extractDueDateFromText(rawText: string): string {
  if (!rawText) return 'NÃO IDENTIFICADO'

  const dueDateRegexes = [
    /(?:Vencimento|Venc|Data\s+de\s+Vencimento)[:\s]*(\d{2}\/\d{2}\/\d{4})/i,
    /(\d{2}\/\d{2}\/\d{4})/,
  ]

  for (const rx of dueDateRegexes) {
    const match = rawText.match(rx)
    if (match && match[1]) {
      return match[1]
    }
  }

  return 'NÃO IDENTIFICADO'
}

/**
 * Parses Itaú Boleto text to extract: Name, CPF, Due Date (Vencimento), Amount (Valor)
 */
export function parseItauBoletoText(rawText: string, fileName: string): ParsedBoleto {
  const cpf = extractCpfFromText(rawText)
  const name = extractNameFromText(rawText, cpf, fileName)
  const dueDate = extractDueDateFromText(rawText)
  const amount = extractAmountFromText(rawText)

  return {
    fileName,
    name: name || 'NÃO IDENTIFICADO',
    cpf: cpf || 'NÃO IDENTIFICADO',
    dueDate: dueDate || 'NÃO IDENTIFICADO',
    amount: amount || '0,00',
    rawText,
  }
}
