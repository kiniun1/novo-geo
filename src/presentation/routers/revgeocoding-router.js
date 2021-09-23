const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const httpResponse = require('../helpers/http-response')

module.exports = class RevGeocodingRouter {
  async route(httpRequest) {
    try {
      const { lat, lng } = httpRequest.body.location.latLng
      if (!lat) {
        return httpResponse.badRequest(new MissingParamError('latitude'))
      }
      if (!lng) {
        return httpResponse.badRequest(new MissingParamError('longitude'))
      }
      if (isNaN(lat)) {
        return httpResponse.badRequest(new InvalidParamError('latitude'))
      }
      if (isNaN(lng)) {
        return httpResponse.badRequest(new InvalidParamError('longitude'))
      }
      return httpResponse.ok()
    } catch (error) {
      // console.error(error) botar um logger aqui e trocar
      return httpResponse.serverError()
    }
  }
}
