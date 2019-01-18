import { Router } from 'express';
import seoulWH from '../webhooks/seoul';

const router = Router();

// 首爾旅遊
router.post('/seoul', seoulWH);

export default router;
