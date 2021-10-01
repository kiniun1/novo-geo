const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  test('Deve fazer o parse do body para JSON', async () => {
    app.post('/teste_json_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/teste_json_parser')
      .send({ nome: 'Kiniun' })
      .expect({ nome: 'Kiniun' })
  })
})
