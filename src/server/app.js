import express from 'express'
import session from 'express-session'
import history from 'connect-history-api-fallback'
//import Authenticator from './config/passport'
import connectFlash from 'connect-flash'
import bodyParser from 'body-parser'
import { usersRouter } from './routers'

const app = express()

app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// for using req.flash
app.use(connectFlash());
//// int passport
//Authenticator.initialize(app)
//// for adding auth function
//Authenticator.setStrategy()

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

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

