const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const httpResponse = require('../helpers/http-response')

module.exports = class DenunciaRouter {
  constructor({ cpfValidator, revGeocoding, saveDenuncia } = {}) {
    this.cpfValidator = cpfValidator
    this.revGeocoding = revGeocoding
    this.saveDenuncia = saveDenuncia
  }

  async route(httpRequest) {
    try {
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
      // AQUI IF PARA VER SE EXISTE A LATITUDE E LONGITUDE NO CACHE, SE NÃO TIVER PROCEDER PARA O ABAIXO, SE EXISTIR BUSCAR NO CACHE
      const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
      const resultRevGeocoding = await this.revGeocoding.getLocation(url)
      if (resultRevGeocoding.results[0].locations.length === 0) {
        return httpResponse.addressNotFound()
      }
      if (!resultRevGeocoding.results[0].locations[0].adminArea5) {
        return httpResponse.addressNotFound()
      }
      if (!resultRevGeocoding.results[0].locations[0].adminArea3) {
        return httpResponse.addressNotFound()
      }
      if (!resultRevGeocoding.results[0].locations[0].adminArea1) {
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
            logradouro: resultRevGeocoding.results[0].locations[0].street,
            bairro: resultRevGeocoding.results[0].locations[0].adminArea6,
            cidade: resultRevGeocoding.results[0].locations[0].adminArea5,
            estado: resultRevGeocoding.results[0].locations[0].adminArea3,
            pais: resultRevGeocoding.results[0].locations[0].adminArea1,
            cep: resultRevGeocoding.results[0].locations[0].postalCode,
          },
        },
      }
      const resultSave = await this.saveDenuncia.save(obj) // aqui salvar no banco e botar httpresponse o retorno da inserção
      // console.log(resultSave)
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) //botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
