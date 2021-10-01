const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const ServerError = require('../errors/server-error')
const RevGeocodingRouter = require('./revgeocoding-router')

const makeSut = () => {
  const sut = new RevGeocodingRouter()
  return sut
}

describe('RevGeocoding Router', () => {
  test('Deve retornar 400 se nenhuma longitude for fornecida.', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        location: {
          latLng: {
            lat: 11,
          },
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('longitude').message
    )
  })

  test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        location: {
          latLng: {
            lng: 11,
          },
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('latitude').message
    )
  })

  test('Deve retornar 400 se a longitude houver caracteres não numéricos.', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        location: {
          latLng: {
            lat: 22,
            lng: 'any-invalid-longitude',
          },
        },
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
    const sut = makeSut()
    const httpRequest = {
      body: {
        location: {
          latLng: {
            lat: 'any-invalid-latitude',
            lng: 11,
          },
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(
      new InvalidParamError('latitude').message
    )
  })

  test('Deve retornar 500 se nenhum httpRequest for fornecido.', async () => {
    const sut = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Deve retornar 500 se o httpRequest não houver body.', async () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Deve retornar 200 se os parametros fornecidos forem válidos.', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        location: {
          latLng: {
            lat: 22,
            lng: 11,
          },
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
