import { Router } from 'express';
import { AdminController } from '../controllers/admin';
import { NotificationController } from '../controllers/notifications';
import { AnalyticsController } from '../controllers/analytics';
import { authenticateJwt, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticateJwt);
router.use(requireRole(['ADMIN']));

// Dashboard Stats
router.get('/dashboard', AdminController.getDashboardStats);

// Students CRUD
router.get('/students', AdminController.getStudents);
router.patch('/students/:id', AdminController.updateStudent);

// Routes CRUD
router.get('/routes', AdminController.getRoutes);
router.post('/routes', AdminController.createRoute);
router.patch('/routes/:id', AdminController.updateRoute);
router.delete('/routes/:id', AdminController.deleteRoute);

// Buses CRUD
router.get('/buses', AdminController.getBuses);
router.post('/buses', AdminController.createBus);
router.patch('/buses/:id', AdminController.updateBus);
router.delete('/buses/:id', AdminController.deleteBus);

// Receipts Approval Queue
router.get('/receipts', AdminController.getReceiptRequests);
router.patch('/receipts/:id/approve', AdminController.approveReceiptRequest);
router.patch('/receipts/:id/reject', AdminController.rejectReceiptRequest);

// Notifications & Announcements
router.post('/notifications/send', NotificationController.sendNotification);
router.post('/announcements', NotificationController.createAnnouncement);
router.delete('/announcements/:id', NotificationController.deleteAnnouncement);

// Audit logs & analytics
router.get('/audit-logs', AdminController.getAuditLogs);
router.get('/analytics', AnalyticsController.getAnalytics);

// Settings
router.post('/password/change', AdminController.changePassword);

export default router;
