class DenunciaRouter {
    route (httpRequest) {
        if (!httpRequest || !httpRequest.body) {
            return httpResponse.serverError()
        }

        const { latitude, longitude, nome, cpf, titulo, descricao } = httpRequest.body
        if (!latitude) {
            return httpResponse.badRequest('latitude')
        }
        if (!longitude) {
            return httpResponse.badRequest('longitude')
        }
        if (!nome) {
            return httpResponse.badRequest('nome')
        }
        if (!cpf) {
            return httpResponse.badRequest('cpf')
        }
        if (!titulo) {
            return httpResponse.badRequest('titulo')
        }
        if (!descricao) {
            return httpResponse.badRequest('descricao')
        }
    }
}

class httpResponse {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static serverError() {
        return {
            statusCode: 500
        }
    }
}

class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamError'
    }
}

describe('Denuncia Router', () => {
    test('Deve retornar 400 se nenhuma latitude for fornecida.', () => {
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
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
        const sut = new DenunciaRouter()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Deve retornar 500 se o httpRequest não houver body.', () => {
        const sut = new DenunciaRouter()
        const httpRequest = {}
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})