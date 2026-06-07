import { Request, Response } from 'express';
import db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

export const createFirm = (req: Request, res: Response) => {
  const { name } = req.body;
  const owner_id = req.auth.userId;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const id = uuidv4();
  try {
    const stmt = db.prepare('INSERT INTO firms (id, name, owner_id) VALUES (?, ?, ?)');
    stmt.run(id, name, owner_id);
    
    const firm = db.prepare('SELECT * FROM firms WHERE id = ?').get(id);
    res.status(201).json(firm);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMyFirm = (req: Request, res: Response) => {
  const owner_id = req.auth.userId;
  
  try {
    const firm = db.prepare('SELECT * FROM firms WHERE owner_id = ?').get(owner_id);
    if (!firm) {
      return res.status(404).json({ error: 'Firm not found' });
    }
    res.json(firm);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getStats = (req: Request, res: Response) => {
  const owner_id = req.auth.userId;
  
  try {
    const firm = db.prepare('SELECT id FROM firms WHERE owner_id = ?').get(owner_id);
    if (!firm) {
      return res.status(404).json({ error: 'Firm not found' });
    }

    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_invoices,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount,
        SUM(CASE WHEN status = 'overdue' THEN amount ELSE 0 END) as overdue_amount,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as paid_amount,
        COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_count
      FROM invoices 
      WHERE firm_id = ?
    `).get(firm.id) as any;

    res.json({
      total_invoices: stats.total_invoices || 0,
      pending_amount: stats.pending_amount || 0,
      overdue_amount: stats.overdue_amount || 0,
      paid_amount: stats.paid_amount || 0,
      overdue_count: stats.overdue_count || 0
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

