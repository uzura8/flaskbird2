import path from 'path'
import express from 'express'
import RouterThread from './thread'

const RouterSite = express.Router();
const DIST_DIR = __dirname
const HTML_FILE = path.join(DIST_DIR, 'views/index.html')

RouterSite.get('/', (req, res) => {
  console.log('router!!!!!');
  res.sendFile(HTML_FILE)
});

export {
  RouterSite,
  RouterThread,
}
