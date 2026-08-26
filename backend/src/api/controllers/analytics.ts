import { Response } from 'express';
import prisma from '../../config/database';
import { AuthenticatedRequest } from '../../types';

export class AnalyticsController {
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const routes = await prisma.transportRoute.findMany({
        include: {
          _count: { select: { students: true, receipts: true } },
        },
      });

      const routeRidership = routes.map((r) => ({
        name: r.name,
        studentsCount: r._count.students,
        receiptsCount: r._count.receipts,
        totalRevenue: r._count.receipts * r.price,
      }));

      const monthlyReceipts = await prisma.receipt.groupBy({
        by: ['issuedAt'],
        _sum: { amount: true },
        _count: { id: true },
      });

      return res.json({
        success: true,
        data: {
          routeRidership,
          monthlyReceipts,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
