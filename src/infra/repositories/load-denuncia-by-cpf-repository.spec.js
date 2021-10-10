const LoadDenunciaByCpfRepository = require('./load-denuncia-by-cpf-repository')
const MongoHelper = require('../helpers/mongo-helper')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')

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
    const retorno = await denunciaModel.insertOne(fakeDenuncia)
    const denuncia = await sut.load('95761638037', 'Esgoto a céu aberto')
    expect(denuncia).toEqual({
      _id: retorno.insertedId,
      data: {
        denunciante: {
          cpf: fakeDenuncia.data.denunciante.cpf,
        },
        denuncia: {
          titulo: fakeDenuncia.data.denuncia.titulo,
          descricao: fakeDenuncia.data.denuncia.descricao,
        },
      },
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

  test('Deve throwar se o cpf não for passado como número', async () => {
    const sut = makeSut()
    const fakeDenuncia = {
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
    await denunciaModel.insertOne(fakeDenuncia)
    const promise = sut.load('invalid-cpf', 'any-titulo')
    expect(promise).rejects.toThrow(new InvalidParamError('cpf'))
  })

  test('Deve throwar se o titulo for passado como número', async () => {
    const sut = makeSut()
    const fakeDenuncia = {
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
    await denunciaModel.insertOne(fakeDenuncia)
    const promise = sut.load('12345678909', '1')
    expect(promise).rejects.toThrow(new InvalidParamError('titulo'))
  })
})
