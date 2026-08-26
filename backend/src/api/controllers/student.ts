import { Response } from 'express';
import prisma from '../../config/database';
import { AuthenticatedRequest } from '../../types';

export class StudentController {
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          studentProfile: {
            include: { assignedRoute: true },
          },
          receipts: {
            include: { route: true },
            orderBy: { issuedAt: 'desc' },
          },
          receiptRequests: {
            include: { route: true },
            orderBy: { requestedAt: 'desc' },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'Student user record not found' });
      }

      return res.json({ success: true, data: user });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { fullName, phone, emergencyContact, address, assignedRouteId, department, semester } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          fullName,
          studentProfile: {
            upsert: {
              create: {
                studentId: `UZ-2024-${Math.floor(100 + Math.random() * 900)}`,
                department: department || 'General Sciences',
                semester: semester ? parseInt(semester, 10) : 1,
                phone,
                emergencyContact,
                address,
                assignedRouteId,
              },
              update: {
                phone,
                emergencyContact,
                address,
                assignedRouteId,
                department,
                semester: semester ? parseInt(semester, 10) : undefined,
              },
            },
          },
        },
        include: {
          studentProfile: {
            include: { assignedRoute: true },
          },
        },
      });

      return res.json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getRoutes(req: AuthenticatedRequest, res: Response) {
    try {
      const routes = await prisma.transportRoute.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      });
      return res.json({ success: true, data: routes });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getBuses(req: AuthenticatedRequest, res: Response) {
    try {
      const buses = await prisma.bus.findMany({
        where: { isActive: true },
        include: {
          dailySchedules: {
            include: { route: true },
            orderBy: { serviceDate: 'desc' },
            take: 10,
          },
        },
      });
      return res.json({ success: true, data: buses });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getSchedules(req: AuthenticatedRequest, res: Response) {
    try {
      const schedules = await prisma.dailyBusSchedule.findMany({
        include: {
          bus: true,
          route: true,
        },
        orderBy: { departureTime: 'asc' },
      });
      return res.json({ success: true, data: schedules });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
