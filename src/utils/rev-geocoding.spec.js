const RevGeocoding = require('./rev-geocoding')
const axios = require('axios')
require('dotenv').config()

const makeSut = () => {
  const revGeocodingSpy = makeRevGeocoding()
  const sut = new RevGeocoding()
  return { sut, revGeocodingSpy }
}

const makeRevGeocoding = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
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

// FAZER TESTE NO DENUNCIA-ROUTER PARA TESTAR SE TA PASSANDO A URL CERTA PARA O REVGEOCODING COM AS CLASSES SPYS
describe('RevGeocoding', () => {
  test('Garantir que a latitude recebida pelo método getLocation seja a mesma que foi passada', async () => {
    const { revGeocodingSpy } = makeSut()
    const latitude = 123
    const longitude = 1234
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
    await revGeocodingSpy.getLocation(url)
    expect(revGeocodingSpy.coordenadas.latitude).toEqual(latitude)
  })

  test('Garantir que a longitude recebida pelo método getLocation seja a mesma que foi passada', async () => {
    const { revGeocodingSpy } = makeSut()
    const latitude = 123
    const longitude = 1234
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
    await revGeocodingSpy.getLocation(url)
    expect(revGeocodingSpy.coordenadas.longitude).toEqual(longitude)
  })

  test('Garantir que o método da classe rev-geocoding esteja chamando a API Externa e retornando uma resposta dela', async () => {
    const { sut } = makeSut()
    const latitude = 123
    const longitude = 1234
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${latitude},${longitude}`
    const resposta = await sut.getLocation(url)
    expect(resposta.info.statuscode).toBe(0)
  })
})
