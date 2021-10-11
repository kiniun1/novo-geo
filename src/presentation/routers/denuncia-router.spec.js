const DenunciaRouter = require('./denuncia-router')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const ServerError = require('../errors/server-error')

const makeSut = () => {
  const cpfValidatorSpy = makeCpfValidator()
  const revGeocodingSpy = makeRevGeocoding()
  const saveDenunciaSpy = makeSaveDenuncia()
  const sut = new DenunciaRouter({
    cpfValidator: cpfValidatorSpy,
    revGeocoding: revGeocodingSpy,
    saveDenuncia: saveDenunciaSpy,
  })
  return {
    sut,
    cpfValidatorSpy,
    revGeocodingSpy,
    saveDenunciaSpy,
  }
}

const makeCpfValidator = () => {
  class CpfValidatorSpy {
    isCpfValid(cpf) {
      this.cpf = cpf
      return this.cpfValid
    }
  }
  const cpfValidatorSpy = new CpfValidatorSpy()
  cpfValidatorSpy.cpfValid = true
  return cpfValidatorSpy
}

const makeCpfValidatorWithError = () => {
  class CpfValidatorSpy {
    isCpfValid() {
      throw new Error()
    }
  }
  return new CpfValidatorSpy()
}

const makeSaveDenuncia = () => {
  class SaveDenunciaSpy {
    async save(denuncia) {
      this.denunciante = denuncia
    }
  }
  return new SaveDenunciaSpy()
}

const makeSaveDenunciaWithError = () => {
  class SaveDenunciaSpy {
    async save() {
      throw new Error()
    }
  }
  return new SaveDenunciaSpy()
}

const makeRevGeocoding = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    info: {
      statuscode: 0,
      copyright: {
        text: '© 2020 MapQuest, Inc.',
        imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
        imageAltText: '© 2020 MapQuest, Inc.',
      },
      messages: [],
    },
    options: {
      maxResults: 1,
      thumbMaps: false,
      ignoreLatLngInput: false,
    },
    results: [
      {
        providedLocation: {
          latLng: {
            lat: -9.648198,
            lng: -35.713458,
          },
        },
        locations: [
          {
            street: 'Avenida Dona Constança de Góes Monteiro',
            adminArea6: '',
            adminArea6Type: 'Neighborhood',
            adminArea5: 'Maceió',
            adminArea5Type: 'City',
            adminArea4: '',
            adminArea4Type: 'County',
            adminArea3: 'Alagoas',
            adminArea3Type: 'State',
            adminArea1: 'BR',
            adminArea1Type: 'Country',
            postalCode: '57036-371',
            geocodeQualityCode: 'B1AAA',
            geocodeQuality: 'STREET',
            dragPoint: false,
            sideOfStreet: 'N',
            linkId: '0',
            unknownInput: '',
            type: 's',
            latLng: {
              lat: -9.648263,
              lng: -35.713381,
            },
            displayLatLng: {
              lat: -9.648263,
              lng: -35.713381,
            },
          },
        ],
      },
    ],
  }
  return revGeocodingSpy
}

const makeRevGeocodingWithError = () => {
  class RevGeocodingSpy {
    async getLocation() {
      throw new Error()
    }
  }
  return new RevGeocodingSpy()
}

const makeRevGeocodingWithInvalidAddressResponse = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    info: {
      statuscode: 0,
      copyright: {
        text: '\u00A9 2021 MapQuest, Inc.',
        imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
        imageAltText: '\u00A9 2021 MapQuest, Inc.',
      },
      messages: [],
    },
    options: {
      maxResults: 1,
      thumbMaps: true,
      ignoreLatLngInput: false,
    },
    results: [
      {
        providedLocation: {
          latLng: {
            lat: 10.0,
            lng: 1521.0,
          },
        },
        locations: [],
      },
    ],
  }
  return revGeocodingSpy
}

