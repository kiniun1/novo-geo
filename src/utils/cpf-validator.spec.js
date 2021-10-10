jest.mock('@fnando/cpf/commonjs', () => ({
  CpfValid: true,
  cpf: '',

  isValid(cpf) {
    this.cpf = cpf
    return this.CpfValid
  },
}))

const cpf = require('@fnando/cpf/commonjs')
const CpfValidator = require('./cpf-validator')
const { MissingParamError, InvalidParamError } = require('./errors')

const makeSut = () => {
  return new CpfValidator()
}

describe('Cpf Validator', () => {
  test('Deve retornar true se o validador retornar true', () => {
    const sut = makeSut()
    const isCpfValid = sut.isCpfValid('12345678909')
    expect(isCpfValid).toBe(true)
  })

  test('Deve retornar false se o validador retornar false', () => {
    cpf.CpfValid = false
    const sut = makeSut()
    const isCpfValid = sut.isCpfValid('00000000000')
    expect(isCpfValid).toBe(false)
  })

  test('Deve retornar chamar o validator com o cpf correto', () => {
    const sut = makeSut()
    sut.isCpfValid('12345678901')
    expect(cpf.cpf).toBe('12345678901')
  })

  test('Deve fazer um throw se não for fornecido um cpf', () => {
    const sut = makeSut()
    const invalid = null
    expect(() => {
      sut.isCpfValid(invalid)
    }).toThrow({ code: '01', message: new MissingParamError('cpf').message })
  })

  test('Deve fazer um throw se o cpf fornecido for não numérico', () => {
    const sut = makeSut()
    expect(() => {
      sut.isCpfValid('any-non-number-cpf')
    }).toThrow({ code: '01', message: new InvalidParamError('cpf').message })
  })
})
