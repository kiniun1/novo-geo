const DenunciaRouter = require('./denuncia-router')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const ServerError = require('../errors/server-error')
const env = require('../../main/config/env')
const normalHttpRequest = {
  body: {
    latitude: -9.648198,
    longitude: -35.713458,
    denunciante: {
      nome: 'José de Oliveira',
      cpf: '95761638037',
    },
    denuncia: {
      titulo: 'Esgoto a céu aberto',
      descricao: 'Existe um esgoto a céu aberto nesta localidade.',
    },
  },
}

const makeSut = () => {
  const cpfValidatorSpy = makeCpfValidator()
  const revGeocodingSpy = makeRevGeocoding()
  const saveDenunciaSpy = makeSaveDenuncia()
  const cacheSpy = makeCache()
  const sut = new DenunciaRouter({
    cpfValidator: cpfValidatorSpy,
    revGeocoding: revGeocodingSpy,
    saveDenuncia: saveDenunciaSpy,
    cache: cacheSpy,
  })
  return {
    sut,
    cpfValidatorSpy,
    revGeocodingSpy,
    saveDenunciaSpy,
    cacheSpy,
  }
}

const makeCache = () => {
  class CacheSpy {
    async get(chave) {
      this.chave = chave
      return this.valor
    }

    set(chave, valor, tempExp) {
      this.chave = chave
      this.valor = valor
      this.tempExp = tempExp
      
    }

    del(chave) {
      this.chave = chave
      
    }

    disconnect() {
      
    }
  }
  const cacheSpy = new CacheSpy()
  cacheSpy.valor = null
  return cacheSpy
}

const makeCacheWithError = () => {
  class CacheSpy {
    async get() {
      throw new Error()
    }

    set() {
      throw new Error()
    }

    del() {
      throw new Error()
    }

    quit() {
      throw new Error()
    }
  }
  return new CacheSpy()
}

const makeCpfValidator = () => {
  class CpfValidatorSpy {
    isCpfValid(cpf) {
      this.cpf = cpf
      return this.cpfValid
    }
  }
  const cpfValidatorSpy = new CpfValidatorSpy()
  cpfValidatorSpy.cpfValid = true
  return cpfValidatorSpy
}

const makeCpfValidatorWithError = () => {
  class CpfValidatorSpy {
    isCpfValid() {
      throw new Error()
    }
  }
  return new CpfValidatorSpy()
}

const makeSaveDenuncia = () => {
  class SaveDenunciaSpy {
    async save(denuncia) {
      this.denunciante = denuncia
    }
  }
  return new SaveDenunciaSpy()
}

const makeSaveDenunciaWithError = () => {
  class SaveDenunciaSpy {
    async save() {
      throw new Error()
    }
  }
  return new SaveDenunciaSpy()
}

