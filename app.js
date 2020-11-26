const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

let securityRouter = require('./app/routes/security')
let userDataRouter = require('./app/routes/user-data')
let vehicleDataRouter = require('./app/routes/vehicle-data')
let httpInterceptor = require('./app/utils/http-interceptor')

let app = express()

app.get('/', (req, res) => {
    let msg = process.env.APP_STAGE === 'Production' ? `${process.env.APP_NAME} is running.` : `${process.env.APP_NAME} (${process.env.APP_STAGE}) is running.`
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.status(200).json({message: msg})
})

let corsOptions = {methods: 'GET,POST,PUT,DELETE'}
if (process.env.APP_STAGE.toUpperCase() !== 'DEVELOPMENT') {
    corsOptions.origin = process.env.BASE_URL
    corsOptions.optionsSuccessStatus = 200
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(compression())
app.use(cors(corsOptions))

app.get('/api/*', httpInterceptor.validateToken)
app.post('/api/*', httpInterceptor.validateToken)
app.put('/api/*', httpInterceptor.validateToken)
app.delete('/api/*', httpInterceptor.validateToken)

app.use('/', securityRouter)
app.use('/api/user-data', userDataRouter)
app.use('/api/vehicle-data', vehicleDataRouter)

module.exports = app
