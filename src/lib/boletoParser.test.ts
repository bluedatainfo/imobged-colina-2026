import { describe, it, expect } from 'vitest'
import {
  isValidCpf,
  isValidCnpj,
  cleanCpf,
  extractCpfFromText,
  extractNameFromText,
  parseItauBoletoText,
} from './boletoParser'

describe('boletoParser CNPJ and Name extraction', () => {
  it('validates CNPJ checksums accurately', () => {
    // Standard test CNPJs
    expect(isValidCnpj('11.222.333/0001-81')).toBe(true)
    expect(isValidCnpj('11222333000181')).toBe(true)
    expect(isValidCnpj('00.000.000/0001-91')).toBe(true)
    expect(isValidCnpj('00000000000000')).toBe(false)
    expect(isValidCnpj('11111111111111')).toBe(false)
    expect(isValidCnpj('11.222.333/0001-00')).toBe(false)
  })

  it('cleans and formats CNPJ', () => {
    expect(cleanCpf('11222333000181')).toBe('11.222.333/0001-81')
  })

  it('extracts CNPJ when present in raw text', () => {
    const text = `
      Pagador / Sacado: AGAPRO VEDAÇÕES LTDA
      CNPJ: 11.222.333/0001-81
      SALAO VILA ARENS JUNDIAI SP
      Valor do Documento: R$ 4.700,80
    `
    expect(extractCpfFromText(text)).toBe('11.222.333/0001-81')
  })

  it('filters out address lines like SALAO VILA ARENS JUNDIAI SP in favor of company name', () => {
    const text = `
      PAGADOR/CPF/CNPJ/ENDEREÇO/CIDADE/UF/CEP
      AGAPRO VEDAÇÕES
      11.222.333/0001-81
      SALAO VILA ARENS JUNDIAI SP
      Vencimento: 07/03/2026
      Valor do Documento: R$ 4.700,80
    `
    const cnpj = extractCpfFromText(text)
    const name = extractNameFromText(text, cnpj, 'AGAPRO VEDAÇÕES 2302.pdf')

    expect(cnpj).toBe('11.222.333/0001-81')
    expect(name).toBe('AGAPRO VEDAÇÕES')
  })

  it('parses full boleto text with business tenant', () => {
    const text = `
      PAGADOR: AGAPRO VEDAÇÕES LTDA
      CNPJ: 11.222.333/0001-81
      ENDEREÇO: SALAO VILA ARENS JUNDIAI SP
      VENCIMENTO: 07/03/2026
      VALOR DO DOCUMENTO: 4.700,80
    `
    const parsed = parseItauBoletoText(text, 'AGAPRO VEDAÇÕES 2302.pdf')
    expect(parsed.name).toContain('AGAPRO VEDAÇÕES')
    expect(parsed.cpf).toBe('11.222.333/0001-81')
    expect(parsed.dueDate).toBe('07/03/2026')
    expect(parsed.amount).toBe('4.700,80')
  })
})
