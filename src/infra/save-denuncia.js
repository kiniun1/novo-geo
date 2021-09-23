module.exports = class SaveDenuncia {
  constructor(denunciaModel) {
    this.denunciaModel = denunciaModel
  }

  async save(denuncia) {
    const denunciaDb = await this.denunciaModel.insertOne(denuncia)
    return denunciaDb
  }
}
