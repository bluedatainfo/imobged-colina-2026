import { describe, it, expect } from 'vitest'
import {
  isValidCpf,
  isValidCnpj,
  cleanCpf,
  extractCpfFromText,
  extractNameFromText,
  extractBreakdownFromText,
  parseItauBoletoText,
} from './boletoParser'
import { buildWhatsAppLink } from './whatsappAndExcel'

describe('boletoParser breakdown extraction', () => {
  it('extracts breakdown items and validates total equal to Valor Documento', () => {
    const text = `
Itaú Banco Itaú S.A. 341-7
Informações de responsabilidades do beneficiário:
ALUGUEL -> 2400,00 Vencimento 26/08/26
CONDOMINIO CR -> 678,91 Vencimento 26/08/26
IPTU -> 103,25 Vencimento 26/08/26
Cobrar juros de R$ 1,06 por dia de atraso para pagamento após o vencimento.
Cobrar multa de 10,00% para pagamento após o vencimento.
Valor Documento 3.182,16
`
    const breakdown = extractBreakdownFromText(text, '3.182,16')
    expect(breakdown).toHaveLength(3)
    expect(breakdown).toEqual([
      { description: 'ALUGUEL', value: '2.400,00' },
      { description: 'CONDOMINIO CR', value: '678,91' },
      { description: 'IPTU', value: '103,25' },
    ])

    const parsed = parseItauBoletoText(text, 'teste.pdf')
    expect(parsed.breakdown).toBeDefined()
    expect(parsed.breakdown).toHaveLength(3)
    expect(parsed.amount).toBe('3.182,16')
  })

  it('rejects breakdown if sum does not match total amount', () => {
    const text = `
Informações de responsabilidades do beneficiário:
ALUGUEL -> 2000,00 Vencimento 26/08/26
CONDOMINIO CR -> 678,91 Vencimento 26/08/26
IPTU -> 103,25 Vencimento 26/08/26
Cobrar juros de R$ 1,06 por dia de atraso...
Valor Documento 3.182,16
`
    const breakdown = extractBreakdownFromText(text, '3.182,16')
    expect(breakdown).toBeUndefined()
  })

  it('formats WhatsApp message with breakdown items correctly without emojis', () => {
    const breakdown = [
      { description: 'ALUGUEL', value: '2.400,00' },
      { description: 'CONDOMINIO CR', value: '678,91' },
      { description: 'IPTU', value: '103,25' },
    ]

    const link = buildWhatsAppLink(
      '11999999999',
      'ISABELA MEDEIROS',
      '26/08/2026',
      '3.182,16',
      'https://onedrive.live.com/file123',
      breakdown,
    )

    const decoded = decodeURIComponent(link.replace(/%20/g, ' ').replace(/%0A/g, '\n'))

    expect(decoded).toContain('Vencimento: 26/08/2026')
    expect(decoded).toContain('Valor: R$ 3.182,16')
    expect(decoded).toContain('ALUGUEL: R$ 2.400,00')
    expect(decoded).toContain('CONDOMINIO CR: R$ 678,91')
    expect(decoded).toContain('IPTU: R$ 103,25')
  })
})
