import path from 'path'
import express from 'express'
import threadsRouter from './threads'

const indexRouter = express.Router();
const DIST_DIR = __dirname
const HTML_FILE = path.join(DIST_DIR, 'views/index.html')

indexRouter.get('/', (req, res) => {
  res.sendFile(HTML_FILE)
});

export {
  indexRouter,
  threadsRouter,
}
