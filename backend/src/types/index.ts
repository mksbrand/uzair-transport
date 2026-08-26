import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'ADMIN';
  studentId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
