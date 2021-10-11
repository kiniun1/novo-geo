const DenunciaRouterComposer = require('../composer/denuncia-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = (router) => {
  router.post('/v1/denuncia', adapt(DenunciaRouterComposer.compose()))
}
