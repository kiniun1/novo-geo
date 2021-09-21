const ServerError = require('../errors/server-error')

module.exports = class httpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message,
      },
    }
  }

  static ok() {
    return {
      statusCode: 200,
    }
  }
}
