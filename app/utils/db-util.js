const mongoose = require('mongoose')

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
mongoose.connection
    .once('open', () => console.log(`${process.env.APP_NAME} (${process.env.APP_STAGE}) available on ${process.env.BASE_URL}:${process.env.BASE_PORT}`))
    .on('error', (err) => console.log('Connection to database failed!!', err))

module.exports = mongoose
