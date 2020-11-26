const redis = require('redis')

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
})

client.on('connect', function () {
    console.log(`Connected to redis server`)
})
client.on('err', function (err) {
    console.error(`Error connecting to redis server`, err)
})

module.exports = client
