import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PORT: parseInt(process.env.API_PORT || '3001', 10),
  API_URL: process.env.API_URL || 'http://localhost:3001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'uzair_transport_jwt_super_secret_key_2026',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'uzair_transport_nextauth_secret_key_2026',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'uzair_transport_aes_256_secret_key_2026_32bytes!!',
  MOCK_EMAIL_ENABLED: process.env.MOCK_EMAIL_ENABLED === 'true',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@uzair-transport.edu.pk',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
};

export default env;
