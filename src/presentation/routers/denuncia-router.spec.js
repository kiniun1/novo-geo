const DenunciaRouter = require('./denuncia-router')
const MissingParamError = require('../helpers/missing-param-error')
const ServerError = require('../helpers/server-error')
const InvalidParamError = require('../helpers/invalid-param-error')

const makeSut = () => {
  return new DenunciaRouter()
}

describe('Denuncia Router', () => {
  test('Deve retornar 400 se nenhuma latitude for fornecida.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('latitude'))
  })

  test('Deve retornar 400 se nenhuma longitude for fornecida.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('longitude'))
  })

  test('Deve retornar 400 se nenhum nome for fornecido.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        cpf: 'any-cpf',
        titulo: 'any-titulo',
        descricao: 'any-descricao'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('nome'))
  })

  test('Deve retornar 400 se nenhum cpf for fornecido.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('Deve retornar 400 se nenhum titulo for fornecido.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        descricao: 'any-descricao'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('titulo'))
  })

  test('Deve retornar 400 se nenhuma descrição for fornecida.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        cpf: 'any-cpf',
        titulo: 'any-titulo'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('descricao'))
  })

  test('Deve retornar 500 se nenhum httpRequest for fornecido.', () => {
    const sut = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Deve retornar 500 se o httpRequest não houver body.', () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Deve retornar 400 se o cpf houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: 'any-invalid-cpf'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.cpf)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf'))
  })

  test('Deve retornar 400 se a longitude houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-invalid-longitude',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.longitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('longitude'))
  })

  test('Deve retornar 400 se a latitude houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: 'any-invalid-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('latitude'))
  })

  test('Deve retornar 400 se o nome houver somente caracteres numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: '84654688',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: '12345678901'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.nome)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('nome'))
  })

  test('Deve retornar 400 se a descrição houver somente caracteres numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: '84654688',
        cpf: '12345678901'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.descricao)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('descricao'))
  })

  test('Deve retornar 200 se os parametros fornecidos forem válidos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: '22',
        latitude: '11',
        nome: 'valid-nome',
        titulo: 'valid-titulo',
        descricao: 'valid-descricao',
        cpf: '12345678901'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
