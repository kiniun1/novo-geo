const { cpf } = require('cpf-cnpj-validator')

class CpfValidator {
  isValid(cpfValor) {
    return cpf.isValid(cpfValor)
  }
}

describe('Cpf Validator', () => {
  test('Deve retornar true se o validador retornar true', () => {
    const sut = new CpfValidator()
    const isCpfValid = sut.isValid('543.077.300-03')
    expect(isCpfValid).toBe(true)
  })

  test('Deve retornar false se o validador retornar false', () => {
    const sut = new CpfValidator()
    const isCpfValid = sut.isValid('00000000000')
    expect(isCpfValid).toBe(false)
  })
})
