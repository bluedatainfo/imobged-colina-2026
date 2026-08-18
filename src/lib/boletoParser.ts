import * as pdfjsLib from 'pdfjs-dist'

// Configure worker to use cdnjs CDN matching pdfjs-dist version or standard worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export interface BoletoBreakdownItem {
  description: string
  value: string // e.g. "2.400,00" or "-250,00" / "(250,00)"
  dueDate?: string // e.g. "28/08/26" or "28/08/2026"
}

export interface ParsedBoleto {
  fileName: string
  name: string
  cpf: string
  dueDate: string // DD/MM/YYYY
  amount: string // e.g. "1.234,56"
  rawText: string
  breakdown?: BoletoBreakdownItem[]
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

  const weight1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i), 10) * weight1[i]
  }
  let rev = sum % 11
  const d1 = rev < 2 ? 0 : 11 - rev
  if (d1 !== parseInt(digits.charAt(12), 10)) return false

  const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits.charAt(i), 10) * weight2[i]
  }
  rev = sum % 11
  const d2 = rev < 2 ? 0 : 11 - rev
  if (d2 !== parseInt(digits.charAt(13), 10)) return false

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
 * Extracts valid CPF (11 digits) or CNPJ (14 digits) from text, excluding barcode segments.
 *
 * The key difficulty is that a boleto always carries TWO relevant documents:
 * the Beneficiário's (Imobiliária Colina) and the Pagador/Sacado's. We must keep
 * only the Pagador's. We decide which "region" each candidate belongs to by
 * comparing the character distance to the nearest "pagador/sacado" label vs the
 * nearest "beneficiário/cedente" label — this is far more reliable than a fixed
 * context-window penalty.
 */
export function extractCpfFromText(rawText: string): string {
  if (!rawText) return ''

  // Pre-clean raw text from common barcode lines or noise sequences that corrupt document extraction
  const sanitizedText = rawText
    .replace(/\d{5}\.\d{5}\s+\d{5}\.\d{6}\s+\d{5}\.\d{6}\s+\d\s+\d{14}/g, ' ') // Linea digitavel
    .replace(/\b\d{47,48}\b/g, ' ') // Raw bar code numbers

  interface DocCandidate {
    raw: string
    cleaned: string
    digits: string
    isCnpj: boolean
    score: number
  }

  const candidates: DocCandidate[] = []

  // Pre-compute label positions so we can attribute each document to a region.
  const labelPositions = (pattern: RegExp): number[] => {
    const positions: number[] = []
    const rx = new RegExp(pattern.source, 'gi')
    let m: RegExpExecArray | null
    while ((m = rx.exec(sanitizedText)) !== null) {
      positions.push(m.index)
      if (m.index === rx.lastIndex) rx.lastIndex++
    }
    return positions
  }

  const pagadorLabelPos = labelPositions(
    /pagador|sacado|inquilino|locat[aá]rio|devedor|cliente|contratante|pagador\s*\/\s*sacado|pagador\s*\/\s*avalista/gi,
  )
  const benefLabelPos = labelPositions(
    /benefici[aá]rio|beneficiar|cedente|emissor|cooperativa|favorecido|credor|recebedor/gi,
  )

  const nearestDist = (positions: number[], idx: number): number => {
    let min = Infinity
    for (const p of positions) {
      const d = Math.abs(p - idx)
      if (d < min) min = d
    }
    return min
  }

  const scan = (regex: RegExp, isCnpj: boolean) => {
    let match: RegExpExecArray | null
    while ((match = regex.exec(sanitizedText)) !== null) {
      const rawMatch = match[0]
      const digits = rawMatch.replace(/\D/g, '')
      const valid = isCnpj ? isValidCnpj(digits) : isValidCpf(digits)
      if (!valid) continue

      const idx = match.index
      const ctxBefore = sanitizedText.substring(Math.max(0, idx - 150), idx)
      const ctxAfter = sanitizedText.substring(
        idx + rawMatch.length,
        Math.min(sanitizedText.length, idx + rawMatch.length + 150),
      )
      const fullCtx = (ctxBefore + ' ' + ctxAfter).toLowerCase()
      const prefix = sanitizedText.substring(Math.max(0, idx - 30), idx)

      let score = 10

      // Strong: document explicitly labeled right before it
      // (CPF:, CNPJ:, CPF/CNPJ:, CNPJ/CPF:, DOC:, DOCUMENTO:)
      if (/(?:cpf\s*\/\s*cnpj|cnpj\s*\/\s*cpf|cpf|cnpj|doc(?:umento)?)\s*[:/]?\s*$/i.test(prefix)) {
        score += 400
      }

      // Region decision: which label is this document closest to?
      const distPagador = nearestDist(pagadorLabelPos, idx)
      const distBenef = nearestDist(benefLabelPos, idx)

      if (distBenef !== Infinity && distBenef < distPagador) {
        // Closer to the Beneficiário/Cedente label -> this is the Beneficiário's
        // document (e.g. Imobiliária Colina's CNPJ). Exclude it hard.
        score -= 100000
      } else if (distPagador !== Infinity) {
        if (distPagador <= 60) score += 350
        else if (distPagador <= 120) score += 200
        else if (distPagador <= 220) score += 80
      }

      // Light context confirmation
      if (
        /cpf|cnpj|pagador|sacado|inquilino|locat[aá]rio|inscriç[aã]o|dados do pagador/i.test(
          fullCtx,
        )
      ) {
        score += 50
      }

      // Formatting bonus (properly masked documents are more trustworthy)
      if (
        isCnpj
          ? /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(rawMatch)
          : /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(rawMatch)
      ) {
        score += 30
      }

      // Belt-and-suspenders: penalize anything still smelling like the Beneficiário
      if (/beneficiar|benefici[aá]rio|cedente|emissor|cooperativa|favorecido/i.test(ctxBefore)) {
        score -= 1000
      }

      candidates.push({ raw: rawMatch, cleaned: cleanCpf(digits), digits, isCnpj, score })
    }
  }

  // CPF (11 digits)
  scan(/(?<!\d)(?:\d{3}[.\s]?\d{3}[.\s]?\d{3}[-.\s]?\d{2}|\d{11})(?!\d)/g, false)
  // CNPJ (14 digits)
  scan(/(?<!\d)(?:\d{2}[.\s]?\d{3}[.\s]?\d{3}[/\s]?\d{4}[-.\s]?\d{2}|\d{14})(?!\d)/g, true)

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score)
    return candidates[0].cleaned
  }

  return ''
}

