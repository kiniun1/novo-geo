const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class TransformData {
  async convert(data) {
    if (!data) {
      throw new MissingParamError('data')
    }
    if (!data.body.latitude) {
      throw new MissingParamError('latitude')
    }
    if (!data.body.longitude) {
      throw new MissingParamError('longitude')
    }
    if (isNaN(data.body.latitude)) {
      throw new InvalidParamError('latitude')
    }
    if (isNaN(data.body.longitude)) {
      throw new InvalidParamError('longitude')
    }
    const { latitude, longitude } = data.body
    const latLng = {
      location: {
        latLng: {
          lat: latitude,
          lng: longitude,
        },
      },
    }
    return latLng
  }
}
