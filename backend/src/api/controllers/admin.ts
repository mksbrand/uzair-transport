import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../config/database';
import { ReceiptService } from '../../services/receipt';
import { AuthenticatedRequest } from '../../types';

export class AdminController {
  static async getDashboardStats(req: AuthenticatedRequest, res: Response) {
    try {
      const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
      const activeRoutes = await prisma.transportRoute.count({ where: { isActive: true } });
      const activeBuses = await prisma.bus.count({ where: { isActive: true } });
      const pendingReceipts = await prisma.receiptRequest.count({ where: { status: 'PENDING' } });
      const approvedReceipts = await prisma.receiptRequest.count({ where: { status: 'APPROVED' } });
      
      const totalRevenueAggregate = await prisma.receipt.aggregate({
        _sum: { amount: true },
      });

      const recentApprovals = await prisma.receipt.findMany({
        take: 5,
        orderBy: { issuedAt: 'desc' },
        include: {
          student: true,
          route: true,
        },
      });

      return res.json({
        success: true,
        data: {
          stats: {
            totalStudents,
            activeRoutes,
            activeBuses,
            pendingReceipts,
            approvedReceipts,
            totalRevenue: totalRevenueAggregate._sum.amount || 0,
          },
          recentApprovals,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Students Management
  static async getStudents(req: AuthenticatedRequest, res: Response) {
    try {
      const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        include: {
          studentProfile: {
            include: { assignedRoute: true },
          },
          receipts: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ success: true, data: students });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateStudent(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { fullName, isActive, department, semester, assignedRouteId, phone } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: {
          fullName,
          isActive,
          studentProfile: {
            update: {
              department,
              semester: semester ? Number(semester) : undefined,
              assignedRouteId,
              phone,
            },
          },
        },
        include: { studentProfile: { include: { assignedRoute: true } } },
      });

      return res.json({ success: true, message: 'Student updated', data: user });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Route Management
  static async getRoutes(req: AuthenticatedRequest, res: Response) {
    try {
      const routes = await prisma.transportRoute.findMany({
        include: {
          _count: { select: { students: true, dailySchedules: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ success: true, data: routes });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async createRoute(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, origin, destination, stops, semester, price, busCount } = req.body;
      const route = await prisma.transportRoute.create({
        data: {
          name,
          origin,
          destination,
          stops: typeof stops === 'string' ? stops : JSON.stringify(stops || []),
          semester: semester || 'Fall 2026',
          price: Number(price),
          busCount: busCount ? Number(busCount) : 1,
        },
      });
      return res.status(201).json({ success: true, message: 'Route created', data: route });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateRoute(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, origin, destination, stops, semester, price, busCount, isActive } = req.body;

      const route = await prisma.transportRoute.update({
        where: { id },
        data: {
          name,
          origin,
          destination,
          stops: stops ? (typeof stops === 'string' ? stops : JSON.stringify(stops)) : undefined,
          semester,
          price: price !== undefined ? Number(price) : undefined,
          busCount: busCount !== undefined ? Number(busCount) : undefined,
          isActive,
        },
      });
      return res.json({ success: true, message: 'Route updated', data: route });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async deleteRoute(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.transportRoute.delete({ where: { id } });
      return res.json({ success: true, message: 'Route deleted successfully' });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Bus Management
  static async getBuses(req: AuthenticatedRequest, res: Response) {
    try {
      const buses = await prisma.bus.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ success: true, data: buses });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async createBus(req: AuthenticatedRequest, res: Response) {
    try {
      const { busNumber, registrationNumber, driverName, driverPhone, totalSeats, notes } = req.body;
      const bus = await prisma.bus.create({
        data: {
          busNumber,
          registrationNumber,
          driverName,
          driverPhone,
          totalSeats: totalSeats ? Number(totalSeats) : 50,
          notes,
        },
      });
      return res.status(201).json({ success: true, message: 'Bus registered', data: bus });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateBus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { busNumber, registrationNumber, driverName, driverPhone, totalSeats, isActive, notes } = req.body;

      const bus = await prisma.bus.update({
        where: { id },
        data: {
          busNumber,
          registrationNumber,
          driverName,
          driverPhone,
          totalSeats: totalSeats !== undefined ? Number(totalSeats) : undefined,
          isActive,
          notes,
        },
      });
      return res.json({ success: true, message: 'Bus updated', data: bus });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async deleteBus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.bus.delete({ where: { id } });
      return res.json({ success: true, message: 'Bus removed' });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Receipts Admin
  static async getReceiptRequests(req: AuthenticatedRequest, res: Response) {
    try {
      const requests = await prisma.receiptRequest.findMany({
        include: {
          student: { include: { studentProfile: true } },
          route: true,
          receipt: true,
        },
        orderBy: { requestedAt: 'desc' },
      });
      return res.json({ success: true, data: requests });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async approveReceiptRequest(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const adminId = req.user?.id;
      if (!adminId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const receipt = await ReceiptService.approveReceipt(id, adminId);
      return res.json({ success: true, message: 'Receipt request approved successfully', data: receipt });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async rejectReceiptRequest(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const adminId = req.user?.id;
      if (!adminId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const updatedReq = await ReceiptService.rejectReceipt(id, adminId, reason || 'Incomplete documentation');
      return res.json({ success: true, message: 'Receipt request rejected', data: updatedReq });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Audit Logs
  static async getAuditLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const logs = await prisma.auditLog.findMany({
        include: { actor: true },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return res.json({ success: true, data: logs });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Change Password
  static async changePassword(req: AuthenticatedRequest, res: Response) {
    try {
      const adminId = req.user?.id;
      const { oldPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({ where: { id: adminId } });
      if (!user || !user.passwordHash) {
        return res.status(404).json({ success: false, error: 'User record not found' });
      }

      const matches = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!matches) {
        return res.status(400).json({ success: false, error: 'Incorrect current password' });
      }

      const newHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: adminId },
        data: { passwordHash: newHash },
      });

      return res.json({ success: true, message: 'Admin password changed successfully' });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
}
