class RevGeocodingRouter {
    route (httpRequest) {
        if (!httpRequest.body.latitude || !httpRequest.body.longitude) {
            return {
                statusCode: 400
            }
        }
    }
}


describe('RevGeocoding Router', () => {
    test('Deve retornar 400 se nenhuma latitude for fornecida.', () => {
        const sut = new RevGeocodingRouter()
        const httpRequest = {
            body: {
                longitude: 'any-longitude'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})

describe('RevGeocoding Router', () => {
    test('Deve retornar 400 se nenhuma longitude for fornecida.', () => {
        const sut = new RevGeocodingRouter()
        const httpRequest = {
            body: {
                latitude: 'any-latitude'
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})