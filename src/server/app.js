import express from 'express'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io'
import cookieParser from 'cookie-parser'
import Session from 'express-session'
import history from 'connect-history-api-fallback'
import connectFlash from 'connect-flash'
import bodyParser from 'body-parser'

import config from './config/config.json'
import { logErrors, clientErrorHandler, errorHandler } from './config/middlewares/errorHandler'
import Authenticator from './config/passport'
import { usersRouter, chatsRouter } from './routers'

const app = express()
const PORT = process.env.PORT || config.port
app.set('port', PORT)
const server = http.Server(app)
const io = socketIO(server, { serveClient: false })

app.use(cors())
app.use(cookieParser())
const session = Session({
  secret: config.session.secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 *  config.session.cookie.maxAgeHours,
    secure: config.session.cookie.secure,
  }
})
app.use(connectFlash());
app.use(session)
Authenticator.initialize(app)
Authenticator.setStrategy()
app.use((req, res, next) => {
  res.io = io
  next()
})
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

const staticFileMiddleware = express.static('public/')
app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
}))
app.use(staticFileMiddleware);

//app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/chats', chatsRouter)

// Error Handler
app.use(logErrors);
app.use('/api', clientErrorHandler);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

