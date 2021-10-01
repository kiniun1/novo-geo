const request = require('supertest')
const app = require('../config/app')

describe('Content-Type Middleware', () => {
  test('Deve retornar content type JSON como padrão', async () => {
    app.get('/teste_content_type', (req, res) => {
      res.send('')
    })
    await request(app).get('/teste_content_type').expect('content-type', /json/)
  })
})
