import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics';
import { authenticateJwt, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticateJwt);
router.use(requireRole(['ADMIN']));
router.get('/', AnalyticsController.getAnalytics);

export default router;
