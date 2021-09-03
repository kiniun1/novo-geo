const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const DenunciaModel = mysql.model('Denuncia')

module.exports = () => {
    router.post('/v1/denuncias', new CallGeocodingApiRouter().route)
}

class CallGeocodingApiRouter {
    async route (req, res) {
        const { latitude, longitude, nome, cpf, titulo, descricao} = req.body
        
    }
}