const cpf = require('cpf-cnpj-validator')
const { MissingParamError, InvalidParamError } = require('./errors')

module.exports = class CpfValidator {
  isCpfValid(cpfValor) {
    if (!cpfValor) {
      throw new MissingParamError('cpf')
    }
    if (isNaN(cpfValor)) {
      throw new InvalidParamError('cpf')
    }
    return cpf.isValid(cpfValor)
  }
}
