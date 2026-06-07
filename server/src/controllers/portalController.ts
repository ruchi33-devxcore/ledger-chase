import { Request, Response } from 'express';
import db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

export const getPortalInvoice = (req: Request, res: Response) => {
  const { invoice_id } = req.params;
  
  try {
    const invoice = db.prepare(`
      SELECT 
        invoices.*, 
        clients.name as client_name, 
        clients.email as client_email,
        firms.name as firm_name,
        firms.email as firm_email,
        firms.address as firm_address
      FROM invoices
      JOIN clients ON invoices.client_id = clients.id
      JOIN firms ON invoices.firm_id = firms.id
      WHERE invoices.id = ?
    `).get(invoice_id) as any;

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Also get documents
    const documents = db.prepare('SELECT * FROM documents WHERE invoice_id = ?').all(invoice_id);

    res.json({ ...invoice, documents });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const markAsPaid = (req: Request, res: Response) => {
  const { invoice_id } = req.params;
  
  try {
    db.prepare('UPDATE invoices SET status = ? WHERE id = ?').run('paid', invoice_id);
    res.json({ message: 'Invoice marked as paid' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const uploadDocument = (req: Request, res: Response) => {
  const { invoice_id } = req.params;
  const { name } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const id = uuidv4();
    db.prepare(`
      INSERT INTO documents (id, invoice_id, name, file_path)
      VALUES (?, ?, ?, ?)
    `).run(id, invoice_id, name || req.file.originalname, req.file.path);

    const doc = db.prepare('SELECT * FROM documents WHERE id = ?').get(id);
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
