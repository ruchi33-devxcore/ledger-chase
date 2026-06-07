import cron from 'node-cron';
import db from '../db/index.js';
import { sendReminderEmail } from './emailService.js';
import { v4 as uuidv4 } from 'uuid';

export const initCronJobs = () => {
  // Run every day at 08:00
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily follow-up cron job...');
    await processReminders();
  });
  
  // Also run once on startup for development testing (optional, but helpful)
  if (process.env.NODE_ENV === 'development') {
    console.log('Running initial follow-up check...');
    processReminders();
  }
};

export const processReminders = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Helper to format date for SQLite (YYYY-MM-DD)
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);

  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);

  const remindersConfig = [
    {
      type: 'friendly',
      template: 'friendly-reminder.html',
      subject: 'Payment Reminder: Upcoming Due Date',
      condition: `due_date = '${formatDate(threeDaysFromNow)}'`
    },
    {
      type: 'firm',
      template: 'firm-reminder.html',
      subject: 'Payment Due Today',
      condition: `due_date = '${formatDate(today)}'`
    },
    {
      type: 'urgent',
      template: 'urgent-escalation.html',
      subject: 'URGENT: Invoice Overdue',
      condition: `due_date = '${formatDate(fiveDaysAgo)}'`
    }
  ];

  for (const config of remindersConfig) {
    const invoices = db.prepare(`
      SELECT 
        invoices.*, 
        clients.name as client_name, 
        clients.email as client_email,
        firms.name as firm_name,
        firms.email as firm_email
      FROM invoices
      JOIN clients ON invoices.client_id = clients.id
      JOIN firms ON invoices.firm_id = firms.id
      WHERE ${config.condition}
      AND invoices.status != 'paid'
      AND invoices.id NOT IN (
        SELECT invoice_id FROM reminders_log WHERE status = '${config.type}'
      )
    `).all() as any[];

    for (const inv of invoices) {
      try {
        await sendReminderEmail(inv.client_email, config.subject, config.template, {
          client_name: inv.client_name,
          firm_name: inv.firm_name,
          invoice_id: inv.invoice_number,
          amount: `${inv.currency} ${inv.amount}`,
          due_date: inv.due_date,
          payment_link: `${process.env.CLIENT_URL || 'http://localhost:5173'}/portal/${inv.id}`, // Client portal URL
          firm_email: inv.firm_email
        });

        // Log the reminder
        db.prepare(`
          INSERT INTO reminders_log (id, invoice_id, type, status)
          VALUES (?, ?, ?, ?)
        `).run(uuidv4(), inv.id, 'email', config.type);

        console.log(`Sent ${config.type} reminder for invoice ${inv.invoice_number} (${inv.client_email})`);
      } catch (error) {
        console.error(`Failed to send ${config.type} reminder for invoice ${inv.id}:`, error);
      }
    }
  }
};
