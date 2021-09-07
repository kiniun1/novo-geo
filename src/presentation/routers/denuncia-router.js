const httpResponse = require('../helpers/http-response')

module.exports = class DenunciaRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return httpResponse.serverError()
    }

    const { latitude, longitude, nome, cpf, titulo, descricao } = httpRequest.body
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
  }
}
