import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ page:'threads' })
});

export default router
