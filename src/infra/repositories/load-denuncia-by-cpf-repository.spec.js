const LoadDenunciaByCpfRepository = require('./load-denuncia-by-cpf-repository')
const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')

let denunciaModel

const makeSut = () => {
  return new LoadDenunciaByCpfRepository()
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
  test('Deve retornar o cpf, nome, titulo e descrição da denuncia gerado pela busca por denuncias registradas naquele cpf e titulo', async () => {
    const sut = makeSut()
    const fakeDenuncia = {
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
    const retorno = await denunciaModel.insertOne(fakeDenuncia)
    const denuncia = await sut.load('12345678909', 'any-titulo')
    expect(denuncia).toEqual({
      _id: retorno.insertedId,
      cpf: fakeDenuncia.cpf,
      titulo: fakeDenuncia.titulo,
      descricao: fakeDenuncia.descricao,
    })
  })

  test('Deve throwar se nenhum cpf for fornecido', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('cpf'))
  })

  test('Deve throwar se nenhum titulo for fornecido', async () => {
    const sut = makeSut()
    const cpf = '12345678909'
    const promise = sut.load(cpf)
    expect(promise).rejects.toThrow(new MissingParamError('titulo'))
  })
})
