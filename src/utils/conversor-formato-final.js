const { MissingParamError, InvalidParamError } = require('./errors')

module.exports = class ConversorFormatoBD {
  async convert(dataDenuncia, dataEndereco) {
    if (!dataDenuncia) {
      throw new MissingParamError('dataDenuncia')
    }
    if (!dataEndereco) {
      throw new MissingParamError('dataEndereco')
    }
    const { latitude, longitude } = dataDenuncia
    const { nome, cpf } = dataDenuncia.denunciante
    const { titulo, descricao } = dataDenuncia.denuncia
    const {
      street,
      adminArea6,
      adminArea5,
      adminArea3,
      adminArea1,
      postalCode,
    } = dataEndereco
    if (!latitude) {
      throw new MissingParamError('latitude')
    }
    if (!longitude) {
      throw new MissingParamError('longitude')
    }
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
    if (!adminArea5) {
      throw new MissingParamError('cidade')
    }
    if (!adminArea3) {
      throw new MissingParamError('estado')
    }
    if (!adminArea1) {
      throw new MissingParamError('pais')
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
    if (!isNaN(adminArea5)) {
      throw new InvalidParamError('cidade')
    }
    if (!isNaN(adminArea3)) {
      throw new InvalidParamError('estado')
    }
    if (!isNaN(adminArea1)) {
      throw new InvalidParamError('pais')
    }
    if (isNaN(latitude)) {
      throw new InvalidParamError('latitude')
    }
    if (isNaN(longitude)) {
      throw new InvalidParamError('longitude')
    }
    const denunciaFinal = {
      data: {
        latitude: latitude,
        longitude: longitude,
        denunciante: {
          nome: nome,
          cpf: cpf,
        },
        denuncia: {
          titulo: titulo,
          descricao: descricao,
        },
        endereco: {
          logradouro: street,
          bairro: adminArea6,
          cidade: adminArea5,
          estado: adminArea3,
          pais: adminArea1,
          cep: postalCode,
        },
      },
    }
    return denunciaFinal
  }
}
