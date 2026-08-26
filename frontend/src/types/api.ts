export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'STUDENT' | 'ADMIN';
    profilePicture?: string;
    studentProfile?: any;
  };
}
