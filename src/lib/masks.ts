/**
 * Funções utilitárias de máscaras para formulários de cadastro
 * - Data: DD/MM/AAAA (somente dígitos)
 * - Moeda: R$ xxx.xxx,xx (prefixo "R$ " + separador de milhar com ponto e decimal com vírgula)
 * - CEP: xx.xxx-xxx
 * - Telefone/Celular: (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
 */

/**
 * Máscara para Data no formato DD/MM/AAAA
 * Aceita apenas dígitos e limita a 8 dígitos (DDMMAAAA)
 */
export function maskDate(value: string | null | undefined): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/**
 * Máscara para Valor Monetário no formato R$ xxx.xxx,xx
 * Aceita apenas dígitos, trata como centavos e formata com separador de milhar e vírgula decimal
 * Exemplo:
 * "" -> ""
 * "1" -> "R$ 0,01"
 * "123" -> "R$ 1,23"
 * "123456" -> "R$ 1.234,56"
 * "123456789" -> "R$ 1.234.567,89"
 */
export function maskCurrency(value: string | null | undefined): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''

  // Parse digits as integer (cents)
  const cents = parseInt(digits, 10)
  if (isNaN(cents)) return ''

  const decimal = (cents / 100).toFixed(2)
  const [intPart, decPart] = decimal.split('.')
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${formattedInt},${decPart}`
}

/**
 * Máscara para CEP no formato xx.xxx-xxx
 * Aceita até 8 dígitos
 */
export function maskCep(value: string | null | undefined): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}-${digits.slice(5)}`
}

/**
 * Máscara para Telefone/Celular no formato (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
 * Aceita até 11 dígitos
 */
export function maskPhone(value: string | null | undefined): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    // Fixo: (XX) XXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  // Celular: (XX) XXXXX-XXXX
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}
