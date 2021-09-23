const Conversor = require('../presentation/helpers/transformBodyToJson')
const { MissingParamError, InvalidParamError } = require('./errors')

const makeSut = () => {
  const conversorSpy = makeConversor()
  const conversor = new Conversor()
  return { conversor, conversorSpy }
}

const makeConversor = () => {
  class ConversorSpy {
    convert(latitude, longitude) {
      this.latitude = latitude
      this.longitude = longitude
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

describe('Convertor para JSON', () => {
  test('O resultado do método de converter do ConversorSpy deve ser igual ao modelo de resposta.', async () => {
    const { conversorSpy } = makeSut()
    const latitude = 11
    const longitude = 22
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversorSpy.convert(latitude, longitude)
    expect(latLng).toEqual(respo)
  })

  test('A latitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const latitude = 11
    const longitude = 22

    await conversorSpy.convert(latitude, longitude)
    expect(conversorSpy.latitude).toEqual(latitude)
  })

  test('A longitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const latitude = 11
    const longitude = 22
    await conversorSpy.convert(latitude, longitude)
    expect(conversorSpy.longitude).toEqual(longitude)
  })

  test('O resultado do método de converter do Conversor deve ser igual ao modelo de resposta.', async () => {
    const { conversor } = makeSut()
    const latitude = 11
    const longitude = 22
    const respo = {
      location: {
        latLng: {
          lat: 11,
          lng: 22,
        },
      },
    }
    const latLng = await conversor.convert(latitude, longitude)
    expect(latLng).toEqual(respo)
  })

  test('Deve fazer um throw se nenhuma latitude for fornecida', async () => {
    const { conversor } = makeSut()
    const longitude = 22
    const invalid = null
    return expect(conversor.convert(invalid, longitude)).rejects.toEqual(
      new MissingParamError('latitude')
    )
  })

  test('Deve fazer um throw se nenhuma longitude for fornecida', async () => {
    const { conversor } = makeSut()
    const latitude = 11
    const invalid = null
    return expect(conversor.convert(latitude, invalid)).rejects.toEqual(
      new MissingParamError('longitude')
    )
  })

  test('Deve fazer um throw se a latitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const latitude = 'any-latitude'
    const longitude = 22
    return expect(conversor.convert(latitude, longitude)).rejects.toEqual(
      new InvalidParamError('latitude')
    )
  })

  test('Deve fazer um throw se a longitude fornecida não for um número', async () => {
    const { conversor } = makeSut()
    const latitude = 11
    const longitude = 'any_longitude'
    return expect(conversor.convert(latitude, longitude)).rejects.toEqual(
      new InvalidParamError('longitude')
    )
  })
})
