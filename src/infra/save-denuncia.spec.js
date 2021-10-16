const SaveDenuncia = require('./save-denuncia')
const MongoHelper = require('./helpers/mongo-helper')
const { InvalidParamError, MissingParamError } = require('../utils/errors')
let denunciaModel

const makeSut = () => {
  return new SaveDenuncia()
}

describe('Inserir Denuncias', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    denunciaModel = await MongoHelper.pegandoColeções('denuncias')
  })

  beforeEach(async () => {
    await denunciaModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.fechando()
  })

  test('Deve retornar que existe a propriedade insertedId se a inserção pelo método save da classe saveDenuncia no banco de dados foi bem sucedida', async () => {
    const sut = makeSut()

    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const teste = await sut.save(mockDenuncia, 1)
    expect(teste.insertedId).toBe(1)
    expect(teste.acknowledged).toBe(true)
  })

  test('Deve fazer um throw se nenhuma denuncia for passada', async () => {
    const sut = makeSut()
    const promise = sut.save()
    expect(promise).rejects.toThrow(new MissingParamError('denuncia'))
  })

  test('Deve fazer um throw se o id não for passado para o método save', async () => {
    const sut = makeSut()
    const invalid = null
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const promise = sut.save(mockDenuncia, invalid)
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('Deve fazer um throw se nenhuma latitude for passada', async () => {
    const mockDenuncia = {
      data: {},
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('latitude'))
  })

  test('Deve fazer um throw se nenhuma longitude for passada', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('longitude'))
  })

  test('Deve fazer um throw se nenhum nome for passado', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {},
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('nome'))
  })

  test('Deve fazer um throw se nenhum cpf for passado', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('cpf'))
  })

  test('Deve fazer um throw se nenhum titulo for passado', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {},
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('titulo'))
  })

  test('Deve fazer um throw se nenhuma descricao for passada', async () => {
    const mockDenuncia = {
      data: {
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
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('descricao'))
  })

  test('Deve fazer um throw se nenhuma cidade for passada', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('cidade'))
  })

  test('Deve fazer um throw se nenhum estado for passado', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('estado'))
  })

  test('Deve fazer um throw se nenhum pais for passado', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new MissingParamError('pais'))
  })

  test('Deve fazer um throw se a latitude não for passada como número', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('latitude'))
  })

  test('Deve fazer um throw se a longitude não for passada como número', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: 'invalid-longitude',
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('longitude'))
  })

  test('Deve fazer um throw se o nome for passado como número', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 123,
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('nome'))
  })

  test('Deve fazer um throw se o cpf não for passado como número', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('cpf'))
  })

  test('Deve fazer um throw se o titulo for passado como número', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 123,
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('titulo'))
  })

  test('Deve fazer um throw se a descricao for passada como número', async () => {
    const mockDenuncia = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 123,
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('descricao'))
  })

  test('Deve fazer um throw se a cidade for passada como número', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 123,
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('cidade'))
  })

  test('Deve fazer um throw se o estado for passado como número', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 123,
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('estado'))
  })

  test('Deve fazer um throw se o país for passado como número', async () => {
    const mockDenuncia = {
      data: {
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
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 123,
          cep: '57036-371',
        },
      },
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia, 1)
    expect(promise).rejects.toThrow(new InvalidParamError('pais'))
  })
})
