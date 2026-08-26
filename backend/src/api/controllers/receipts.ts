import { Response } from 'express';
import prisma from '../../config/database';
import { ReceiptService } from '../../services/receipt';
import { QrService } from '../../services/qr';
import { PdfService } from '../../services/pdf';
import { AuthenticatedRequest } from '../../types';

export class ReceiptController {
  static async getStudentReceipts(req: AuthenticatedRequest, res: Response) {
    try {
      const studentId = req.user?.id;
      const receipts = await prisma.receipt.findMany({
        where: { studentId },
        include: {
          route: true,
          request: true,
        },
        orderBy: { issuedAt: 'desc' },
      });

      const requests = await prisma.receiptRequest.findMany({
        where: { studentId },
        include: { route: true },
        orderBy: { requestedAt: 'desc' },
      });

      return res.json({
        success: true,
        data: {
          receipts,
          requests,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async requestReceipt(req: AuthenticatedRequest, res: Response) {
    try {
      const studentId = req.user?.id;
      if (!studentId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const { routeId, semester, amount } = req.body;
      if (!routeId || !semester || !amount) {
        return res.status(400).json({ success: false, error: 'routeId, semester, and amount are required' });
      }

      const paymentProofUrl = req.file ? `/uploads/receipts/${req.file.filename}` : undefined;

      const request = await ReceiptService.requestReceipt(
        studentId,
        routeId,
        semester,
        Number(amount),
        paymentProofUrl
      );

      return res.status(201).json({
        success: true,
        message: 'Receipt request submitted successfully. Pending admin approval.',
        data: request,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getReceiptById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const receipt = await prisma.receipt.findFirst({
        where: {
          OR: [{ id }, { receiptNumber: id }, { verificationCode: id }],
        },
        include: {
          student: { include: { studentProfile: true } },
          route: true,
          request: true,
        },
      });

      if (!receipt) {
        return res.status(404).json({ success: false, error: 'Receipt record not found' });
      }

      return res.json({ success: true, data: receipt });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async downloadReceiptPdf(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const receipt = await prisma.receipt.findFirst({
        where: { OR: [{ id }, { receiptNumber: id }] },
        include: {
          student: { include: { studentProfile: true } },
          route: true,
        },
      });

      if (!receipt) {
        return res.status(404).json({ success: false, error: 'Receipt not found' });
      }

      const pdfBuffer = await PdfService.generateReceiptPdfBuffer(receipt);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=Uzair_Transport_Receipt_${receipt.receiptNumber}.pdf`);
      return res.send(pdfBuffer);
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async verifyQr(req: AuthenticatedRequest, res: Response) {
    try {
      const { encryptedQR, verificationCode } = req.body;
      if (verificationCode) {
        const receipt = await prisma.receipt.findUnique({
          where: { verificationCode },
          include: { student: { include: { studentProfile: true } }, route: true },
        });

        if (!receipt) {
          return res.status(404).json({ success: false, isValid: false, message: 'Invalid verification code' });
        }

        const isExpired = new Date(receipt.validUntil) < new Date();
        return res.json({
          success: true,
          isValid: !receipt.isRevoked && !isExpired,
          receipt,
          status: receipt.isRevoked ? 'REVOKED' : isExpired ? 'EXPIRED' : 'VALID',
        });
      }

      if (encryptedQR) {
        const verification = QrService.verifyEncryptedQr(encryptedQR);
        return res.json({
          success: true,
          ...verification,
        });
      }

      return res.status(400).json({ success: false, error: 'Provide encryptedQR or verificationCode' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
