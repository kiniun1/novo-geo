module.exports = {
  isCpfValid: true,
  cpf: '',

  isValid(cpf) {
    this.cpf = cpf
    return this.isCpfValid
  },
}
