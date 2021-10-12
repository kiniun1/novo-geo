require('dotenv').config()
const request = require('supertest')
let app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let denunciaModel

describe('Denuncia Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    denunciaModel = await MongoHelper.pegandoColeções('denuncias')
  })

  beforeEach(async () => {
    await denunciaModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.fechando()
  })

  test('Deve retornar 200 quando a denuncia enviada tiver os parametros válidos', async () => {
    await request(app)
      .post('/api/v1/denuncia')
      .set('Content-type', 'application/json')
      .send({
        latitude: -9.56921,
        longitude: -36.76422,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      })
      .expect(200)
  })
})
