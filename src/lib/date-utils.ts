const EXCEL_EPOCH_OFFSET = 25569
const MS_PER_DAY = 86400000

function parseExcelSerial(serial: number): Date | null {
  if (serial < 1 || serial > 200000) return null
  const ms = (serial - EXCEL_EPOCH_OFFSET) * MS_PER_DAY
  const date = new Date(ms)
  if (isNaN(date.getTime())) return null
  return date
}

function parseDateString(value: string): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (isoMatch) {
    const date = new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]))
    return isNaN(date.getTime()) ? null : date
  }

  const brMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/)
  if (brMatch) {
    let year = Number(brMatch[3])
    if (year < 100) year += year < 50 ? 2000 : 1900
    const date = new Date(year, Number(brMatch[2]) - 1, Number(brMatch[1]))
    return isNaN(date.getTime()) ? null : date
  }

  const usMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})/)
  if (usMatch) {
    let year = Number(usMatch[3])
    if (year < 100) year += year < 50 ? 2000 : 1900
    const date = new Date(year, Number(usMatch[1]) - 1, Number(usMatch[2]))
    return isNaN(date.getTime()) ? null : date
  }

  const fallback = new Date(trimmed)
  return isNaN(fallback.getTime()) ? null : fallback
}

export function formatExcelDate(value: unknown): string {
  if (value === null || value === undefined || value === '') return '-'

  if (typeof value === 'number') {
    const date = parseExcelSerial(value)
    if (date) return formatToBR(date)
  }

  const strValue = String(value).trim()

  const serialMatch = strValue.match(/^(\d{4,6})(?:\.(\d+))?$/)
  if (serialMatch) {
    const serial = Number(serialMatch[1])
    const date = parseExcelSerial(serial)
    if (date) return formatToBR(date)
  }

  const date = parseDateString(strValue)
  if (date) return formatToBR(date)

  return strValue
}

function formatToBR(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
