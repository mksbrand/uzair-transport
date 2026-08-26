import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and a number'),
});

export const routeSchema = z.object({
  name: z.string().min(3, 'Route name must be at least 3 characters'),
  origin: z.string().min(2, 'Origin location required'),
  destination: z.string().min(2, 'Destination location required'),
  stops: z.array(z.string()).min(1, 'At least one stop required'),
  semester: z.string().min(1, 'Semester string required'),
  price: z.number().positive('Price must be a positive number'),
  busCount: z.number().int().nonnegative().optional(),
});

export const busSchema = z.object({
  busNumber: z.string().min(2, 'Bus number/plate required'),
  registrationNumber: z.string().min(2, 'Registration number required'),
  driverName: z.string().optional(),
  driverPhone: z.string().optional(),
  totalSeats: z.number().int().positive().default(50),
  notes: z.string().optional(),
});

export const receiptRequestSchema = z.object({
  routeId: z.string().min(1, 'Route ID is required'),
  semester: z.string().min(1, 'Semester is required'),
  amount: z.number().positive('Amount must be positive'),
});

export const announcementSchema = z.object({
  title: z.string().min(3, 'Title required'),
  content: z.string().min(5, 'Content required'),
  isPinned: z.boolean().optional(),
});

export const notificationSchema = z.object({
  userId: z.string().optional(), // Nullable for broadcast
  type: z.enum(['FEE_REMINDER', 'RECEIPT_APPROVED', 'RECEIPT_REJECTED', 'BUS_DELAY', 'HOLIDAY', 'GENERAL', 'EMERGENCY']),
  title: z.string().min(3),
  message: z.string().min(5),
});
