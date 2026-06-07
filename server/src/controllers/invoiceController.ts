import { Request, Response } from 'express';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export const getInvoices = (req: Request, res: Response) => {
  const { firm_id } = req.params;
  try {
    const invoices = db.prepare(`
      SELECT invoices.*, clients.name as client_name 
      FROM invoices 
      JOIN clients ON invoices.client_id = clients.id 
      WHERE invoices.firm_id = ?
    `).all(firm_id);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createInvoice = (req: Request, res: Response) => {
  const { firm_id, client_id, invoice_number, amount, currency, due_date } = req.body;
  
  const id = uuidv4();
  try {
    const stmt = db.prepare(`
      INSERT INTO invoices (id, firm_id, client_id, invoice_number, amount, currency, due_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, firm_id, client_id, invoice_number, amount, currency || 'USD', due_date);
    
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const importInvoices = (req: Request, res: Response) => {
  const { firm_id } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const insert = db.prepare(`
      INSERT INTO invoices (id, firm_id, client_id, invoice_number, amount, currency, due_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((rows) => {
      for (const row of rows) {
        insert.run(
          uuidv4(),
          firm_id,
          row.client_id,
          row.invoice_number,
          row.amount,
          row.currency || 'USD',
          row.due_date
        );
      }
    });

    transaction(records);
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ message: `Successfully imported ${records.length} invoices` });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateInvoiceStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    db.prepare('UPDATE invoices SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: 'Invoice status updated' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
