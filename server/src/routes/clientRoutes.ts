import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/clientController';

const router = Router();

router.get('/:firm_id', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
