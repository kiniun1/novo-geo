const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Deve desabilitar x-powered-by header', async () => {
    app.get('/teste_x_powered_by', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/teste_x_powered_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
