import express from 'express'
import { RouterSite, RouterThread } from './routers'

const app = express()
const DIST_DIR = __dirname

app.use(express.static(DIST_DIR))
app.use('/assets', express.static('public/assets'));
app.use('/', RouterSite);
app.use('/threads', RouterThread);

//app.get('*', (req, res) => {
//  res.sendFile(HTML_FILE)
//})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
