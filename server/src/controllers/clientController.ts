import { Request, Response } from 'express';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

export const getClients = (req: Request, res: Response) => {
  const { firm_id } = req.params;
  try {
    const clients = db.prepare('SELECT * FROM clients WHERE firm_id = ?').all(firm_id);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createClient = (req: Request, res: Response) => {
  const { firm_id, name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const id = uuidv4();
  try {
    const stmt = db.prepare('INSERT INTO clients (id, firm_id, name, email, phone) VALUES (?, ?, ?, ?, ?)');
    stmt.run(id, firm_id, name, email, phone || null);
    
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateClient = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  
  try {
    const stmt = db.prepare('UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?');
    stmt.run(name, email, phone || null, id);
    res.json({ message: 'Client updated' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteClient = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM clients WHERE id = ?').run(id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
