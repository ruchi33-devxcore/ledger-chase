import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

interface EmailData {
  client_name: string;
  firm_name: string;
  invoice_id: string;
  amount: string;
  due_date: string;
  payment_link: string;
  firm_email: string;
}

export const sendReminderEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: EmailData
) => {
  const templatePath = path.resolve(__dirname, '../../../../email-templates', templateName);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders
  html = html.replace(/{{client_name}}/g, data.client_name);
  html = html.replace(/{{firm_name}}/g, data.firm_name);
  html = html.replace(/{{invoice_id}}/g, data.invoice_id);
  html = html.replace(/{{amount}}/g, data.amount);
  html = html.replace(/{{due_date}}/g, data.due_date);
  html = html.replace(/{{payment_link}}/g, data.payment_link);
  html = html.replace(/{{firm_email}}/g, data.firm_email);

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_your')) {
    console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`);
    console.log(`[MOCK EMAIL] Body snippet: ${html.substring(0, 100)}...`);
    return { data: { id: 'mock_id' }, error: null };
  }

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use default for testing if not verified
      to: [to],
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
