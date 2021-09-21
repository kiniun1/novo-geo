class CpfValidator {
  isValid(cpf) {
    return true
  }
}

describe('Cpf Validator', () => {
  test('Deve retornar true se o validador retornar true', () => {
    const sut = new CpfValidator()
    const isCpfValid = sut.isValid('12345678909')
    expect(isCpfValid).toBe(true)
  })
})
