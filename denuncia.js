const express = require('restify')
const router = restify.router()
const mysql = require('mysql')
const DenunciaModel = mysql.model('Denuncia')

module.exports = () => {
    const router = new CallGeocodingApiRouter()
    router.post('/v1/denuncias', RestifyRouterAdapter.adapt(router))
}

class RestifyRouterAdapter {
    static adapt (router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}

class CallGeocodingApiRouter {
    async route (httpRequest) {
        const { latitude, longitude, nome, cpf, titulo, descricao} = httpRequest.body
        return {
            statusCode: 200,
            body: user
        }
    }
}