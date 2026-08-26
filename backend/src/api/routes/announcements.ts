import { Router } from 'express';
import { NotificationController } from '../controllers/notifications';

const router = Router();

router.get('/', NotificationController.getAnnouncements);

export default router;
