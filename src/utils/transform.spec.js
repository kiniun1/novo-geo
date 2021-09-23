const Conversor = require('../presentation/helpers/transformBodyToJson')

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

const makeConversorWithError = () => {
  class ConversorSpy {
    convert() {
      throw new Error()
    }
  }
  const conversorSpy = new ConversorSpy()
  conversorSpy.latLng = {
    location: {
      latLng: {
        lat: this.latitude,
        lng: this.longitude,
      },
    },
  }
  return conversorSpy
}
describe('Convertor para JSON', () => {
  test('O resultado do método de converter deve ser igual ao modelo de resposta.', async () => {
    const { conversorSpy } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
      },
    }
    const respo = {
      location: {
        latLng: {
          lat: 'any-latitude',
          lng: 'any-longitude',
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
        longitude: 'any-longitude',
        latitude: 'any-latitude',
      },
    }
    await conversorSpy.convert(httpRequest)
    expect(conversorSpy.data.body.latitude).toEqual(httpRequest.body.latitude)
  })

  test('A latitude passada para a instância da classe ConversorSpy deve ser a mesma que a do request.', async () => {
    const { conversorSpy } = makeSut()
    const httpRequest = {
      body: {
        longitude: 'any-longitude',
        latitude: 'any-latitude',
      },
    }
    await conversorSpy.convert(httpRequest)
    expect(conversorSpy.data.body.longitude).toEqual(httpRequest.body.longitude)
  })
})
