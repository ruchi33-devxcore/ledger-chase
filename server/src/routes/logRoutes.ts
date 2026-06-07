import { Router } from 'express';
import { getLogs } from '../controllers/logController';

const router = Router();

router.get('/:firm_id', getLogs);

export default router;
