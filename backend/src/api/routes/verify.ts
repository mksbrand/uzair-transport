import { Router } from 'express';
import { ReceiptController } from '../controllers/receipts';

const router = Router();

router.post('/', ReceiptController.verifyQr);

export default router;
