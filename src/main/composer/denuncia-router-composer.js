const DenunciaRouter = require('../../presentation/routers/denuncia-router')
const CpfValidator = require('../../utils/cpf-validator')
const SaveDenuncia = require('../../infra/save-denuncia')
const RevGeocoding = require('../../utils/rev-geocoding')
const Cache = require('../../infra/cache')

module.exports = class DenunciaRouterComposer {
  static compose() {
    const cpfValidator = new CpfValidator()
    const saveDenuncia = new SaveDenuncia()
    const revGeocoding = new RevGeocoding()
    const cache = new Cache()

    return new DenunciaRouter({
      cpfValidator,
      saveDenuncia,
      revGeocoding,
      cache,
    })
  }
}
