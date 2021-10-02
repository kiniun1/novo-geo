const DenunciaRouter = require('../../presentation/routers/denuncia-router')
const CpfValidator = require('../../utils/cpf-validator')
const RevGeocodingConversor = require('../../utils/rev-geocoding-conversor')
const ConversorFormatoFinal = require('../../utils/conversor-formato-final')

const revGeocodingConversor = new RevGeocodingConversor()
const conversorFormatoFinal = new ConversorFormatoFinal()
const cpfValidator = new CpfValidator()
const denunciaRouter = new DenunciaRouter(cpfValidator)

module.exports = {
  denunciaRouter,
  revGeocodingConversor,
  conversorFormatoFinal,
}
