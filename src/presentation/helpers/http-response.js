const InvalidParamError = require('./invalid-param-error')
const MissingParamError = require('./missing-param-error')

module.exports = class httpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static invalidRequest (paramName) {
    return {
      statusCode: 400,
      body: new InvalidParamError(paramName)
    }
  }

  static ok () {
    return {
      statusCode: 200
    }
  }
}
