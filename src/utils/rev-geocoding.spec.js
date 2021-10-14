const { MissingParamError } = require('./errors')
const RevGeocoding = require('./rev-geocoding')
require('dotenv').config()

const makeSut = () => {
  const revGeocodingSpy = makeRevGeocoding()
  const sut = new RevGeocoding()
  return { sut, revGeocodingSpy }
}

const makeRevGeocoding = () => {
  class RevGeocodingSpy {
    async getLocation(latitude, longitude) {
      this.latitude = latitude
      this.longitude = longitude
      return this.coordenadas
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.coordenadas = {
    latitude: 123,
    longitude: 1234,
  }
  return revGeocodingSpy
}

describe('RevGeocoding', () => {
  test('Garantir que a latitude recebida pelo método getLocation seja a mesma que foi passada', async () => {
    const { revGeocodingSpy } = makeSut()
    const latitude = 123
    const longitude = 1234
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
    await revGeocodingSpy.getLocation(latitude, longitude)
    expect(revGeocodingSpy.latitude).toEqual(latitude)
  })

  test('Garantir que a longitude recebida pelo método getLocation seja a mesma que foi passada', async () => {
    const { revGeocodingSpy } = makeSut()
    const latitude = 123
    const longitude = 1234
    await revGeocodingSpy.getLocation(latitude, longitude)
    expect(revGeocodingSpy.longitude).toEqual(longitude)
  })

  test('Garantir que o método da classe rev-geocoding esteja chamando a API Externa e retornando uma resposta dela', async () => {
    const { sut, revGeocodingSpy } = makeSut()
    const coordenadas = {
      latitude: 123,
      longitude: 1234,
    }
    await sut.getLocation(coordenadas.latitude, coordenadas.longitude)
    expect(revGeocodingSpy.coordenadas).toEqual(coordenadas)
  })

  test('Deve fazer um throw se a latitude não for passada', async () => {
    const { sut } = makeSut()
    const promise = sut.getLocation()
    expect(promise).rejects.toThrow(new MissingParamError('latitude'))
  })

  test('Deve fazer um throw se a longitude não for passada', async () => {
    const { sut } = makeSut()
    const promise = sut.getLocation('qualquer-latitude')
    expect(promise).rejects.toThrow(new MissingParamError('longitude'))
  })
})
