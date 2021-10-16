const SaveId = require('./save-denuncia-id')
const MongoHelper = require('./helpers/mongo-helper')
let counterModel

const makeSut = () => {
  return new SaveId()
}

describe('', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    counterModel = await MongoHelper.pegandoColeções('counters')
  })

  beforeEach(async () => {
    await counterModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.fechando()
  })

  test('Deve atualizar o elemento contendo a contagem do id, incrementando 1 no valor encontrado no banco de dados', async () => {
    const sut = makeSut()
    await counterModel.insertOne({
      _id: 'useridteste',
      seq: 0,
    })
    await sut.getNextSequence('useridteste')
    const novoId = await counterModel.findOne(
      {
        _id: 'useridteste',
      },
      {
        projection: {
          _id: false,
          seq: true,
        },
      }
    )
    expect(novoId.seq).toBe(1)
  })

  test('Deve retornar o valor atual da contagem dos IDs que está no contador na coleção counters', async () => {
    const sut = makeSut()
    await counterModel.insertOne({
      _id: 'userid',
      seq: 5,
    })
    const resposta = await sut.getId()
    expect(resposta).toBe(5)
  })
})
