import express from 'express'
import { indexRouter, threadsRouter } from './routers'

const app = express()
const DIST_DIR = __dirname

app.use(express.static(DIST_DIR))
app.use('/assets', express.static('public/assets'));

app.use('/', indexRouter);
app.use('/threads', threadsRouter);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
