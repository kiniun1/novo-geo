const SaveDenuncia = require('./save-denuncia')
const MongoHelper = require('./helpers/mongo-helper')
const MissingParamError = require('../utils/errors/missing-param-error')
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
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
      latitude: 'any-latitude',
      longitude: 'any-longitude',
    }
    const sut = makeSut()
    const promise = sut.save(mockDenuncia)
    expect(promise).rejects.toThrow(new MissingParamError('pais'))
  })
})
