import { Router } from 'express';
import { StudentController } from '../controllers/student';

const router = Router();

router.get('/', StudentController.getRoutes);

export default router;
