const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError, InvalidParamError } = require('../../utils/errors/')

module.exports = class LoadDenunciaByCpfRepository {
  constructor(denunciaModel) {
    this.denunciaModel = denunciaModel
  }

  async load(cpf, titulo) {
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    if (!titulo) {
      throw new MissingParamError('titulo')
    }
    if (isNaN(cpf)) {
      throw new InvalidParamError('cpf')
    }
    if (!isNaN(titulo)) {
      throw new InvalidParamError('titulo')
    }
    const denunciaModel = await MongoHelper.pegandoColeções('denuncias')
    const denuncia = await denunciaModel.findOne(
      {
        cpf,
        titulo,
      },
      {
        projection: {
          cpf: 1,
          titulo: 1,
          descricao: 1,
        },
      }
    )
    return denuncia
  }
}
