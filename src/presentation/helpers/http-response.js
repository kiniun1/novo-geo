const InvalidParamError = require('./invalid-param-error')
const MissingParamError = require('./missing-param-error')
const ServerError = require('./server-error')

module.exports = class httpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError(),
    }
  }

  static invalidRequest(paramName) {
    return {
      statusCode: 400,
      body: new InvalidParamError(paramName),
    }
  }

  static ok() {
    return {
      statusCode: 200,
    }
  }
}
