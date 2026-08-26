import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
import { AuditService } from '../../services/audit';

export const auditMiddleware = (action: string, objectType: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const objectId = req.params.id || req.body.id || 'N/A';
        const ip = req.ip || req.socket.remoteAddress;
        AuditService.logAction(req.user.id, action, objectType, objectId, req.body, ip);
      }
      return originalSend.call(this, body);
    };
    next();
  };
};
