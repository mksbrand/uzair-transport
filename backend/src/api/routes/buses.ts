import { Router } from 'express';
import { StudentController } from '../controllers/student';

const router = Router();

router.get('/', StudentController.getBuses);

export default router;
