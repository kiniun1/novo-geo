const httpResponse = require('../helpers/http-response')

module.exports = class DenunciaRouter {
  constructor (cpfValidator) {
    this.cpfValidator = cpfValidator
  }

  route (httpRequest) {
    try {
      const { latitude, longitude, nome, cpf, titulo, descricao } =
        httpRequest.body
      if (!latitude) {
        return httpResponse.badRequest('latitude')
      }
      if (!longitude) {
        return httpResponse.badRequest('longitude')
      }
      if (!nome) {
        return httpResponse.badRequest('nome')
      }
      if (!cpf) {
        return httpResponse.badRequest('cpf')
      }
      if (!titulo) {
        return httpResponse.badRequest('titulo')
      }
      if (!descricao) {
        return httpResponse.badRequest('descricao')
      }
      if (isNaN(cpf)) {
        return httpResponse.invalidRequest('cpf')
      }
      if (isNaN(latitude)) {
        return httpResponse.invalidRequest('latitude')
      }
      if (isNaN(longitude)) {
        return httpResponse.invalidRequest('longitude')
      }
      if (!isNaN(nome)) {
        return httpResponse.invalidRequest('nome')
      }
      if (!isNaN(descricao)) {
        return httpResponse.invalidRequest('descricao')
      }
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
