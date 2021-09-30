const { MissingParamError, InvalidParamError } = require('./errors')

module.exports = class TransformDataToRevgeocoding {
  async convert(data) {
    if (!data) {
      throw new MissingParamError('data')
    }
    const { latitude, longitude } = data
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
