import prisma from '../config/database';
import { logger } from '../utils/logger';

export class AuditService {
  static async logAction(
    actorId: string,
    action: string,
    objectType: string,
    objectId: string,
    changes?: any,
    ipAddress?: string
  ) {
    try {
      return await prisma.auditLog.create({
        data: {
          actorId,
          action,
          objectType,
          objectId,
          changes: changes ? JSON.stringify(changes) : null,
          ipAddress: ipAddress || '127.0.0.1',
        },
      });
    } catch (err) {
      logger.error('Failed to create audit log entry', err);
    }
  }
}
