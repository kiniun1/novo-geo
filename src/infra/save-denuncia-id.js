const MongoHelper = require('./helpers/mongo-helper')

module.exports = class SaveId {
  async getNextSequence(name) {
    const counterModel = await MongoHelper.pegandoColeções('counters')
    await counterModel.updateOne({ _id: name }, { $inc: { seq: 1 } })
  }

  async getId() {
    const counterModel = await MongoHelper.pegandoColeções('counters')
    const id = await counterModel.findOne(
      {
        _id: 'userid',
      },
      {
        projection: {
          _id: false,
          seq: true,
        },
      }
    )
    return id.seq
  }
}
