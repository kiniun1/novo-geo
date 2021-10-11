require('dotenv').config()
const DenunciaRouter = require('../../presentation/routers/denuncia-router')
const CpfValidator = require('../../utils/cpf-validator')
const SaveDenuncia = require('../../infra/save-denuncia')
const RevGeocoding = require('../../utils/rev-geocoding')
const cpfValidator = new CpfValidator()
const saveDenuncia = new SaveDenuncia()
const revGeocoding = new RevGeocoding()

const denunciaRouter = new DenunciaRouter({
  cpfValidator,
  saveDenuncia,
  revGeocoding,
})

module.exports = denunciaRouter