const makeRevGeocodingWithNoCityOnResponse = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    info: {
      statuscode: 0,
      copyright: {
        text: '\u00A9 2021 MapQuest, Inc.',
        imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
        imageAltText: '\u00A9 2021 MapQuest, Inc.',
      },
      messages: [],
    },
    options: {
      maxResults: 1,
      thumbMaps: true,
      ignoreLatLngInput: false,
    },
    results: [
      {
        providedLocation: {
          latLng: {
            lat: 10.0,
            lng: 15.0,
          },
        },
        locations: [
          {
            street: '',
            adminArea6: '',
            adminArea6Type: 'Neighborhood',
            adminArea5: '',
            adminArea5Type: 'City',
            adminArea4: '',
            adminArea4Type: 'County',
            adminArea3: '',
            adminArea3Type: 'State',
            adminArea1: 'CM',
            adminArea1Type: 'Country',
            postalCode: '',
            geocodeQualityCode: 'A1XAX',
            geocodeQuality: 'COUNTRY',
            dragPoint: false,
            sideOfStreet: 'N',
            linkId: '0',
            unknownInput: '',
            type: 's',
            latLng: {
              lat: 10.0,
              lng: 15.0,
            },
            displayLatLng: {
              lat: 10.0,
              lng: 15.0,
            },
            mapUrl:
              'http://www.mapquestapi.com/staticmap/v5/map?key=2CCyxKh9HxmhX0eBctMzNOcPlIuiqcnS&type=map&size=225,160&locations=10.0,15.0|marker-sm-50318A-1&scalebar=true&zoom=2&rand=145978765',
          },
        ],
      },
    ],
  }
  return revGeocodingSpy
}

const makeRevGeocodingWithNoStateOnResponse = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    info: {
      statuscode: 0,
      copyright: {
        text: '\u00A9 2021 MapQuest, Inc.',
        imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
        imageAltText: '\u00A9 2021 MapQuest, Inc.',
      },
      messages: [],
    },
    options: {
      maxResults: 1,
      thumbMaps: true,
      ignoreLatLngInput: false,
    },
    results: [
      {
        providedLocation: {
          latLng: {
            lat: -19.838269,
            lng: 46.855854,
          },
        },
        locations: [
          {
            street: '',
            adminArea6: '',
            adminArea6Type: 'Neighborhood',
            adminArea5: 'Betafo',
            adminArea5Type: 'City',
            adminArea4: '',
            adminArea4Type: 'County',
            adminArea3: '',
            adminArea3Type: 'State',
            adminArea1: 'MG',
            adminArea1Type: 'Country',
            postalCode: '',
            geocodeQualityCode: 'B1AAA',
            geocodeQuality: 'STREET',
            dragPoint: false,
            sideOfStreet: 'N',
            linkId: '0',
            unknownInput: '',
            type: 's',
            latLng: {
              lat: -19.838066,
              lng: 46.855956,
            },
            displayLatLng: {
              lat: -19.838066,
              lng: 46.855956,
            },
            mapUrl:
              'http://www.mapquestapi.com/staticmap/v5/map?key=2CCyxKh9HxmhX0eBctMzNOcPlIuiqcnS&type=map&size=225,160&locations=-19.838065715941738,46.85595624677258|marker-sm-50318A-1&scalebar=true&zoom=15&rand=-1178368398',
          },
        ],
      },
    ],
  }
  return revGeocodingSpy
}