const makeRevGeocoding = () => {
  class RevGeocodingSpy {
    async getLocation(latitude, longitude) {
      this.latitude = latitude
      this.longitude = longitude
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    data: {
      results: [
        {
          locations: [
            {
              adminArea5: 'qualquer-cidade',
              adminArea3: 'qualquer-estado',
              adminArea1: 'qualquer-país',
            },
          ],
        },
      ],
    },
  }
  return revGeocodingSpy
}

const makeRevGeocodingWithError = () => {
  class RevGeocodingSpy {
    async getLocation() {
      throw new Error()
    }
  }
  return new RevGeocodingSpy()
}

describe('Denuncia Router', () => {
  test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('latitude').message,
    })
  })

  test('Deve retornar 400 se nenhuma longitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('longitude').message,
    })
  })

  test('Deve retornar 400 se nenhum nome for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {},
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('nome').message,
    })
  })

  test('Deve retornar 400 se nenhum cpf for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('cpf').message,
    })
  })

  test('Deve retornar 400 se nenhum titulo for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {},
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('titulo').message,
    })
  })

  test('Deve retornar 400 se nenhuma descrição for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('descricao').message,
    })
  })

  test('Deve retornar 500 se nenhum httpRequest for fornecido.', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual({
      code: '03',
      message: new ServerError().message,
    })
  })

  test('Deve retornar 500 se o httpRequest não houver body.', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual({
      code: '03',
      message: new ServerError().message,
    })
  })

  test('Deve retornar 400 se o cpf houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: { nome: 'José de Oliveira', cpf: 'invalid-cpf' },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denunciante.cpf)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('cpf').message,
    })
  })

  test('Deve retornar 400 se a longitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: 'invalid-cpf',
        denunciante: { nome: 'José de Oliveira', cpf: '95761638037' },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.longitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('longitude').message,
    })
  })

  test('Deve retornar 400 se a latitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: 'invalid-latitude',
        longitude: -35.713458,
        denunciante: { nome: 'José de Oliveira', cpf: '95761638037' },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('latitude').message,
    })
  })

  test('Deve retornar 400 se o nome houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: { nome: '123456', cpf: '95761638037' },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denunciante.nome)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('nome').message,
    })
  })

  test('Deve retornar 400 se a descrição houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: { nome: 'José de Oliveira', cpf: '95761638037' },
        denuncia: { titulo: 'Esgoto a céu aberto', descricao: '123' },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denuncia.descricao)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('descricao').message,
    })
  })

  test('Deve retornar 400 se um cpf inválido for fornecido', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.cpfValid = false
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: { nome: 'José de Oliveira', cpf: 'invalid-cpf' },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('cpf').message,
    })
  })

  test('Deve retornar 400 se não for encontrada um endereço válido para a coordenada passada.', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    revGeocodingSpy.endereco = { data: { results: [{ locations: [] }] } }
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem cidade para a coordenada passada.', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    revGeocodingSpy.endereco = {
      data: {
        results: [
          {
            locations: [
              {
                adminArea5: '',
              },
            ],
          },
        ],
      },
    }
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem estado para a coordenada passada.', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    revGeocodingSpy.endereco = {
      data: {
        results: [
          {
            locations: [
              {
                adminArea5: 'qualquer-cidade',
                adminArea3: '',
              },
            ],
          },
        ],
      },
    }
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem país para a coordenada passada.', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    revGeocodingSpy.endereco = {
      data: {
        results: [
          {
            locations: [
              {
                adminArea5: 'qualquer-cidade',
                adminArea3: 'qualquer-estado',
                adminArea1: '',
              },
            ],
          },
        ],
      },
    }
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve fazer um throw se qualquer dependencia der um throw', async () => {
    const cpfValidator = makeCpfValidator()
    const revGeocoding = makeRevGeocoding()
    const saveDenuncia = makeSaveDenuncia()
    const suts = [].concat(
      new DenunciaRouter({
        cpfValidator: makeCpfValidatorWithError(),
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding: makeRevGeocodingWithError(),
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
        saveDenuncia: makeSaveDenunciaWithError(),
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
        saveDenuncia,
        cache: makeCacheWithError(),
      })
    )
    for (const sut of suts) {
      const httpResponse = await sut.route(normalHttpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toEqual({
        code: '03',
        message: new ServerError().message,
      })
    }
  })

  test('Deve fazer um throw se forem passadas dependencias inválidas', async () => {
    const invalid = {}
    const cpfValidator = makeCpfValidator()
    const revGeocoding = makeRevGeocoding()
    const saveDenuncia = makeSaveDenuncia()
    const suts = [].concat(
      new DenunciaRouter(),
      new DenunciaRouter({}),
      new DenunciaRouter({
        cpfValidator: invalid,
      }),
      new DenunciaRouter({
        cpfValidator,
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding: invalid,
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
        saveDenuncia: invalid,
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
        saveDenuncia,
        cache: invalid,
      })
    )
    for (const sut of suts) {
      const httpResponse = await sut.route(normalHttpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toEqual({
        code: '03',
        message: new ServerError().message,
      })
    }
  })

  test('Deve retornar 200 se os parametros fornecidos forem válidos.', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Deve retornar 200 se os parametros fornecidos dorem válidos sendo retornado os dados que estão no cache.', async () => {
    const { sut, cacheSpy } = makeSut()
    cacheSpy.valor = {
      results: [
        {
          locations: [
            {
              adminArea5: 'qualquer-cidade',
              adminArea3: 'qualquer-estado',
              adminArea1: 'qualquer-país',
            },
          ],
        },
      ],
    }
    const httpResponse = await sut.route(normalHttpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Deve chamar o CpfValidator com o cpf correto', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    await sut.route(normalHttpRequest)
    expect(cpfValidatorSpy.cpf).toBe(normalHttpRequest.body.denunciante.cpf)
  })

  test('Deve chamar o revGeocoding com a latitude e longitude correta', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    await sut.route(normalHttpRequest)
    expect(revGeocodingSpy.latitude).toBe(normalHttpRequest.body.latitude)
    expect(revGeocodingSpy.longitude).toBe(normalHttpRequest.body.longitude)
  })

  test('Deve chamar o get do cache com a chave correta', async () => {
    const { sut, cacheSpy } = makeSut()
    await sut.route(normalHttpRequest)
    expect(cacheSpy.chave).toBe(
      `latitude:${normalHttpRequest.body.latitude},longitude:${normalHttpRequest.body.longitude}`
    )
  })
})
