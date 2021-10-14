const axios = require('axios')
const { MissingParamError } = require('./errors')
require('dotenv').config()

module.exports = class RevGeocoding {
  async getLocation(latitude, longitude) {
    if (!latitude) {
      throw new MissingParamError('latitude')
    }
    if (!longitude) {
      throw new MissingParamError('longitude')
    }
    return axios.get(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
    )
  }
}
