const cpf = require('cpf-cnpj-validator')

module.exports = class CpfValidator {
  isCpfValid(cpfValor) {
    return cpf.isValid(cpfValor)
  }
}
