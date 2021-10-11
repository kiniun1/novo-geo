const denunciaRouter = require('../composer/denuncia-router-composer')
const expressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = (router) => {
  router.post('/v1/denuncia', denunciaRouter)
}
