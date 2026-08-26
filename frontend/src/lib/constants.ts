export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Uzair Transport';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const NAV_LINKS_STUDENT = [
  { label: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
  { label: 'Routes & Fees', href: '/student/routes', icon: 'MapPin' },
  { label: 'Daily Buses', href: '/student/transport', icon: 'Bus' },
  { label: 'Receipts', href: '/student/receipts', icon: 'Receipt' },
  { label: 'Digital Pass', href: '/student/pass', icon: 'QrCode' },
  { label: 'Notifications', href: '/student/notifications', icon: 'Bell' },
  { label: 'Profile', href: '/student/profile', icon: 'User' },
  { label: 'Help & Support', href: '/student/help', icon: 'HelpCircle' },
];

export const NAV_LINKS_ADMIN = [
  { label: 'Overview', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Students', href: '/admin/students', icon: 'Users' },
  { label: 'Routes', href: '/admin/routes', icon: 'Route' },
  { label: 'Buses Fleet', href: '/admin/buses', icon: 'Bus' },
  { label: 'Receipt Requests', href: '/admin/receipts', icon: 'FileText' },
  { label: 'Broadcasts', href: '/admin/notifications', icon: 'Send' },
  { label: 'Announcements', href: '/admin/announcements', icon: 'Megaphone' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: 'ShieldCheck' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
];
