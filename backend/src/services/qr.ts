import { encryptText, decryptText } from '../utils/encryption';
import { generateSignedToken } from '../utils/jwt';

export class QrService {
  static generateEncryptedQr(data: {
    receiptId: string;
    studentId: string;
    routeId: string;
    validUntil: string;
  }): { encryptedQR: string; signedToken: string } {
    const payload = JSON.stringify({
      ...data,
      timestamp: Date.now(),
    });

    const encryptedQR = encryptText(payload);
    const signedToken = generateSignedToken(data);

    return { encryptedQR, signedToken };
  }

  static verifyEncryptedQr(encryptedQR: string): {
    isValid: boolean;
    data?: any;
    error?: string;
  } {
    try {
      const decrypted = decryptText(encryptedQR);
      const data = JSON.parse(decrypted);

      if (data.validUntil && new Date(data.validUntil) < new Date()) {
        return { isValid: false, error: 'Pass / Receipt expired' };
      }

      return { isValid: true, data };
    } catch (err: any) {
      return { isValid: false, error: 'Invalid signature or corrupt QR code' };
    }
  }
}
