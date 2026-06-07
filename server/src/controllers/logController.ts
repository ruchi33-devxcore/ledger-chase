import { Request, Response } from 'express';
import db from '../db';

export const getLogs = (req: Request, res: Response) => {
  const { firm_id } = req.params;
  try {
    const logs = db.prepare(`
      SELECT reminders_log.*, invoices.invoice_number, clients.name as client_name
      FROM reminders_log
      JOIN invoices ON reminders_log.invoice_id = invoices.id
      JOIN clients ON invoices.client_id = clients.id
      WHERE invoices.firm_id = ?
      ORDER BY sent_at DESC
    `).all(firm_id);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
