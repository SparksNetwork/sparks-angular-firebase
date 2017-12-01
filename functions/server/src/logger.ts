import * as expressWinston from 'express-winston'
import * as winston from 'winston'

if (process.env.NODE_ENV !== 'production') {
  expressWinston.requestWhitelist = ['url', 'method', 'body', 'uid']
  expressWinston.responseWhitelist = ['statusCode', 'body']
} else {
  expressWinston.requestWhitelist = ['url', 'method', 'uid']
  expressWinston.responseWhitelist = ['statusCode']
}

export const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
})