const CONNECTIVES = new Set(['DE', 'DO', 'DA', 'DOS', 'DAS', 'E', 'DEL', 'DELLA'])

const STOP_WORDS_NAME = new Set([
  'PAGO',
  'PAGADOR',
  'SACADO',
  'NOME',
  'CPF',
  'CNPJ',
  'ENDERECO',
  'ENDEREÇO',
  'CIDADE',
  'UF',
  'CEP',
  'VENCIMENTO',
  'VALOR',
  'DOCUMENTO',
  'RUA',
  'AV',
  'AVENIDA',
  'ALAMEDA',
  'PRAÇA',
  'PRACA',
  'ESTRADA',
  'RODOVIA',
  'BAIRRO',
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
  'DADOS',
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
  'COBRAR',
  'ENCIMENTO',
  'ESPÉCIE',
  'ESPECIE',
  'MOEDA',
  'QUANTIDADE',
  'ACEITE',
  'PROCESSAMENTO',
  'SALAO',
  'SALÃO',
  'LOJA',
  'SALA',
  'GALPAO',
  'GALPÃO',
  'JUNDIAI',
  'JUNDIAÍ',
  'VILA',
  'ARENS',
  'PARQUE',
  'JARDIM',
  'RESIDENCIAL',
  'CONDOMINIO',
  'CONDOMÍNIO',
  'EDIFICIO',
  'EDIFÍCIO',
  'BLOCO',
  'APTO',
  'APT',
  'APARTAMENTO',
])

