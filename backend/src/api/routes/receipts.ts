import { Router } from 'express';
import { ReceiptController } from '../controllers/receipts';
import { authenticateJwt } from '../middleware/auth';
import { uploadPaymentProof } from '../middleware/upload';

const router = Router();

router.post('/verify', ReceiptController.verifyQr);

router.use(authenticateJwt);
router.get('/', ReceiptController.getStudentReceipts);
router.post('/request', uploadPaymentProof.single('paymentProof'), ReceiptController.requestReceipt);
router.get('/:id', ReceiptController.getReceiptById);
router.get('/:id/pdf', ReceiptController.downloadReceiptPdf);

export default router;
