const axios = require('axios')
const { AddressNotFound } = require('./errors')
require('dotenv').config()

module.exports = class RevGeocoding {
  async getLocation(url) {
    const resp = await axios.get(url)
    return resp.data
  }
}
