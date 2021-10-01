const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('Deve habilitar o CORS', async () => {
    app.get('/teste_cors', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/teste_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
