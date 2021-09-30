const RevGeocodingConversor = require('./rev-geocoding-conversor')
const { MissingParamError, InvalidParamError } = require('./errors')

const makeSut = () => {
  const conversorSpy = makeConversor()
  const conversor = new RevGeocodingConversor()
  return { conversor, conversorSpy }
}

const makeConversor = () => {
  class ConversorSpy {
    convert(data) {
      this.latitude = data.latitude
      this.longitude = data.longitude
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

const makeConversorWithError = () => {
  class ConversorSpy {
    convert() {
      throw new Error()
    }
  }
  return new ConversorSpy()
}

describe('Conversor para formato do request para API EXTERNA RevGeocoding', () => {
  test('O resultado do método de converter do ConversorSpy deve ser igual ao modelo de resposta.', async () => {
    const { conversorSpy } = makeSut()
    const data = {
      latitude: 11,
      longitude: 22,
    }
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversorSpy.convert(data)
    expect(latLng).toEqual(respo)
  })

  test('A latitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const data = {
      latitude: 11,
      longitude: 22,
    }
    await conversorSpy.convert(data)
    expect(conversorSpy.latitude).toEqual(data.latitude)
  })

  test('A longitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const data = {
      latitude: 11,
      longitude: 22,
    }
    await conversorSpy.convert(data)
    expect(conversorSpy.longitude).toEqual(data.longitude)
  })

  test('O resultado do método de converter do Conversor deve ser igual ao modelo de resposta.', async () => {
    const { conversor } = makeSut()
    const data = {
      latitude: 11,
      longitude: 22,
    }
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversor.convert(data)
    expect(latLng).toEqual(respo)
  })

  test('Deve fazer um throw se nenhuma latitude for fornecida', async () => {
    const { conversor } = makeSut()
    const data = {
      invalid: null,
      longitude: 22,
    }
    return expect(conversor.convert(data)).rejects.toEqual(
      new MissingParamError('latitude')
    )
  })

  test('Deve fazer um throw se nenhuma longitude for fornecida', async () => {
    const { conversor } = makeSut()
    const data = {
      latitude: 11,
      invalid: null,
    }
    return expect(conversor.convert(data)).rejects.toEqual(
      new MissingParamError('longitude')
    )
  })

  test('Deve fazer um throw se a latitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const data = {
      latitude: 'invalid-latitude',
      longitude: 22,
    }
    return expect(conversor.convert(data)).rejects.toEqual(
      new InvalidParamError('latitude')
    )
  })

  test('Deve fazer um throw se a longitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const data = {
      latitude: 11,
      longitude: 'invalid-longitude',
    }
    return expect(conversor.convert(data)).rejects.toEqual(
      new InvalidParamError('longitude')
    )
  })

  test('Deve fazer um throw se nenhum dado for fornecido pro método de converter', async () => {
    const { conversor } = makeSut()
    return expect(conversor.convert()).rejects.toEqual(
      new MissingParamError('data')
    )
  })
})
