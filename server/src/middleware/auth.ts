import { RequireAuthProp, StrictAuthProp, ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

export const requireAuth = ClerkExpressRequireAuth();
