const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const httpResponse = require('../helpers/http-response')

module.exports = class RevGeocodingRouter {
  async route(httpRequest) {
    try {
      const { latitude, longitude } = httpRequest.body
      if (!latitude) {
        return httpResponse.badRequest(new MissingParamError('latitude'))
      }
      if (!longitude) {
        return httpResponse.badRequest(new MissingParamError('longitude'))
      }
      if (isNaN(latitude)) {
        return httpResponse.badRequest(new InvalidParamError('latitude'))
      }
      if (isNaN(longitude)) {
        return httpResponse.badRequest(new InvalidParamError('longitude'))
      }
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
