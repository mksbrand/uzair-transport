import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import env from '../config/env';

export class EmailService {
  private static transporter = env.SMTP_HOST
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
      })
    : null;

  static async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      if (this.transporter) {
        const info = await this.transporter.sendMail({
          from: `Uzair Transport Office <${env.SMTP_FROM}>`,
          to,
          subject,
          html: htmlContent,
        });
        logger.info(`[EMAIL SERVICE] Email successfully dispatched to ${to}. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
      } else {
        logger.info(`[EMAIL SERVICE (Console Log)] Dispatch to ${to}`);
        logger.info(`[Subject]: ${subject}`);
        return { success: true, messageId: `local-${Date.now()}` };
      }
    } catch (err: any) {
      logger.error(`[EMAIL SERVICE] Failed to send email to ${to}:`, err);
      return { success: false, error: err.message };
    }
  }

  static async sendReceiptApprovalEmail(to: string, studentName: string, receiptNumber: string, routeName: string) {
    const subject = `Your Transport Fee Receipt #${receiptNumber} Has Been Approved!`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
        <h2 style="color: #0EA5E9;">Uzair Transport Pass Verification</h2>
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>Your transport fee receipt request for <strong>${routeName}</strong> has been officially approved by the Transport Office.</p>
        <p style="background: #F1F5F9; padding: 12px; border-radius: 8px; font-weight: bold; font-family: monospace;">
          Receipt Number: ${receiptNumber}
        </p>
        <p>You can now view your interactive 3D digital pass or download your official PDF receipt anytime on your student portal.</p>
        <br/>
        <p>Best regards,<br/><strong>Uzair Transport Office</strong></p>
      </div>
    `;
    return this.sendEmail(to, subject, html);
  }

  static async sendReceiptRejectionEmail(to: string, studentName: string, reason: string) {
    const subject = `Notice Regarding Your Transport Fee Request`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
        <h2 style="color: #F43F5E;">Uzair Transport Receipt Update</h2>
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>We are writing to inform you that your transport receipt submission could not be approved at this time.</p>
        <p style="background: #FFF1F2; color: #E11D48; padding: 12px; border-radius: 8px; border: 1px solid #FECDD3;">
          <strong>Reason:</strong> ${reason}
        </p>
        <p>Please log in to your student portal to re-submit your receipt or contact the Transport Office for assistance.</p>
        <br/>
        <p>Best regards,<br/><strong>Uzair Transport Office</strong></p>
      </div>
    `;
    return this.sendEmail(to, subject, html);
  }
}
