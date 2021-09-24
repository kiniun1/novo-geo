const MissingParamError = require('../utils/errors/missing-param-error')

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
    const denunciaDb = await this.denunciaModel.insertOne(denuncia)
    return denunciaDb
  }
}
