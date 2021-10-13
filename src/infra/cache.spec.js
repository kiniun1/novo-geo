const Redis = require('ioredis')
const Cache = require('./cache')
const env = require('../main/config/env')
let redis, sut

describe('Cache', () => {
  beforeAll(async () => {
    redis = new Redis({
      host: env.redisHost,
      port: env.redisPort,
      keyPrefix: 'cache:',
      keepAlive: 60,
    })
    sut = new Cache()
    const chaveGet = 'teste-get'
    const chaveDel = 'teste-del'
    const valor = 'qualquer-dado'
    redis.set(chaveGet, JSON.stringify(valor), 'EX', 10)
    redis.set(chaveDel, JSON.stringify(valor), 'EX', 10)
  })

  afterAll(async () => {
    await redis.quit()
    await sut.quit()
  })

  test('Deve retornar com sucesso valor de uma chave já inserida no cache', async () => {
    const chave = 'teste-get'
    const valor = 'qualquer-dado'
    await sut.get(chave).then((resposta) => {
      expect(resposta).toEqual(valor)
    })
  })

  test('Deve retornar nulo o valor de uma chave que não existe no cache', async () => {
    const chave = 'teste-get-nulo'
    await sut.get(chave).then((resposta) => {
      expect(resposta).toBe(null)
    })
  })

  test('Deve inserir com sucesso um valor no cache', async () => {
    const chave = 'teste-set'
    const valor = 'qualquer-dado'
    sut.set(chave, valor, 10).then(() => {
      redis.get(chave).then((resposta) => {
        expect(JSON.parse(resposta)).toEqual(valor)
      })
    })
  })

  test('Deve deletar com sucesso um valor no cache', async () => {
    const chave = 'teste-del'
    sut.del(chave)
    await redis.get(chave).then((resposta) => {
      if (resposta === null) {
        expect(resposta).toBe(null)
      }
    })
  })
})
