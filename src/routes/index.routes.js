import { Router } from 'express';

import {
  askAgentQuestion,
} from '../controllers/agent.controller.js';

import {
  getHealthStatus,
} from '../controllers/health.controller.js';

import {
  getKnowledgeStatus,
} from '../controllers/knowledge.controller.js';

const router = Router();

router.get('/health', getHealthStatus);
router.get('/knowledge/status', getKnowledgeStatus);
router.post('/agent/questions', askAgentQuestion);

export default router;
