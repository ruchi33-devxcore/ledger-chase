import { Router } from 'express';
import { getInvoices, createInvoice, importInvoices, updateInvoiceStatus } from '../controllers/invoiceController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/:firm_id', getInvoices);
router.post('/', createInvoice);
router.post('/import', upload.single('file'), importInvoices);
router.patch('/:id/status', updateInvoiceStatus);

export default router;