const makeRevGeocodingWithNoCountryOnResponse = () => {
  class RevGeocodingSpy {
    async getLocation(url) {
      this.url = url
      return this.endereco
    }
  }
  const revGeocodingSpy = new RevGeocodingSpy()
  revGeocodingSpy.endereco = {
    info: {
      statuscode: 0,
      copyright: {
        text: '\u00A9 2021 MapQuest, Inc.',
        imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
        imageAltText: '\u00A9 2021 MapQuest, Inc.',
      },
      messages: [],
    },
    options: {
      maxResults: 1,
      thumbMaps: true,
      ignoreLatLngInput: false,
    },
    results: [
      {
        providedLocation: {
          latLng: {
            lat: 10.0,
            lng: 15.0,
          },
        },
        locations: [
          {
            street: '',
            adminArea6: '',
            adminArea6Type: 'Neighborhood',
            adminArea5: 'qualquer-cidade',
            adminArea5Type: 'City',
            adminArea4: '',
            adminArea4Type: 'County',
            adminArea3: 'qualquer-estado',
            adminArea3Type: 'State',
            adminArea1: '',
            adminArea1Type: 'Country',
            postalCode: '',
            geocodeQualityCode: 'A1XAX',
            geocodeQuality: 'COUNTRY',
            dragPoint: false,
            sideOfStreet: 'N',
            linkId: '0',
            unknownInput: '',
            type: 's',
            latLng: {
              lat: 10.0,
              lng: 15.0,
            },
            displayLatLng: {
              lat: 10.0,
              lng: 15.0,
            },
            mapUrl:
              'http://www.mapquestapi.com/staticmap/v5/map?key=2CCyxKh9HxmhX0eBctMzNOcPlIuiqcnS&type=map&size=225,160&locations=10.0,15.0|marker-sm-50318A-1&scalebar=true&zoom=2&rand=145978765',
          },
        ],
      },
    ],
  }
  return revGeocodingSpy
}

