import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import history from 'connect-history-api-fallback'
import Authenticator from './config/passport'
import connectFlash from 'connect-flash'
import bodyParser from 'body-parser'
import { logErrors, clientErrorHandler, errorHandler } from './config/middlewares/errorHandler'
import config from './config/config.json'
import { usersRouter } from './routers'

const app = express()

app.use(cookieParser())

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 *  config.session.cookie.maxAgeHours,
      secure: config.session.cookie.secure,
    },
    secret: config.session.secretKey,
    resave: false,
    saveUninitialized: false
  })
);

app.use(connectFlash());
Authenticator.initialize(app)
Authenticator.setStrategy()

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
//app.use('/threads', threadsRouter)
app.use('/api/users', usersRouter)

// Error Handler
app.use(logErrors);
app.use('/api', clientErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

