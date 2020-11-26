'use strict'
const dotEnv = require('dotenv'),
    path = require('path'),
    dir = require('app-root-dir'),
    fs = require('fs'),
    localEnvPath = path.join(dir.get(), '.env'),
    moment = require('moment-timezone')

moment.tz.setDefault(process.env.DEFAULT_TZ)
process.env.BASE_PATH = dir.get()
process.env.APP_PATH = path.join(dir.get(), 'app')

if (fs.existsSync(localEnvPath)) {
    dotEnv.config()
    console.info('Using local environment variable.')
} else {
    console.info(`${process.env.APP_NAME} running on ${process.env.APP_STAGE} stage.`)
}

module.exports = dotEnv