describe('Denuncia Router', () => {
  test('Deve retornar 400 se nenhuma latitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('latitude').message,
    })
  })

  test('Deve retornar 400 se nenhuma longitude for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('longitude').message,
    })
  })

  test('Deve retornar 400 se nenhum nome for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('nome').message,
    })
  })

  test('Deve retornar 400 se nenhum cpf for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('cpf').message,
    })
  })

  test('Deve retornar 400 se nenhum titulo for fornecido.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('titulo').message,
    })
  })

  test('Deve retornar 400 se nenhuma descrição for fornecida.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new MissingParamError('descricao').message,
    })
  })

  test('Deve retornar 500 se nenhum httpRequest for fornecido.', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual({
      code: '03',
      message: new ServerError().message,
    })
  })

  test('Deve retornar 500 se o httpRequest não houver body.', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual({
      code: '03',
      message: new ServerError().message,
    })
  })

  test('Deve retornar 400 se o cpf houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: 'invalid-cpf',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denunciante.cpf)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('cpf').message,
    })
  })

  test('Deve retornar 400 se a longitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: 'invalid-cpf',
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.longitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('longitude').message,
    })
  })

  test('Deve retornar 400 se a latitude houver caracteres não numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: 'invalid-latitude',
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.latitude)).toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('latitude').message,
    })
  })

  test('Deve retornar 400 se o nome houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: '123456',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denunciante.nome)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('nome').message,
    })
  })

  test('Deve retornar 400 se a descrição houver somente caracteres numéricos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: '123',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(Number(httpRequest.body.denuncia.descricao)).not.toBeNaN()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('descricao').message,
    })
  })

  test('Deve retornar 200 se os parametros fornecidos forem válidos.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Deve chamar o CpfValidator com o cpf correto', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    await sut.route(httpRequest)
    expect(cpfValidatorSpy.cpf).toBe(httpRequest.body.denunciante.cpf)
  })

  test('Deve retornar 400 se um cpf inválido for fornecido', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.cpfValid = false
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: 'invalid-cpf',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      code: '01',
      message: new InvalidParamError('cpf').message,
    })
  })

  test('Deve fazer um throw se forem passadas dependencias inválidas', async () => {
    const invalid = {}
    const cpfValidator = makeCpfValidator()
    const saveDenuncia = makeSaveDenuncia()
    const revGeocoding = makeRevGeocoding()
    const suts = [].concat(
      new DenunciaRouter(),
      new DenunciaRouter({}),
      new DenunciaRouter({
        cpfValidator: invalid,
      }),
      new DenunciaRouter({
        cpfValidator,
      }),
      new DenunciaRouter({
        cpfValidator,
        saveDenuncia: invalid,
      }),
      new DenunciaRouter({
        cpfValidator,
        saveDenuncia,
      }),
      new DenunciaRouter({
        cpfValidator,
        saveDenuncia,
        revGeocoding: invalid,
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        body: {
          latitude: -9.648198,
          longitude: -35.713458,
          denunciante: {
            nome: 'José de Oliveira',
            cpf: '95761638037',
          },
          denuncia: {
            titulo: 'Esgoto a céu aberto',
            descricao: 'Existe um esgoto a céu aberto nesta localidade.',
          },
        },
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toEqual({
        code: '03',
        message: new ServerError().message,
      })
    }
  })

  test('Deve retornar 400 se não for encontrada um endereço válido para a coordenada passada.', async () => {
    const cpfValidatorSpy = makeCpfValidator()
    const revGeocodingSpy = makeRevGeocodingWithInvalidAddressResponse()
    const saveDenunciaSpy = makeSaveDenuncia()
    const sut = new DenunciaRouter({
      cpfValidator: cpfValidatorSpy,
      revGeocoding: revGeocodingSpy,
      saveDenuncia: saveDenunciaSpy,
    })
    const httpRequest = {
      body: {
        latitude: 10,
        longitude: 1521,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem cidade para a coordenada passada.', async () => {
    const cpfValidatorSpy = makeCpfValidator()
    const revGeocodingSpy = makeRevGeocodingWithNoCityOnResponse()
    const saveDenunciaSpy = makeSaveDenuncia()
    const sut = new DenunciaRouter({
      cpfValidator: cpfValidatorSpy,
      revGeocoding: revGeocodingSpy,
      saveDenuncia: saveDenunciaSpy,
    })
    const httpRequest = {
      body: {
        latitude: 10,
        longitude: 15,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem estado para a coordenada passada.', async () => {
    const cpfValidatorSpy = makeCpfValidator()
    const revGeocodingSpy = makeRevGeocodingWithNoStateOnResponse()
    const saveDenunciaSpy = makeSaveDenuncia()
    const sut = new DenunciaRouter({
      cpfValidator: cpfValidatorSpy,
      revGeocoding: revGeocodingSpy,
      saveDenuncia: saveDenunciaSpy,
    })
    const httpRequest = {
      body: {
        latitude: -19.838269,
        longitude: 46.855854,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve retornar 400 se for retornado um endereço sem país para a coordenada passada.', async () => {
    const cpfValidatorSpy = makeCpfValidator()
    const revGeocodingSpy = makeRevGeocodingWithNoCountryOnResponse()
    const saveDenunciaSpy = makeSaveDenuncia()
    const sut = new DenunciaRouter({
      cpfValidator: cpfValidatorSpy,
      revGeocoding: revGeocodingSpy,
      saveDenuncia: saveDenunciaSpy,
    })
    const httpRequest = {
      body: {
        latitude: 10,
        longitude: 15,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
      },
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual({
      message: 'Endereço não encontrado para essa localidade',
      code: '02',
    })
  })

  test('Deve fazer um throw se qualquer dependencia der um throw', async () => {
    const cpfValidator = makeCpfValidator()
    const revGeocoding = makeRevGeocoding()
    const suts = [].concat(
      new DenunciaRouter({
        cpfValidator: makeCpfValidatorWithError(),
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding: makeRevGeocodingWithError(),
      }),
      new DenunciaRouter({
        cpfValidator,
        revGeocoding,
        saveDenuncia: makeSaveDenunciaWithError(),
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        body: {
          latitude: 10,
          longitude: 15,
          denunciante: {
            nome: 'José de Oliveira',
            cpf: '95761638037',
          },
          denuncia: {
            titulo: 'Esgoto a céu aberto',
            descricao: 'Existe um esgoto a céu aberto nesta localidade.',
          },
        },
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body.error).toEqual({
        code: '03',
        message: new ServerError().message,
      })
    }
  })
})
