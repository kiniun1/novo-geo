const Redis = require('ioredis')
const env = require('../main/config/env')
const { MissingParamError } = require('../utils/errors')

module.exports = class Cache {
  constructor() {
    this.redis = new Redis({
      host: env.redisHost,
      port: env.redisPort,
      keyPrefix: 'cache:',
      lazyConnect: true,
    })
  }

  async get(chave) {
    if (!chave) {
      throw new MissingParamError('chave')
    }
    const valor = await this.redis.get(chave)

    return valor ? JSON.parse(valor) : null
  }

  set(chave, valor, tempExp) {
    if (!chave) {
      throw new MissingParamError('chave')
    }
    if (!valor) {
      throw new MissingParamError('valor')
    }
    if (!tempExp) {
      throw new MissingParamError('tempExp')
    }
    return this.redis.set(chave, JSON.stringify(valor), 'EX', tempExp)
  }

  del(chave) {
    if (!chave) {
      throw new MissingParamError('chave')
    }
    return this.redis.del(chave)
  }

  disconnect() {
    return this.redis.disconnect()
  }
}
