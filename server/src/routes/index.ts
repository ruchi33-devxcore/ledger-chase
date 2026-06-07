import { Router } from 'express';
import firmRoutes from './firmRoutes.js';
import clientRoutes from './clientRoutes.js';
import invoiceRoutes from './invoiceRoutes.js';
import scheduleRoutes from './scheduleRoutes.js';
import logRoutes from './logRoutes.js';

const router = Router();

router.use('/firms', firmRoutes);
router.use('/clients', clientRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/logs', logRoutes);

export default router;
