const ServerError = require('../errors/server-error')

module.exports = class httpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: {
          message: error.message,
          code: '01',
        },
      },
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: {
          message: new ServerError().message,
          code: '03',
        },
      },
    }
  }

  static addressNotFound() {
    return {
      statusCode: 400,
      body: {
        error: {
          message: 'Endereço não encontrado para essa localidade',
          code: '02',
        },
      },
    }
  }

  static ok(denuncia, id) {
    return {
      statusCode: 200,
      body: {
        data: {
          id,
          denuncia,
        },
      },
    }
  }
}
