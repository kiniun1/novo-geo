module.exports = {
  CpfValid: true,
  cpf: '',

  isValid(cpf) {
    this.cpf = cpf
    return this.CpfValid
  },
}
