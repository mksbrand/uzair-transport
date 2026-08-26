import crypto from 'crypto';
import env from '../config/env';

const ALGORITHM = 'aes-256-cbc';
// Ensure key is 32 bytes
const KEY = crypto.scryptSync(env.ENCRYPTION_KEY, 'salt', 32);

export const encryptText = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

export const decryptText = (encryptedData: string): string => {
  try {
    const parts = encryptedData.split(':');
    if (parts.length !== 2) throw new Error('Invalid encrypted payload');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    throw new Error('Decryption failed or invalid key');
  }
};
