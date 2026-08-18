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
      { description: 'ALUGUEL', value: '2.400,00', dueDate: '26/08/26' },
      { description: 'CONDOMINIO CR', value: '678,91', dueDate: '26/08/26' },
      { description: 'IPTU', value: '103,25', dueDate: '26/08/26' },
    ])

    const parsed = parseItauBoletoText(text, 'teste.pdf')
    expect(parsed.breakdown).toBeDefined()
    expect(parsed.breakdown).toHaveLength(3)
    expect(parsed.amount).toBe('3.182,16')
  })

  it('cleans noise like Juros/Multa or Desconto/Abatimento from item description', () => {
    const text = `
Informações de responsabilidades do beneficiário:
Desconto/Abatimento ALUGUEL -> 1100,00 Vencimento 28/08/26
CONDOMINIO CR -> 751,07 Vencimento 28/08/26
Juros/Multa IPTU -> 57,86 Vencimento 28/08/26
Cobrar juros de R$ 0,64 por dia de atraso...
Valor Documento 1.908,93
`
    const breakdown = extractBreakdownFromText(text, '1.908,93')
    expect(breakdown).toHaveLength(3)
    expect(breakdown).toEqual([
      { description: 'ALUGUEL', value: '1.100,00', dueDate: '28/08/26' },
      { description: 'CONDOMINIO CR', value: '751,07', dueDate: '28/08/26' },
      { description: 'IPTU', value: '57,86', dueDate: '28/08/26' },
    ])
  })

  it('supports negative values (credits) in parentheses and accented names e.g. REEMBOLSO DESP. LOCATÁRIO and sums correctly', () => {
    const text = `
Informações de responsabilidades do beneficiário:
ALUGUEL -> 900,00 Vencimento 28/08/26
CONDOMINIO CR -> 200,00 Vencimento 28/08/26
REEMBOLSO DESP. LOCATÁRIO -> (215,89) Vencimento 02/09/26
Cobrar juros de R$ 0,65 por dia de atraso...
Valor Documento 884,11
`
    const breakdown = extractBreakdownFromText(text, '884,11')
    expect(breakdown).toHaveLength(3)
    expect(breakdown).toEqual([
      { description: 'ALUGUEL', value: '900,00', dueDate: '28/08/26' },
      { description: 'CONDOMINIO CR', value: '200,00', dueDate: '28/08/26' },
      { description: 'REEMBOLSO DESP. LOCATÁRIO', value: '(215,89)', dueDate: '02/09/26' },
    ])
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

  it('formats WhatsApp message with breakdown items including Vencimento correctly', () => {
    const breakdown = [
      { description: 'ALUGUEL', value: '1.100,00', dueDate: '28/08/26' },
      { description: 'CONDOMINIO CR', value: '751,07', dueDate: '28/08/26' },
      { description: 'IPTU', value: '57,86', dueDate: '28/08/26' },
    ]

    const link = buildWhatsAppLink(
      '11999999999',
      'DANILO DE SOUZA SANTOS',
      '05/09/2026',
      '1.908,93',
      'https://onedrive.live.com/file123',
      breakdown,
    )

    const decoded = decodeURIComponent(link.replace(/%20/g, ' ').replace(/%0A/g, '\n'))

    expect(decoded).toContain(
      'Vencimento: 05/09/2026\nValor: R$ 1.908,93\n\nALUGUEL: R$ 1.100,00 (Vencimento: 28/08/26)',
    )
    expect(decoded).toContain('Valor: R$ 1.908,93')
    expect(decoded).toContain('ALUGUEL: R$ 1.100,00 (Vencimento: 28/08/26)')
    expect(decoded).toContain('CONDOMINIO CR: R$ 751,07 (Vencimento: 28/08/26)')
    expect(decoded).toContain('IPTU: R$ 57,86 (Vencimento: 28/08/26)')
  })
})
