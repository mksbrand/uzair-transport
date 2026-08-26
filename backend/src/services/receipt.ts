import prisma from '../config/database';
import { generateReceiptNumber, generateVerificationCode } from '../utils/helpers';
import { QrService } from './qr';
import { EmailService } from './email';

export class ReceiptService {
  static async requestReceipt(studentId: string, routeId: string, semester: string, amount: number, paymentProofUrl?: string) {
    const existing = await prisma.receiptRequest.findFirst({
      where: {
        studentId,
        routeId,
        semester,
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    if (existing) {
      throw new Error(`Receipt request for semester ${semester} already exists with status: ${existing.status}`);
    }

    return await prisma.receiptRequest.create({
      data: {
        studentId,
        routeId,
        semester,
        amount,
        status: 'PENDING',
        paymentProofUrl,
      },
      include: { route: true },
    });
  }

  static async approveReceipt(requestId: string, adminUserId: string) {
    const request = await prisma.receiptRequest.findUnique({
      where: { id: requestId },
      include: { student: { include: { studentProfile: true } }, route: true },
    });

    if (!request) {
      throw new Error('Receipt request not found');
    }

    if (request.status === 'APPROVED') {
      throw new Error('Receipt request has already been approved');
    }

    const validUntilDate = new Date();
    validUntilDate.setMonth(validUntilDate.getMonth() + 6);

    const receiptNumber = generateReceiptNumber();
    const verificationCode = generateVerificationCode();

    const { encryptedQR, signedToken } = QrService.generateEncryptedQr({
      receiptId: receiptNumber,
      studentId: request.student.studentProfile?.studentId || request.studentId,
      routeId: request.routeId,
      validUntil: validUntilDate.toISOString(),
    });

    const [updatedReq, receipt] = await prisma.$transaction([
      prisma.receiptRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
          reviewedBy: adminUserId,
        },
      }),
      prisma.receipt.create({
        data: {
          receiptNumber,
          requestId: request.id,
          studentId: request.studentId,
          routeId: request.routeId,
          semester: request.semester,
          amount: request.amount,
          signedToken,
          verificationCode,
          encryptedQR,
          issuedAt: new Date(),
          validUntil: validUntilDate,
        },
        include: { route: true, student: { include: { studentProfile: true } } },
      }),
      prisma.notification.create({
        data: {
          userId: request.studentId,
          type: 'RECEIPT_APPROVED',
          title: 'Transport Receipt Approved',
          message: `Your transport receipt (${receiptNumber}) for ${request.semester} has been approved!`,
        },
      }),
    ]);

    // Send email notification asynchronously
    if (request.student?.email) {
      EmailService.sendReceiptApprovalEmail(
        request.student.email,
        request.student.fullName,
        receiptNumber,
        request.route.name
      ).catch(() => {});
    }

    return receipt;
  }

  static async rejectReceipt(requestId: string, adminUserId: string, reason: string) {
    const request = await prisma.receiptRequest.findUnique({
      where: { id: requestId },
      include: { student: true },
    });

    if (!request) throw new Error('Receipt request not found');

    const [updatedReq] = await prisma.$transaction([
      prisma.receiptRequest.update({
        where: { id: requestId },
        data: {
          status: 'REJECTED',
          reviewedAt: new Date(),
          reviewedBy: adminUserId,
          rejectionReason: reason,
        },
      }),
      prisma.notification.create({
        data: {
          userId: request.studentId,
          type: 'RECEIPT_REJECTED',
          title: 'Receipt Request Rejected',
          message: `Your receipt request for ${request.semester} was declined. Reason: ${reason}`,
        },
      }),
    ]);

    // Send email notification asynchronously
    if (request.student?.email) {
      EmailService.sendReceiptRejectionEmail(
        request.student.email,
        request.student.fullName,
        reason
      ).catch(() => {});
    }

    return updatedReq;
  }
}
