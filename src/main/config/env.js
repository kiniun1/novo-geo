module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/denuncia-api',
  appPort: process.env.PORT || 3000,
  redisPort: process.env.REDIS_PORT || 6379,
  redisHost: process.env.REDIS_HOST || 'localhost',
}
