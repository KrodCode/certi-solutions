import { rateLimit } from 'express-rate-limit';

import {
  environment,
} from '../config/environment.js';

export const agentRateLimiter = rateLimit({
  windowMs: environment.agentRateLimitWindowMs,
  limit: environment.agentRateLimitMax,
  standardHeaders: 'draft-8',
  legacyHeaders: false,

  message: {
    status: 'error',
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message:
        'Se alcanzó el límite temporal de consultas. Intenta nuevamente más tarde.',
    },
  },
});
