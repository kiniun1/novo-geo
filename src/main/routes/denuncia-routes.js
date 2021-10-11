const denunciaRouter = require('../composer/denuncia-router-composer')
const ExpressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = (router) => {
  router.post('/v1/denuncia', ExpressRouterAdapter.adapt(denunciaRouter))
}
