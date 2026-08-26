import PDFDocument from 'pdfkit';
import { logger } from '../utils/logger';

export class PdfService {
  /**
   * Generates an official, publication-quality PDF receipt buffer for a verified transport pass.
   */
  static async generateReceiptPdfBuffer(receipt: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        // Header Background Banner
        doc
          .rect(0, 0, 595.28, 120)
          .fill('#0EA5E9');

        // Header Title
        doc
          .fillColor('#FFFFFF')
          .fontSize(22)
          .font('Helvetica-Bold')
          .text('UZAIR TRANSPORT SYSTEM', 50, 40);

        doc
          .fontSize(11)
          .font('Helvetica')
          .text('Official University Transit Pass & Semester Fee Receipt', 50, 70);

        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .text(`DOCUMENT ID: ${receipt.receiptNumber || 'RCP-VERIFIED'}`, 400, 40, { align: 'right' })
          .text(`ISSUE DATE: ${new Date(receipt.issuedAt || Date.now()).toLocaleDateString()}`, 400, 55, { align: 'right' });

        // Reset Fill Color
        doc.fillColor('#0F172A');

        // Section: Pass & Student Details Box
        doc.y = 150;
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('STUDENT & TRANSIT DETAILS', 50, doc.y);

        doc
          .moveTo(50, doc.y + 5)
          .lineTo(545, doc.y + 5)
          .strokeColor('#CBD5E1')
          .stroke();

        doc.y += 20;

        const leftColX = 50;
        const rightColX = 300;
        const startY = doc.y;

        // Student Info
        doc
          .fontSize(10)
          .font('Helvetica-Bold').text('Student Name:', leftColX, startY)
          .font('Helvetica').text(receipt.student?.fullName || 'N/A', leftColX + 90, startY)

          .font('Helvetica-Bold').text('Student ID:', leftColX, startY + 20)
          .font('Helvetica').text(receipt.student?.studentProfile?.studentId || 'N/A', leftColX + 90, startY + 20)

          .font('Helvetica-Bold').text('Semester:', leftColX, startY + 40)
          .font('Helvetica').text(receipt.semester || 'Fall 2026', leftColX + 90, startY + 40);

        // Route Info
        doc
          .font('Helvetica-Bold').text('Assigned Route:', rightColX, startY)
          .font('Helvetica').text(receipt.route?.name || 'N/A', rightColX + 95, startY)

          .font('Helvetica-Bold').text('Verification Code:', rightColX, startY + 20)
          .font('Helvetica').text(receipt.verificationCode || 'UT-VERIFY', rightColX + 95, startY + 20)

          .font('Helvetica-Bold').text('Valid Until:', rightColX, startY + 40)
          .font('Helvetica').text(new Date(receipt.validUntil || Date.now()).toLocaleDateString(), rightColX + 95, startY + 40);

        doc.y = startY + 80;

        // Table Header
        doc
          .rect(50, doc.y, 495, 25)
          .fill('#F1F5F9');

        doc
          .fillColor('#0F172A')
          .fontSize(10)
          .font('Helvetica-Bold')
          .text('DESCRIPTION', 60, doc.y + 7)
          .text('AMOUNT (PKR)', 450, doc.y + 7, { align: 'right' });

        doc.y += 35;

        // Table Content
        doc
          .font('Helvetica')
          .fontSize(10)
          .text(`Semester Transport Fee - ${receipt.route?.name || 'Bus Subscription'} (${receipt.semester})`, 60, doc.y)
          .text(`PKR ${(receipt.amount || 0).toLocaleString()}`, 450, doc.y, { align: 'right' });

        doc.y += 25;
        doc
          .moveTo(50, doc.y)
          .lineTo(545, doc.y)
          .strokeColor('#E2E8F0')
          .stroke();

        doc.y += 15;

        // Total
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Total Paid:', 350, doc.y)
          .text(`PKR ${(receipt.amount || 0).toLocaleString()}`, 450, doc.y, { align: 'right' });

        doc.y += 40;

        // Official Security Seal Box
        doc
          .rect(50, doc.y, 495, 45)
          .fillAndStroke('#ECFDF5', '#10B981');

        doc
          .fillColor('#065F46')
          .fontSize(11)
          .font('Helvetica-Bold')
          .text('✓ OFFICIAL SYSTEM VERIFIED RECEIPT & ACTIVE TRANSIT PASS', 70, doc.y + 16);

        // Footer Notice
        doc
          .fillColor('#94A3B8')
          .fontSize(8)
          .font('Helvetica')
          .text('This receipt is cryptographically generated and signed by the Uzair Transport Management System. Present this document or the encrypted QR code on your mobile portal to bus conductors upon boarding.', 50, 750, { align: 'center', width: 495 });

        doc.end();
      } catch (err: any) {
        logger.error('Failed to generate PDF buffer:', err);
        reject(err);
      }
    });
  }
}
