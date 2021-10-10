const { MongoClient } = require('mongodb')

module.exports = {
  async connect(uri) {
    this.uri = uri

    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },
  async fechando() {
    await this.client.close()
  },
  async pegandoColeções(name) {
    this.db = this.client.db()
    this.collection = this.db.collection(name)

    return this.collection
  },
}
