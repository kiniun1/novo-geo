const url =
  'http://www.mapquestapi.com/geocoding/v1/reverse?key=2CCyxKh9HxmhX0eBctMzNOcPlIuiqcnS&location='
const router = require('express').Router()
const { response } = require('express')
const got = require('got')
const { pipeline } = require('stream')
const Transform = require('../helpers/transformBodyToJson')
const RevGeocodingRouter = require('./revgeocoding-router')

/* router.post('/', function(req, res) {
    const latitude = req.body.latitude
    const longitude = req.body.longitude
  const dataStream = got.stream({
      uri: 'http://www.mapquestapi.com/geocoding/v1/reverse?key=',
      qs: {
        api_key: '2CCyxKh9HxmhX0eBctMzNOcPlIuiqcnS',
        location: 'World of Warcraft: Legion'
      }
  });
  pipeline(dataStream, res, (err) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      }
  });
});

module.exports = router; */

const makeSut = () => {
  const sut = new RevGeocodingRouter()
  const transform = new Transform()
  return { sut, transform }
}

describe('RevGeocoding Router', () => {
  /* test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
        //const { sut } = makeSut()
        const httpRequest = {
          body: {
            longitude: 'any-longitude',
            latitude: 'any-nome',
          },
        }
        router.post(httpRequest)
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.error).toEqual(
          new MissingParamError('latitude').message
        )
      }) */

  test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
    const { transform } = makeSut()
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
    const latLng = transform.convert(httpRequest)
    expect(latLng).toEqual(respo)
  })
})
