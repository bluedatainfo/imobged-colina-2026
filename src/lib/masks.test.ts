import { describe, it, expect } from 'vitest'
import { maskDate, maskCurrency, maskCep, maskPhone } from './masks'

describe('masks utilities', () => {
  describe('maskDate', () => {
    it('formats digits as DD/MM/AAAA', () => {
      expect(maskDate('')).toBe('')
      expect(maskDate('1')).toBe('1')
      expect(maskDate('15')).toBe('15')
      expect(maskDate('150')).toBe('15/0')
      expect(maskDate('1508')).toBe('15/08')
      expect(maskDate('15081')).toBe('15/08/1')
      expect(maskDate('15081990')).toBe('15/08/1990')
      expect(maskDate('15081990999')).toBe('15/08/1990')
    })

    it('strips non-digits', () => {
      expect(maskDate('15-08-1990')).toBe('15/08/1990')
      expect(maskDate('abc15def08ghi1990')).toBe('15/08/1990')
    })
  })

  describe('maskCurrency', () => {
    it('formats monetary values with R$ prefix, dot thousands and comma decimal', () => {
      expect(maskCurrency('')).toBe('')
      expect(maskCurrency('0')).toBe('R$ 0,00')
      expect(maskCurrency('5')).toBe('R$ 0,05')
      expect(maskCurrency('50')).toBe('R$ 0,50')
      expect(maskCurrency('500')).toBe('R$ 5,00')
      expect(maskCurrency('123456')).toBe('R$ 1.234,56')
      expect(maskCurrency('150000000')).toBe('R$ 1.500.000,00')
    })

    it('strips existing currency symbols and punctuation when re-formatting', () => {
      expect(maskCurrency('R$ 1.234,56')).toBe('R$ 1.234,56')
      expect(maskCurrency('R$ 2.500,00')).toBe('R$ 2.500,00')
    })
  })

  describe('maskCep', () => {
    it('formats CEP as xx.xxx-xxx', () => {
      expect(maskCep('')).toBe('')
      expect(maskCep('0')).toBe('0')
      expect(maskCep('01')).toBe('01')
      expect(maskCep('013')).toBe('01.3')
      expect(maskCep('01310')).toBe('01.310')
      expect(maskCep('013101')).toBe('01.310-1')
      expect(maskCep('01310100')).toBe('01.310-100')
      expect(maskCep('01310100999')).toBe('01.310-100')
    })
  })

  describe('maskPhone', () => {
    it('formats 10 digits as (xx) xxxx-xxxx and 11 digits as (xx) xxxxx-xxxx', () => {
      expect(maskPhone('')).toBe('')
      expect(maskPhone('1')).toBe('(1')
      expect(maskPhone('11')).toBe('(11')
      expect(maskPhone('119')).toBe('(11) 9')
      expect(maskPhone('1133334444')).toBe('(11) 3333-4444')
      expect(maskPhone('11987654321')).toBe('(11) 98765-4321')
      expect(maskPhone('11987654321999')).toBe('(11) 98765-4321')
    })
  })
})
