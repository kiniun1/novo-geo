require('dotenv').config()
const DenunciaRouter = require('../../presentation/routers/denuncia-router')
const CpfValidator = require('../../utils/cpf-validator')
const SaveDenuncia = require('../../infra/save-denuncia')
const RevGeocoding = require('../../utils/rev-geocoding')

module.exports = class DenunciaRouterComposer {
  static compose() {
    const cpfValidator = new CpfValidator()
    const saveDenuncia = new SaveDenuncia()
    const revGeocoding = new RevGeocoding()

    return new DenunciaRouter({
      cpfValidator,
      saveDenuncia,
      revGeocoding,
    })
  }
}
