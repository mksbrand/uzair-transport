import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const receiptRequestSchema = z.object({
  routeId: z.string().min(1, 'Please select a route'),
  semester: z.string().min(1, 'Please select a semester'),
  amount: z.number().min(1, 'Amount must be positive'),
});

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  emergencyContact: z.string().min(10, 'Emergency contact required'),
  address: z.string().min(5, 'Address required'),
  assignedRouteId: z.string().optional(),
});
