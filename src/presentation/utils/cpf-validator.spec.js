const cpf = require('cpf-cnpj-validator')

class CpfValidator {
  isCpfValid(cpfValor) {
    return cpf.isValid(cpfValor)
  }
}

const makeSut = () => {
  return new CpfValidator()
}

describe('Cpf Validator', () => {
  test('Deve retornar true se o validador retornar true', () => {
    const sut = makeSut()
    const isCpfValid = sut.isCpfValid('00000000000')
    expect(isCpfValid).toBe(true)
  })

  test('Deve retornar false se o validador retornar false', () => {
    cpf.isCpfValid = false
    const sut = makeSut()
    const isCpfValid = sut.isCpfValid('00000000000')
    expect(isCpfValid).toBe(false)
  })

  /* test('Deve retornar chamar o validator com o cpf correto', () => {
    const sut = makeSut()
    sut.isValid('12345678901')
    expect(cpf.).toBe('12345678901')
  }) */
})
