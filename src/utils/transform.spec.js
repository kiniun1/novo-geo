const Conversor = require('../presentation/helpers/transformBodyToJson')
const { MissingParamError, InvalidParamError } = require('./errors')

const makeSut = () => {
  const conversorSpy = makeConversor()
  const conversor = new Conversor()
  return { conversor, conversorSpy }
}

const makeConversor = () => {
  class ConversorSpy {
    convert(data) {
      this.data = data
      this.latitude = data.body.latitude
      this.longitude = data.body.longitude
      conversorSpy.latLng = {
        location: {
          latLng: {
            lat: this.latitude,
            lng: this.longitude,
          },
        },
      }
      return this.latLng
    }
  }
  const conversorSpy = new ConversorSpy()

  return conversorSpy
}

describe('Convertor para JSON', () => {
  test('O resultado do método de converter do ConversorSpy deve ser igual ao modelo de resposta.', async () => {
    const { conversorSpy } = makeSut()
    const httpRequest = {
      body: {
        latitude: 11,
        longitude: 22,
      },
    }
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversorSpy.convert(httpRequest)
    expect(latLng).toEqual(respo)
  })

  test('A latitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const httpRequest = {
      body: {
        latitude: 11,
        longitude: 22,
      },
    }
    await conversorSpy.convert(httpRequest)
    expect(conversorSpy.data.body.latitude).toEqual(httpRequest.body.latitude)
  })

  test('A latitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const httpRequest = {
      body: {
        latitude: 11,
        longitude: 22,
      },
    }
    await conversorSpy.convert(httpRequest)
    expect(conversorSpy.data.body.longitude).toEqual(httpRequest.body.longitude)
  })

  test('O resultado do método de converter do Conversor deve ser igual ao modelo de resposta.', async () => {
    const { conversor } = makeSut()
    const httpRequest = {
      body: {
        latitude: 11,
        longitude: 22,
      },
    }
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversor.convert(httpRequest)
    expect(latLng).toEqual(respo)
  })

  test('Deve fazer um throw se nenhum dado for fornecido', async () => {
    const { conversor } = makeSut()
    const promise = conversor.convert()
    expect(promise).rejects.toThrow(new MissingParamError('data'))
  })

  test('Deve fazer um throw se nenhuma latitude for fornecida', async () => {
    const { conversor } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
      },
    }
    const promise = conversor.convert(httpRequest)
    expect(promise).rejects.toThrow(new MissingParamError('latitude'))
  })

  test('Deve fazer um throw se nenhuma longitude for fornecida', async () => {
    const { conversor } = makeSut()
    const httpRequest = {
      body: {
        latitude: 'any-latitude',
      },
    }
    const promise = conversor.convert(httpRequest)
    expect(promise).rejects.toThrow(new MissingParamError('longitude'))
  })

  test('Deve fazer um throw se a latitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const httpRequest = {
      body: {
        latitude: 'any-latitude',
        longitude: 22,
      },
    }
    const promise = conversor.convert(httpRequest)
    expect(promise).rejects.toThrow(new InvalidParamError('latitude'))
  })

  test('Deve fazer um throw se a longitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const httpRequest = {
      body: {
        latitude: 11,
        longitude: 'any-longitude',
      },
    }
    const promise = conversor.convert(httpRequest)
    expect(promise).rejects.toThrow(new InvalidParamError('longitude'))
  })
})