const ADDRESS_KEYWORDS = new Set([
  'RUA',
  'AV',
  'AVENIDA',
  'ALAMEDA',
  'PRAÇA',
  'PRACA',
  'ESTRADA',
  'RODOVIA',
  'TRAVESSA',
  'PASSEIO',
  'LOTE',
  'LOTEAMENTO',
  'QUADRA',
  'BLOCO',
  'APTO',
  'APT',
  'APARTAMENTO',
  'CASA',
  'LOJA',
  'SALA',
  'SALAO',
  'SALÃO',
  'GALPAO',
  'GALPÃO',
  'ANDAR',
  'CONJUNTO',
  'KM',
  'BAIRRO',
  'CIDADE',
  'MUNICÍPIO',
  'MUNICIPIO',
  'ENDEREÇO',
  'ENDERECO',
  'COMPLEMENTO',
  'CEP',
  'UF',
  'JARDIM',
  'VILA',
  'PARQUE',
  'CENTRO',
  'RESIDENCIAL',
  'CHACARA',
  'CHÁCARA',
  'FAZENDA',
  'SITIO',
  'SÍTIO',
  'JUNDIAI',
  'JUNDIAÍ',
  'CAMPINAS',
  'SANTOS',
  'SOROCABA',
  'PIRACICABA',
  'BARUERI',
  'OSASCO',
  'GUARULHOS',
  'SANTO',
  'ANDRE',
  'BERNARDO',
  'CAETANO',
  'SÃO',
  'SAO',
  'PAULO',
  'RIO',
  'JANEIRO',
  'HORIZONTE',
  'CURITIBA',
  'PORTO',
  'ALEGRE',
  'ARENS',
])

const UF_SET = new Set([
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MG',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SC',
  'SE',
  'SP',
  'TO',
])

function isAddressLine(text: string): boolean {
  if (!text) return false
  const clean = text.trim()
  if (!clean) return false

  if (/\b\d{5}[-.\s]?\d{3}\b/.test(clean)) return true

  const words = clean.toUpperCase().split(/\s+/)
  if (words.length === 0) return false

  const first = words[0]
  if (
    [
      'RUA',
      'AV',
      'AVENIDA',
      'ALAMEDA',
      'PRAÇA',
      'PRACA',
      'ESTRADA',
      'RODOVIA',
      'TRAVESSA',
      'SALAO',
      'SALÃO',
      'LOJA',
      'SALA',
      'GALPAO',
      'GALPÃO',
      'APTO',
      'APT',
      'APARTAMENTO',
      'BLOCO',
      'CASA',
      'RESIDENCIAL',
      'CONDOMINIO',
      'CONDOMÍNIO',
    ].includes(first)
  ) {
    return true
  }

  let matches = 0
  for (const w of words) {
    if (ADDRESS_KEYWORDS.has(w) || UF_SET.has(w)) {
      matches++
    }
  }

  if (matches / words.length >= 0.4) {
    return true
  }

  return false
}

