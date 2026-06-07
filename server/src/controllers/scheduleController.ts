import { Request, Response } from 'express';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

export const getSchedules = (req: Request, res: Response) => {
  const { firm_id } = req.params;
  try {
    const schedules = db.prepare('SELECT * FROM follow_up_schedules WHERE firm_id = ?').all(firm_id);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createSchedule = (req: Request, res: Response) => {
  const { firm_id, name, config } = req.body;
  
  const id = uuidv4();
  try {
    const stmt = db.prepare('INSERT INTO follow_up_schedules (id, firm_id, name, config) VALUES (?, ?, ?, ?)');
    stmt.run(id, firm_id, name, typeof config === 'string' ? config : JSON.stringify(config));
    
    const schedule = db.prepare('SELECT * FROM follow_up_schedules WHERE id = ?').get(id);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateSchedule = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, config } = req.body;
  
  try {
    const stmt = db.prepare('UPDATE follow_up_schedules SET name = ?, config = ? WHERE id = ?');
    stmt.run(name, typeof config === 'string' ? config : JSON.stringify(config), id);
    res.json({ message: 'Schedule updated' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteSchedule = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM follow_up_schedules WHERE id = ?').run(id);
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
