module.exports = class LoadDenunciaByCpfRepository {
  constructor(denunciaModel) {
    this.denunciaModel = denunciaModel
  }

  async load(cpf) {
    const denunciaDb = await this.denunciaModel.findOne({ cpf: cpf })
    return denunciaDb
  }
}
