const DenunciaRouter = require('./denuncia-router')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const ServerError = require('../errors/server-error')

const makeSut = () => {
  const cpfValidatorSpy = makeCpfValidator()
  const sut = new DenunciaRouter(cpfValidatorSpy)
  return {
    sut,
    cpfValidatorSpy,
  }
}

const makeCpfValidator = () => {
  class CpfValidatorSpy {
    isValid(cpf) {
      this.cpf = cpf
      return this.isCpfValid
    }
  }
  const cpfValidatorSpy = new CpfValidatorSpy()
  cpfValidatorSpy.isCpfValid = true
  return cpfValidatorSpy
}

const makeCpfValidatorWithError = () => {
  class CpfValidatorSpy {
    isValid() {
      throw new Error()
    }
  }
  const cpfValidatorSpy = new CpfValidatorSpy()
  cpfValidatorSpy.isCpfValid = true
  return cpfValidatorSpy
}

describe('Denuncia Router', () => {
  test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('latitude').message
    )
  })

  test('Deve retornar 400 se nenhuma longitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('longitude').message
    )
  })

  test('Deve retornar 400 se nenhum nome for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('nome').message
    )
  })

  test('Deve retornar 400 se nenhum cpf for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('cpf').message
    )
  })

  test('Deve retornar 400 se nenhum titulo for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        descricao: 'any-descricao',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('titulo').message
    )
  })

  test('Deve retornar 400 se nenhuma descrição for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('descricao').message
    )
  })

  test('Deve retornar 500 se nenhum httpRequest for fornecido.', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Deve retornar 500 se o httpRequest não houver body.', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Deve retornar 400 se o cpf houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: 'any-invalid-cpf',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.cpf)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new InvalidParamError('cpf').message
    )
  })

  test('Deve retornar 400 se a longitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-invalid-longitude',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.longitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new InvalidParamError('longitude').message
    )
  })

  test('Deve retornar 400 se a latitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: 'any-invalid-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new InvalidParamError('latitude').message
    )
  })

  test('Deve retornar 400 se o nome houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: '84654688',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.nome)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('nome').message)
  })

  test('Deve retornar 400 se a descrição houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: '84654688',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.descricao)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(
      new InvalidParamError('descricao').message
    )
  })

  test('Deve retornar 200 se os parametros fornecidos forem válidos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'valid-nome',
        titulo: 'valid-titulo',
        descricao: 'valid-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Deve chamar o CpfValidator com o cpf correto', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901',
      },
    }
    await sut.route(httpRequest)
    expect(cpfValidatorSpy.cpf).toBe(httpRequest.body.cpf)
  })

  test('Deve retornar 400 se um cpf inválido for fornecido', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.isCpfValid = false
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '1',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('cpf').message)
  })

  test('Deve retornar 500 se o CpfValidator não for fornecido', async () => {
    const sut = new DenunciaRouter()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'valid-nome',
        titulo: 'valid-titulo',
        descricao: 'valid-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Deve retornar 500 se CpfValidator não tiver o método isValid', async () => {
    const sut = new DenunciaRouter({}) // Objeto vazio para representar que o CpfValidator não
    const httpRequest = {
      // Não tem o método isValid
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'valid-nome',
        titulo: 'valid-titulo',
        descricao: 'valid-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Deve retornar 500 se CpfValidator der um throw', async () => {
    const cpfValidatorSpy = makeCpfValidatorWithError()
    const sut = new DenunciaRouter(cpfValidatorSpy)
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'valid-nome',
        titulo: 'valid-titulo',
        descricao: 'valid-descricao',
        cpf: '12345678901',
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })
})
