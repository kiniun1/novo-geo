const { MissingParamError, InvalidParamError } = require('../utils/errors')
const MongoHelper = require('./helpers/mongo-helper')

module.exports = class SaveDenuncia {
  async save(denuncia) {
    if (!denuncia) {
      throw new MissingParamError('denuncia')
    }
    const { latitude, longitude } = denuncia.data
    const { cpf, nome } = denuncia.data.denunciante
    const { titulo, descricao } = denuncia.data.denuncia
    const { cidade, estado, pais } = denuncia.data.endereco
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
    const denunciaModel = await MongoHelper.pegandoColeções('denuncias')
    const denunciaDb = await denunciaModel.insertOne(denuncia)
    return denunciaDb
  }
}
