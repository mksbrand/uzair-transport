import { Router } from 'express';
import { StudentController } from '../controllers/student';
import { authenticateJwt, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticateJwt);

router.get('/profile', StudentController.getProfile);
router.patch('/profile', StudentController.updateProfile);
router.get('/routes', StudentController.getRoutes);
router.get('/buses', StudentController.getBuses);
router.get('/schedules', StudentController.getSchedules);

export default router;
