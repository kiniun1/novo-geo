const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError, InvalidParamError } = require('../../utils/errors/')

module.exports = class LoadDenunciaByCpfRepository {
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
        'data.denunciante.cpf': cpf,
        'data.denuncia.titulo': titulo,
      },
      {
        projection: {
          'data.denunciante.cpf': true,
          'data.denuncia.titulo': true,
          'data.denuncia.descricao': true,
        },
      }
    )
    return denuncia
  }
}
