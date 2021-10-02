const {
  denunciaRouter,
  revGeocodingConversor,
  conversorFormatoFinal,
} = require('../composer/denuncia-router-composer')

module.exports = (router) => {
  router.post(
    '/v1/denuncia',
    denunciaRouter,
    revGeocodingConversor,
    conversorFormatoFinal
  )
}
