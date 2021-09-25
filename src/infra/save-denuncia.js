const { MissingParamError, InvalidParamError } = require('../utils/errors')

module.exports = class SaveDenuncia {
  constructor(denunciaModel) {
    this.denunciaModel = denunciaModel
  }

  async save(denuncia) {
    if (!denuncia) {
      throw new MissingParamError('denuncia')
    }
    const {
      cpf,
      nome,
      titulo,
      descricao,
      cidade,
      estado,
      pais,
      latitude,
      longitude,
    } = denuncia
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    if (!nome) {
      throw new MissingParamError('nome')
    }
    if (!titulo) {
      throw new MissingParamError('titulo')
    }
    if (!descricao) {
      throw new MissingParamError('descricao')
    }
    if (!cidade) {
      throw new MissingParamError('cidade')
    }
    if (!estado) {
      throw new MissingParamError('estado')
    }
    if (!pais) {
      throw new MissingParamError('pais')
    }
    if (!latitude) {
      throw new MissingParamError('latitude')
    }
    if (!longitude) {
      throw new MissingParamError('longitude')
    }
    if (isNaN(cpf)) {
      throw new InvalidParamError('cpf')
    }
    if (!isNaN(nome)) {
      throw new InvalidParamError('nome')
    }
    if (!isNaN(titulo)) {
      throw new InvalidParamError('titulo')
    }
    if (!isNaN(descricao)) {
      throw new InvalidParamError('descricao')
    }
    if (!isNaN(cidade)) {
      throw new InvalidParamError('cidade')
    }
    if (!isNaN(estado)) {
      throw new InvalidParamError('estado')
    }
    if (!isNaN(pais)) {
      throw new InvalidParamError('pais')
    }
    if (isNaN(latitude)) {
      throw new InvalidParamError('latitude')
    }
    if (isNaN(longitude)) {
      throw new InvalidParamError('longitude')
    }
    const denunciaDb = await this.denunciaModel.insertOne(denuncia)
    return denunciaDb
  }
}
