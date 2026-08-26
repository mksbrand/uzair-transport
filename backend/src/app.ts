import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { httpLogger } from './api/middleware/logger';
import { errorHandler } from './api/middleware/errorHandler';
import { apiLimiter } from './api/middleware/rateLimiter';

import authRoutes from './api/routes/auth';
import studentRoutes from './api/routes/student';
import routesRoutes from './api/routes/routes';
import busesRoutes from './api/routes/buses';
import receiptsRoutes from './api/routes/receipts';
import notificationsRoutes from './api/routes/notifications';
import announcementsRoutes from './api/routes/announcements';
import adminRoutes from './api/routes/admin';
import analyticsRoutes from './api/routes/analytics';
import verifyRoutes from './api/routes/verify';

const app = express();

// Core Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(httpLogger);

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Base Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Uzair Transport API',
    timestamp: new Date().toISOString(),
    version: '1.0.0-beta',
  });
});

// API v1 Routes
const v1Router = express.Router();
v1Router.use(apiLimiter);

v1Router.use('/auth', authRoutes);
v1Router.use('/student', studentRoutes);
v1Router.use('/routes', routesRoutes);
v1Router.use('/buses', busesRoutes);
v1Router.use('/receipts', receiptsRoutes);
v1Router.use('/notifications', notificationsRoutes);
v1Router.use('/announcements', announcementsRoutes);
v1Router.use('/admin', adminRoutes);
v1Router.use('/analytics', analyticsRoutes);
v1Router.use('/verify', verifyRoutes);

app.use('/api/v1', v1Router);

// Global Error Handler
app.use(errorHandler);

export default app;
