import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { authenticateJwt } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/admin/login', authLimiter, AuthController.adminLogin);
router.post('/google', AuthController.googleAuth);
router.get('/me', authenticateJwt, AuthController.getMe);

export default router;
