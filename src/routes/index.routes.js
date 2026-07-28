import { Router } from 'express';

import {
  getHealthStatus,
} from '../controllers/health.controller.js';

import {
  getKnowledgeStatus,
} from '../controllers/knowledge.controller.js';

const router = Router();

router.get('/health', getHealthStatus);
router.get('/knowledge/status', getKnowledgeStatus);

export default router;
