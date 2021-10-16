const ServerError = require('../presentation/errors/server-error')
const { MissingParamError, InvalidParamError } = require('../utils/errors')
const MongoHelper = require('./helpers/mongo-helper')

module.exports = class SaveDenuncia {
  async save(denuncia, id) {
    if (!denuncia) {
      throw new MissingParamError('denuncia')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    if (!denuncia.data.latitude) {
      throw new MissingParamError('latitude')
    }
    if (!denuncia.data.longitude) {
      throw new MissingParamError('longitude')
    }
    if (!denuncia.data.denunciante.nome) {
      throw new MissingParamError('nome')
    }
    if (!denuncia.data.denunciante.cpf) {
      throw new MissingParamError('cpf')
    }
    if (!denuncia.data.denuncia.titulo) {
      throw new MissingParamError('titulo')
    }
    if (!denuncia.data.denuncia.descricao) {
      throw new MissingParamError('descricao')
    }
    if (!denuncia.data.endereco.cidade) {
      throw new MissingParamError('cidade')
    }
    if (!denuncia.data.endereco.estado) {
      throw new MissingParamError('estado')
    }
    if (!denuncia.data.endereco.pais) {
      throw new MissingParamError('pais')
    }
    if (isNaN(denuncia.data.latitude)) {
      throw new InvalidParamError('latitude')
    }
    if (isNaN(denuncia.data.longitude)) {
      throw new InvalidParamError('longitude')
    }
    if (!isNaN(denuncia.data.denunciante.nome)) {
      throw new InvalidParamError('nome')
    }
    if (isNaN(denuncia.data.denunciante.cpf)) {
      throw new InvalidParamError('cpf')
    }
    if (!isNaN(denuncia.data.denuncia.titulo)) {
      throw new InvalidParamError('titulo')
    }
    if (!isNaN(denuncia.data.denuncia.descricao)) {
      throw new InvalidParamError('descricao')
    }
    if (!isNaN(denuncia.data.endereco.cidade)) {
      throw new InvalidParamError('cidade')
    }
    if (!isNaN(denuncia.data.endereco.estado)) {
      throw new InvalidParamError('estado')
    }
    if (!isNaN(denuncia.data.endereco.pais)) {
      throw new InvalidParamError('pais')
    }
    const denunciaModel = await MongoHelper.pegandoColeções('denuncias')
    const denunciaDb = await denunciaModel.insertOne({
      _id: id,
      denuncia: denuncia.data,
    })
    return denunciaDb
  }
}
