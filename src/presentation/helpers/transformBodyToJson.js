const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class TransformData {
  async convert(latitude, longitude) {
    if (!latitude) {
      throw new MissingParamError('latitude')
    }
    if (!longitude) {
      throw new MissingParamError('longitude')
    }
    if (isNaN(latitude)) {
      throw new InvalidParamError('latitude')
    }
    if (isNaN(longitude)) {
      throw new InvalidParamError('longitude')
    }
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
