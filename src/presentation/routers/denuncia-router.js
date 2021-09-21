const InvalidParamError = require('../errors/invalid-param-error')
const MissingParamError = require('../errors/missing-param-error')
const httpResponse = require('../helpers/http-response')

module.exports = class DenunciaRouter {
  constructor(cpfValidator) {
    this.cpfValidator = cpfValidator
  }

  async route(httpRequest) {
    try {
      const { latitude, longitude, nome, cpf, titulo, descricao } =
        httpRequest.body
      if (!latitude) {
        return httpResponse.badRequest(new MissingParamError('latitude'))
      }
      if (!longitude) {
        return httpResponse.badRequest(new MissingParamError('longitude'))
      }
      if (!nome) {
        return httpResponse.badRequest(new MissingParamError('nome'))
      }
      if (!cpf) {
        return httpResponse.badRequest(new MissingParamError('cpf'))
      }
      if (!this.cpfValidator.isValid(cpf)) {
        return httpResponse.badRequest(new InvalidParamError('cpf'))
      }
      if (!titulo) {
        return httpResponse.badRequest(new MissingParamError('titulo'))
      }
      if (!descricao) {
        return httpResponse.badRequest(new MissingParamError('descricao'))
      }
      if (isNaN(cpf)) {
        return httpResponse.badRequest(new InvalidParamError('cpf'))
      }
      if (isNaN(latitude)) {
        return httpResponse.badRequest(new InvalidParamError('latitude'))
      }
      if (isNaN(longitude)) {
        return httpResponse.badRequest(new InvalidParamError('longitude'))
      }
      if (!isNaN(nome)) {
        return httpResponse.badRequest(new InvalidParamError('nome'))
      }
      if (!isNaN(descricao)) {
        return httpResponse.badRequest(new InvalidParamError('descricao'))
      }
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
