import { Router } from 'express';
import { NotificationController } from '../controllers/notifications';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.use(authenticateJwt);
router.get('/', NotificationController.getStudentNotifications);
router.patch('/:id/read', NotificationController.markAsRead);

export default router;
