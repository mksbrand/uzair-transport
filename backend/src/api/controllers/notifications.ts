import { Response } from 'express';
import prisma from '../../config/database';
import { AuthenticatedRequest } from '../../types';

export class NotificationController {
  static async getStudentNotifications(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      const announcements = await prisma.announcement.findMany({
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      });

      return res.json({
        success: true,
        data: {
          notifications,
          announcements,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async markAsRead(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const notification = await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
      return res.json({ success: true, data: notification });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async sendNotification(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId, type, title, message } = req.body;

      if (userId) {
        const notif = await prisma.notification.create({
          data: {
            userId,
            type: type || 'GENERAL',
            title,
            message,
          },
        });
        return res.status(201).json({ success: true, message: 'Notification sent', data: notif });
      }

      // Broadcast to all active students
      const students = await prisma.user.findMany({
        where: { role: 'STUDENT', isActive: true },
        select: { id: true },
      });

      const createNotifs = students.map((s) => ({
        userId: s.id,
        type: type || 'GENERAL',
        title,
        message,
      }));

      await prisma.notification.createMany({
        data: createNotifs,
      });

      return res.status(201).json({
        success: true,
        message: `Notification broadcasted to ${students.length} students`,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async createAnnouncement(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, content, isPinned } = req.body;
      const adminName = req.user?.fullName || 'Administrator';

      const announcement = await prisma.announcement.create({
        data: {
          title,
          content,
          isPinned: Boolean(isPinned),
          createdBy: adminName,
        },
      });

      return res.status(201).json({ success: true, message: 'Announcement published', data: announcement });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getAnnouncements(req: AuthenticatedRequest, res: Response) {
    try {
      const announcements = await prisma.announcement.findMany({
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      });
      return res.json({ success: true, data: announcements });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async deleteAnnouncement(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.announcement.delete({ where: { id } });
      return res.json({ success: true, message: 'Announcement deleted' });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
}
