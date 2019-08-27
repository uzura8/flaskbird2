import express from 'express'
const RouterThread = express.Router();

RouterThread.get('/', (req, res) => {
  console.log('router!!!!!');
  res.json({page:'thread'})
});

export default RouterThread
