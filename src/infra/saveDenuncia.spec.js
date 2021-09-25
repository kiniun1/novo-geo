const SaveDenuncia = require('./save-denuncia')
const MongoHelper = require('./helpers/mongo-helper')
const MissingParamError = require('../utils/errors/missing-param-error')
const { InvalidParamError } = require('../utils/errors')
let denunciaModel

const makeSut = () => {
  return new SaveDenuncia(denunciaModel)
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
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const teste = await sut.save(mockDenuncia)
    expect(teste).toHaveProperty('insertedId')
    expect(teste.acknowledged).toBe(true)
  })

  test('Deve throwar se nenhuma denuncia for passada', async () => {
    const sut = makeSut()
    const promise = sut.save()
    expect(promise).rejects.toThrow(new MissingParamError('denuncia'))
  })

  test('Deve throwar se nenhuma latitude for passada', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('latitude'))
  })

  test('Deve throwar se nenhuma longitude for passada', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('longitude'))
  })

  test('Deve throwar se nenhum nome for passado', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('nome'))
  })

  test('Deve throwar se nenhum cpf for passado', async () => {
    const mockDenuncia = {
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('cpf'))
  })

  test('Deve throwar se nenhum titulo for passado', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('titulo'))
  })

  test('Deve throwar se nenhuma descricao for passada', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('descricao'))
  })

  test('Deve throwar se nenhuma cidade for passada', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('cidade'))
  })

  test('Deve throwar se nenhum estado for passado', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('estado'))
  })

  test('Deve throwar se nenhum pais for passado', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('pais'))
  })

  test('Deve throwar se a latitude for passada como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: 'invalid-latitude',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('latitude'))
  })

  test('Deve throwar se a longitude for passada como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: 'invalid-longitude',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('longitude'))
  })

  test('Deve throwar se o nome for passado como número', async () => {
    const mockDenuncia = {
      nome: 1,
      cpf: '12345678909',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('nome'))
  })

  test('Deve throwar se o cpf for passado como número', async () => {
    const mockDenuncia = {
      nome: 'any_name',
      cpf: 'invalid-cpf',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('cpf'))
  })

  test('Deve throwar se o titulo for passado como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 1,
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('titulo'))
  })

  test('Deve throwar se a descricao for passada como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 1,
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('descricao'))
  })

  test('Deve throwar se a cidade for passada como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      cidade: 1,
      bairro: 'any-bairro',
      estado: 'any-estado',
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('cidade'))
  })

  test('Deve throwar se o estado for passado como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 1,
      pais: 'any-pais',
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('estado'))
  })

  test('Deve throwar se o país for passado como número', async () => {
    const mockDenuncia = {
      cpf: '12345678909',
      nome: 'any_name',
      titulo: 'any-titulo',
      descricao: 'any_descricao',
      logradouro: 'any-logradouro',
      bairro: 'any-bairro',
      cidade: 'any-cidade',
      estado: 'any-estado',
      pais: 2,
      cep: 'any-cep',
      latitude: '11',
      longitude: '22',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new InvalidParamError('pais'))
  })
})