export function cleanExtractedName(raw: string): string {
  if (!raw) return ''

  let text = raw
    .replace(/(?:cpf|cnpj|inscricao|inscrição|doc|documento)[:\s]*[\d./-]+/gi, ' ')
    .replace(/\b\d{2,3}[.\s]?\d{3}[.\s]?\d{3}[-./\s]?\d{2,4}[-.\s]?\d{2}\b/g, ' ')
    .replace(/\b\d{5,}\b/g, ' ')

  const tokens = text
    .trim()
    .split(/[\s/\\|]+/)
    .filter(Boolean)
  const validWords: string[] = []

  for (const token of tokens) {
    if (/\d/.test(token)) {
      if (validWords.length >= 1) break
      continue
    }

    const cleanWord = token.replace(
      /^[^A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]+|[^A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]+$/g,
      '',
    )
    if (!cleanWord) continue

    const upperWord = cleanWord.toUpperCase()

    // Connectives (DE, DO, DA, DOS, DAS, E, DEL, DELLA) are part of names and MUST NOT break extraction
    if (CONNECTIVES.has(upperWord)) {
      if (validWords.length >= 1) {
        validWords.push(upperWord)
      }
      continue
    }

    // Stop name extraction immediately if a hard stop word (ADDRESS_KEYWORDS, UF_SET, or STOP_WORDS_NAME) is detected
    if (
      ADDRESS_KEYWORDS.has(upperWord) ||
      UF_SET.has(upperWord) ||
      STOP_WORDS_NAME.has(upperWord)
    ) {
      if (validWords.length >= 1) break
      continue
    }

    // Short word filter (ignore non-connective tokens shorter than 2 chars)
    if (cleanWord.length < 2) {
      continue
    }

    validWords.push(upperWord)
  }

  // Pop trailing connectives if any
  while (validWords.length > 0 && CONNECTIVES.has(validWords[validWords.length - 1])) {
    validWords.pop()
  }

  // Filter out candidates consisting ONLY of connectives
  const nonConnectives = validWords.filter((w) => !CONNECTIVES.has(w))
  if (nonConnectives.length === 0) return ''

  const result = validWords.join(' ')
  if (result.length < 3) return ''
  if (isAddressLine(result)) return ''
  return result
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
 * A candidate human/company name found in the PDF text.
 */
interface NameCandidate {
  name: string
  score: number
}

/**
 * Indexes every occurrence of any of the given label words in `rawText` so we
 * can later attribute a candidate name/document to the nearest label (Pagador
 * vs Beneficiário) by character distance.
 */
function indexLabels(rawText: string, labels: string[]): number[] {
  const positions: number[] = []
  for (const label of labels) {
    const rx = new RegExp(label, 'gi')
    let m: RegExpExecArray | null
    while ((m = rx.exec(rawText)) !== null) {
      positions.push(m.index)
      if (m.index === rx.lastIndex) rx.lastIndex++
    }
  }
  positions.sort((a, b) => a - b)
  return positions
}

const PAGADOR_LABELS = [
  'pagador\\s*\\/\\s*sacado',
  'pagador\\s*\\/\\s*avalista',
  'nome\\s+do\\s+pagador',
  'dados\\s+do\\s+pagador',
  'pagador',
  'sacado',
  'inquilino',
  'locat[aá]rio',
  'devedor',
  'cliente',
  'contratante',
]
const BENEF_LABELS = [
  'benefici[aá]rio',
  'beneficiar',
  'cedente',
  'emissor',
  'cooperativa',
  'favorecido',
  'credor',
  'recebedor',
  'imob[ií]li[aá]ria',
]

function nearestDistance(positions: number[], idx: number): number {
  let min = Infinity
  for (const p of positions) {
    const d = Math.abs(p - idx)
    if (d < min) min = d
    if (p > idx) break
  }
  return min
}

function isBeneficiaryRegion(idx: number, pagadorPos: number[], benefPos: number[]): boolean {
  const dPag = nearestDistance(pagadorPos, idx)
  const dBen = nearestDistance(benefPos, idx)
  return dBen !== Infinity && dBen < dPag
}

/**
 * Extracts the tenant full name or corporate name from PDF text.
 *
 * Strategy (in priority order, each producing scored candidates):
 *  1. The text immediately around the Pagador's CPF/CNPJ (the single most
 *     reliable cue on a boleto) — prefer the name that appears right BEFORE the
 *     document, falling back to the text right AFTER it.
 *  2. Explicit "Pagador / Sacado" label captures.
 *  3. File-name fallback.
 *
 * Beneficiário/Cedente text is actively suppressed by region attribution so
 * "Imobiliária Colina" is never returned, and address-looking fragments
 * ("SALAO VILA ARENS JUNDIAI") are dropped by cleanExtractedName/isAddressLine.
 */
export function extractNameFromText(rawText: string, validCpf: string, fileName: string): string {
  const fileFallback = extractNameFromFileName(fileName)

  const candidates: NameCandidate[] = []

  if (!rawText) {
    if (fileFallback && fileFallback !== 'NÃO IDENTIFICADO' && !isAddressLine(fileFallback)) {
      return fileFallback
    }
    return 'NÃO IDENTIFICADO'
  }

  const pagadorPos = indexLabels(rawText, PAGADOR_LABELS)
  const benefPos = indexLabels(rawText, BENEF_LABELS)

  const isAcceptableName = (name: string): boolean => {
    if (!name || name.length < 3) return false
    if (isAddressLine(name)) return false
    const words = name.split(/\s+/).filter(Boolean)
    if (words.length === 0) return false
    // Ignore candidate names consisting only of connectives
    const nonConnectives = words.filter((w) => !/^(?:[eEaA]|DE|DO|DA|DOS|DAS|DEL)$/i.test(w))
    if (nonConnectives.length === 0) return false
    return true
  }

  // Strategy 1: Prioritize the block of text IMMEDIATELY following the "Pagador" or "Sacado" labels
  const labelAfterPatterns = [
    /(?:Nome\s+do\s+Pagador\/CPF\/CNPJ\/Endereço(?:\/Cidade\/UF\/CEP)?|Nome\s+do\s+Pagador\/CPF\/CNPJ|Dados\s+do\s+Pagador|Pagador\s*\/\s*Sacado|Pagador\s*\/\s*Avalista|Pagador|Sacado)[:\s/]*([A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç\s'.-]{3,120})/gi,
  ]

  for (const rx of labelAfterPatterns) {
    let m: RegExpExecArray | null
    while ((m = rx.exec(rawText)) !== null) {
      const idx = m.index
      if (isBeneficiaryRegion(idx, pagadorPos, benefPos)) continue

      const captured = m[1]
      const cleaned = cleanExtractedName(captured)
      if (isAcceptableName(cleaned)) {
        const words = cleaned.split(/\s+/).filter(Boolean)
        candidates.push({ name: cleaned, score: 2000 + words.length * 10 })
      }
    }
  }

  // Strategy 2: name attached to the Pagador's CPF/CNPJ (highest confidence when present)
  if (validCpf) {
    const rawDigits = validCpf.replace(/\D/g, '')
    const formattedDoc = cleanCpf(rawDigits)

    const groups = rawDigits.length === 14 ? [2, 3, 3, 4, 2] : [3, 3, 3, 2]
    let pos = 0
    const spacedParts: string[] = []
    for (const n of groups) {
      spacedParts.push(rawDigits.slice(pos, pos + n))
      pos += n
    }
    const spacedDoc = spacedParts.join('[./\\s-]?')

    const docPatternStr = `(?:${formattedDoc.replace(/\./g, '\\.').replace(/\//g, '\\/').replace(/-/g, '\\-')}|${rawDigits}|${spacedDoc})`
    const docRx = new RegExp(docPatternStr, 'g')

    let m: RegExpExecArray | null
    while ((m = docRx.exec(rawText)) !== null) {
      const idx = m.index

      if (isBeneficiaryRegion(idx, pagadorPos, benefPos)) continue

      // Text BEFORE the document
      const beforeText = rawText.substring(Math.max(0, idx - 160), idx)
      const nameBefore = cleanExtractedName(beforeText)
      if (isAcceptableName(nameBefore)) {
        const wordsBefore = nameBefore.split(/\s+/).filter(Boolean)
        candidates.push({ name: nameBefore, score: 1500 + wordsBefore.length * 20 })
      }

      // Text AFTER the document
      const afterText = rawText.substring(
        idx + m[0].length,
        Math.min(rawText.length, idx + m[0].length + 160),
      )
      const nameAfter = cleanExtractedName(afterText)
      if (isAcceptableName(nameAfter)) {
        const wordsAfter = nameAfter.split(/\s+/).filter(Boolean)
        candidates.push({ name: nameAfter, score: 1200 + wordsAfter.length * 20 })
      }
    }
  }

  // File fallback candidate as lower priority
  if (fileFallback && fileFallback !== 'NÃO IDENTIFICADO' && isAcceptableName(fileFallback)) {
    candidates.push({ name: fileFallback, score: 300 })
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score)
    return candidates[0].name
  }

  return fileFallback || 'NÃO IDENTIFICADO'
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
 * Helper to convert Brazilian formatted number (e.g. "2.400,00" or "2400,00") into number in cents to avoid float rounding errors
 */
function parseBrlToCents(valStr: string): number {
  if (!valStr) return 0
  const trimmed = valStr.trim()
  const isNegative =
    trimmed.startsWith('-') ||
    (trimmed.startsWith('(') && trimmed.endsWith(')')) ||
    /\(-?[\d.,]+\)/.test(trimmed)

  const clean = trimmed.replace(/[^\d.,]/g, '').trim()
  if (!clean) return 0
  let norm = clean
  if (clean.includes(',')) {
    norm = clean.replace(/\./g, '').replace(',', '.')
  }
  const floatVal = parseFloat(norm)
  if (isNaN(floatVal)) return 0
  const cents = Math.round(floatVal * 100)
  return isNegative ? -cents : cents
}

/**
 * Extracts breakdown (desmembramento) items from the Itaú boleto text.
 * Looks for 'Informações de responsabilidades do beneficiário' (or similar) section,
 * extracts items up to line starting with 'Cobrar juros de...',
 * matches pattern `[DESCRIPTION] -> [VALUE] Vencimento [DATE]` or similar,
 * and validates that sum of extracted items equals total amount.
 */
export function extractBreakdownFromText(
  rawText: string,
  totalAmountStr: string,
): BoletoBreakdownItem[] | undefined {
  if (!rawText) return undefined

  // Locate the header line
  const headerMatch = rawText.match(/Informações\s+de\s+responsabilidades\s+do\s+beneficiário:?/i)
  if (!headerMatch) return undefined

  const headerIndex = headerMatch.index! + headerMatch[0].length
  const textAfterHeader = rawText.substring(headerIndex)

  // Find the end line starting with "Cobrar juros de..." (or "Cobrar multa...", or next section)
  const endMatch = textAfterHeader.match(/Cobrar\s+juros\s+de/i)
  const sectionText = endMatch
    ? textAfterHeader.substring(0, endMatch.index)
    : textAfterHeader.substring(0, 1000)

  // Pattern: [DESCRIPTION] -> [VALUE] Vencimento [DATE]
  // Note: PDF text extraction might have line breaks or varying spaces around -> or Vencimento
  // Example: "ALUGUEL -> 2400,00 Vencimento 26/08/26"
  // Example: "CONDOMINIO CR -> 678,91 Vencimento 26/08/26"
  const itemRegex =
    /([A-Za-z0-9\s/._-]+?)\s*->\s*([\d]{1,3}(?:\.[\d]{3})*,[\d]{2}|[\d]+,[\d]{2})\s*(?:Vencimento|\bVenc\b|\bVenc:\b)?\s*(\d{2}\/\d{2}\/\d{2,4})?/gi

  const items: BoletoBreakdownItem[] = []
  let match: RegExpExecArray | null

  while ((match = itemRegex.exec(sectionText)) !== null) {
    const rawDesc = match[1]?.trim()
    const rawVal = match[2]?.trim()

    if (rawDesc && rawVal) {
      // Clean up description (remove leading/trailing symbols or common noise)
      const cleanDesc = rawDesc
        .replace(/^[^A-Za-z0-9]+/, '')
        .replace(/[^A-Za-z0-9\s/._-]+$/, '')
        .trim()

      if (cleanDesc) {
        // Format value to standard BRL string "X.XXX,XX"
        const cents = parseBrlToCents(rawVal)
        const formattedVal = (cents / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

        items.push({
          description: cleanDesc,
          value: formattedVal,
        })
      }
    }
  }

  if (items.length === 0) return undefined

  // Validation: Sum of item values must match totalAmountStr exactly
  const totalCents = parseBrlToCents(totalAmountStr)
  const itemsSumCents = items.reduce((sum, item) => sum + parseBrlToCents(item.value), 0)

  if (totalCents > 0 && itemsSumCents === totalCents) {
    return items
  }

  // If sum does not match, return undefined to ensure data integrity
  return undefined
}

/**
 * Parses Itaú Boleto text to extract: Name, CPF/CNPJ, Due Date (Vencimento), Amount (Valor), Breakdown
 */
export function parseItauBoletoText(rawText: string, fileName: string): ParsedBoleto {
  const cpf = extractCpfFromText(rawText)
  const name = extractNameFromText(rawText, cpf, fileName)
  const dueDate = extractDueDateFromText(rawText)
  const amount = extractAmountFromText(rawText)
  const breakdown = extractBreakdownFromText(rawText, amount)

  return {
    fileName,
    name: name || 'NÃO IDENTIFICADO',
    cpf: cpf || 'NÃO IDENTIFICADO',
    dueDate: dueDate || 'NÃO IDENTIFICADO',
    amount: amount || '0,00',
    rawText,
    breakdown,
  }
}
