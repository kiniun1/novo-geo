const Redis = require('ioredis')
const env = require('../main/config/env')

module.exports = class Cache {
  constructor() {
    this.redis = new Redis({
      host: env.redisHost,
      port: env.redisPort,
      keyPrefix: 'cache:',
    })
  }

  async get(chave) {
    const valor = await this.redis.get(chave)

    return valor ? JSON.parse(valor) : null
  }

  set(chave, valor, TempExp) {
    return this.redis.set(chave, JSON.stringify(valor), 'EX', TempExp)
  }

  del(chave) {
    return this.redis.del(chave)
  }

  quit() {
    return this.redis.quit()
  }
}
