import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db/index.js';
import routes from './routes/index.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { initCronJobs } from './services/cronService.js';
import portalRoutes from './routes/portalRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Public Portal Routes (Bypass Auth)
app.use('/api/portal', portalRoutes);

// Clerk Authentication Middleware
app.use(ClerkExpressWithAuth() as any);

// Initialize Database
initDb();

// Initialize Cron Jobs
initCronJobs();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
