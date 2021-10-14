const Redis = require('ioredis')
const Cache = require('./cache')
const env = require('../main/config/env')
const { MissingParamError } = require('../utils/errors')
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
    const chaveJson = 'teste-get-json'
    const valor = 'qualquer-dado'
    const valorObj = {
      qualquerDado: 'teste',
    }
    redis.set(chaveGet, JSON.stringify(valor), 'EX', 30)
    redis.set(chaveDel, JSON.stringify(valor), 'EX', 30)
    redis.set(chaveJson, JSON.stringify(valorObj), 'EX', 30)
  })

  afterAll(async () => {
    await redis.disconnect()
    await sut.disconnect()
  })

  test('Deve retornar o valor de uma chave como JSON', async () => {
    const chave = 'teste-get-json'
    await sut.get(chave).then((resposta) => {
      expect(typeof resposta).toBe('object')
    })
  })

  test('Deve retornar nulo o valor de uma chave que não existe no cache', async () => {
    const chave = 'teste-get-nulo'
    const resposta = await sut.get(chave)
    expect(resposta).toBeNull()
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

  test('Deve fazer um throw se não for fornecido uma chave ao método set', () => {
    const invalid = null
    expect(() => {
      sut.set(invalid)
    }).toThrow({ code: '01', message: new MissingParamError('chave').message })
  })

  test('Deve fazer um throw se não for fornecido um valor ao método set', () => {
    const chave = 'teste-set'
    const invalid = null
    expect(() => {
      sut.set(chave, invalid)
    }).toThrow({ code: '01', message: new MissingParamError('valor').message })
  })

  test('Deve fazer um throw se não for fornecido um tempo de Expiração da chave ao método set', () => {
    const chave = 'teste-set'
    const valor = 'qualquer-dado'
    const invalid = null
    expect(() => {
      sut.set(chave, valor, invalid)
    }).toThrow({
      code: '01',
      message: new MissingParamError('tempExp').message,
    })
  })

  test('Deve fazer um throw se não for fornecido uma chave ao método get', async () => {
    const invalid = null
    const promise = sut.get(invalid)
    expect(promise).rejects.toThrow(new MissingParamError('chave'))
  })

  test('Deve fazer um throw se não for fornecido uma chave ao método delete', () => {
    const invalid = null
    expect(() => {
      sut.del(invalid)
    }).toThrow({ code: '01', message: new MissingParamError('chave').message })
  })

  test('Deve retornar com sucesso valor de uma chave já inserida no cache', async () => {
    const chave = 'teste-get'
    const valor = 'qualquer-dado'
    const resposta = await sut.get(chave)
    expect(resposta).toEqual(valor)
  })
})
