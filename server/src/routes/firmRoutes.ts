import { Router } from 'express';
import { createFirm, getMyFirm, getStats } from '../controllers/firmController.js';

const router = Router();

router.post('/', createFirm);
router.get('/me', getMyFirm);
router.get('/stats', getStats);

export default router;
