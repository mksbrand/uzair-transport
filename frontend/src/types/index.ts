export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  googleId?: string;
  profilePicture?: string;
  role: UserRole;
  isActive: boolean;
  studentProfile?: StudentProfile;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentId: string;
  department: string;
  semester: number;
  phone?: string;
  emergencyContact?: string;
  address?: string;
  assignedRouteId?: string;
  assignedRoute?: TransportRoute;
}

export interface TransportRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: string | string[];
  semester: string;
  price: number;
  busCount: number;
  isActive: boolean;
  createdAt?: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  registrationNumber: string;
  driverName?: string;
  driverPhone?: string;
  totalSeats: number;
  isActive: boolean;
  notes?: string;
  dailySchedules?: DailyBusSchedule[];
}

export interface DailyBusSchedule {
  id: string;
  busId: string;
  routeId: string;
  serviceDate: string;
  departureTime: string;
  arrivalTime: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DELAYED';
  occupiedSeats: number;
  notes?: string;
  bus?: Bus;
  route?: TransportRoute;
}

export interface ReceiptRequest {
  id: string;
  studentId: string;
  routeId: string;
  semester: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  route?: TransportRoute;
  student?: User;
  receipt?: Receipt;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  requestId: string;
  studentId: string;
  routeId: string;
  semester: string;
  amount: number;
  signedToken: string;
  verificationCode: string;
  encryptedQR: string;
  isRevoked: boolean;
  issuedAt: string;
  validUntil: string;
  route?: TransportRoute;
  student?: User;
  request?: ReceiptRequest;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'FEE_REMINDER' | 'RECEIPT_APPROVED' | 'RECEIPT_REJECTED' | 'BUS_DELAY' | 'HOLIDAY' | 'GENERAL' | 'EMERGENCY';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdBy: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  objectType: string;
  objectId: string;
  changes?: string;
  ipAddress?: string;
  createdAt: string;
  actor?: User;
}
