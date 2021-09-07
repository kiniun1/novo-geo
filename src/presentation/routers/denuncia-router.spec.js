const DenunciaRouter = require('./denuncia-router')
const MissingParamError = require('../helpers/missing-param-error')

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
    0
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
  })

  test('Deve retornar 500 se o httpRequest não houver body.', () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Deve retornar 401 se o cpf houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: 'any-invalid-cpf'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.cpf)).toBeNaN()
    expect(httpResponse.statusCode).toBe(401)
  })

  test('Deve retornar 401 se a longitude houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-invalid-longitude',
        latitude: 'any-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: 'any-cpf'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.longitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(401)
  })

  test('Deve retornar 401 se a latitude houver caracteres não numéricos.', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-invalid-latitude',
        nome: 'any-nome',
        titulo: 'any-titulo',
        descricao: 'any-descricao',
        cpf: 'any-cpf'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(401)
  })
})
