const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const httpResponse = require('../helpers/http-response')

module.exports = class DenunciaRouter {
  constructor({ cpfValidator, revGeocoding, saveDenuncia, cache } = {}) {
    this.cpfValidator = cpfValidator
    this.revGeocoding = revGeocoding
    this.saveDenuncia = saveDenuncia
    this.cache = cache
  }

  async route(httpRequest) {
    try {
      let respEndereco
      if (!httpRequest.body.latitude) {
        return httpResponse.badRequest(new MissingParamError('latitude'))
      }
      if (!httpRequest.body.longitude) {
        return httpResponse.badRequest(new MissingParamError('longitude'))
      }
      if (!httpRequest.body.denunciante.nome) {
        return httpResponse.badRequest(new MissingParamError('nome'))
      }
      if (!httpRequest.body.denunciante.cpf) {
        return httpResponse.badRequest(new MissingParamError('cpf'))
      }
      if (!this.cpfValidator.isCpfValid(httpRequest.body.denunciante.cpf)) {
        return httpResponse.badRequest(new InvalidParamError('cpf'))
      }
      if (!httpRequest.body.denuncia.titulo) {
        return httpResponse.badRequest(new MissingParamError('titulo'))
      }
      if (!httpRequest.body.denuncia.descricao) {
        return httpResponse.badRequest(new MissingParamError('descricao'))
      }
      if (isNaN(httpRequest.body.denunciante.cpf)) {
        return httpResponse.badRequest(new InvalidParamError('cpf'))
      }
      if (isNaN(httpRequest.body.latitude)) {
        return httpResponse.badRequest(new InvalidParamError('latitude'))
      }
      if (isNaN(httpRequest.body.longitude)) {
        return httpResponse.badRequest(new InvalidParamError('longitude'))
      }
      if (!isNaN(httpRequest.body.denunciante.nome)) {
        return httpResponse.badRequest(new InvalidParamError('nome'))
      }
      if (!isNaN(httpRequest.body.denuncia.descricao)) {
        return httpResponse.badRequest(new InvalidParamError('descricao'))
      }
      const { latitude, longitude } = httpRequest.body
      const { nome, cpf } = httpRequest.body.denunciante
      const { titulo, descricao } = httpRequest.body.denuncia
      const chave = `latitude:${latitude},longitude:${longitude}`
      const respCache = await this.cache.get(chave)
      if (respCache) {
        respEndereco = respCache
      }
      if (respCache === null) {
        const resultRevGeocoding = await this.revGeocoding.getLocation(
          latitude,
          longitude
        )
        respEndereco = resultRevGeocoding.data
        this.cache.set(chave, respEndereco, 600)
      }
      if (respEndereco.results[0].locations.length === 0) {
        return httpResponse.addressNotFound()
      }
      if (!respEndereco.results[0].locations[0].adminArea5) {
        return httpResponse.addressNotFound()
      }
      if (!respEndereco.results[0].locations[0].adminArea3) {
        return httpResponse.addressNotFound()
      }
      if (!respEndereco.results[0].locations[0].adminArea1) {
        return httpResponse.addressNotFound()
      }
      const obj = {
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
            logradouro: respEndereco.results[0].locations[0].street,
            bairro: respEndereco.results[0].locations[0].adminArea6,
            cidade: respEndereco.results[0].locations[0].adminArea5,
            estado: respEndereco.results[0].locations[0].adminArea3,
            pais: respEndereco.results[0].locations[0].adminArea1,
            cep: respEndereco.results[0].locations[0].postalCode,
          },
        },
      }
      this.cache.disconnect()
      const resultSave = await this.saveDenuncia.save(obj) // aqui salvar no banco e botar httpresponse o retorno da inserção
      // console.log(resultSave)
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) //botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
