import { Router } from 'express';
import { getPortalInvoice, markAsPaid, uploadDocument } from '../controllers/portalController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/documents/' });
const router = Router();

// PUBLIC ROUTES (No Auth needed as they are for clients via unique UUID)
router.get('/:invoice_id', getPortalInvoice);
router.post('/:invoice_id/pay', markAsPaid);
router.post('/:invoice_id/upload', upload.single('file'), uploadDocument);

export default router;
