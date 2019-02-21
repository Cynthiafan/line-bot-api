import { Router } from 'express';
import seoulWH from '../webhooks/seoul';

const router = Router();

// Seoul Travel
router.post('/seoul', seoulWH);

export default router;
