import { User } from '../types';

export function saveAuthData(token: string, user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('uzair_auth_token', token);
    localStorage.setItem('uzair_user', JSON.stringify(user));
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('uzair_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('uzair_auth_token');
    localStorage.removeItem('uzair_user');
  }
}
