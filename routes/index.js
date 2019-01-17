import { Router } from 'express';
import { Spot } from '../database/schema';

const router = Router();

router.use('/', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,ua');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.end();
  }
  else {
    next();
  }
})

router.get('/spot/list', async (req, res, next) => {
  const ret = await Spot.find();

  res
    .status(200)
    .json({ success: true, result: ret, message: '' })
    .end();
})

router.get('/:id', async (req, res, next) => {
  try {
    const placeId = req.params.id;
    const ret = await Spot.findById(placeId);

    res
      .status(200)
      .json({ success: true, result: ret, message: '' })
      .end();
  } catch (err) {

    res
      .status(200)
      .json({ success: false, message: `[Express Error]：${err.message}` })
      .end();
    return;
  }

})


export default router;
