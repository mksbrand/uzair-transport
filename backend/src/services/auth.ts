import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/database';
import { generateToken } from '../utils/jwt';
import { UserPayload } from '../types';
import env from '../config/env';

const googleClient = env.GOOGLE_CLIENT_ID ? new OAuth2Client(env.GOOGLE_CLIENT_ID) : null;

export class AuthService {
  static async loginAdmin(email: string, pass: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'ADMIN' || !user.passwordHash) {
      throw new Error('Invalid email or admin credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid password credentials');
    }

    if (!user.isActive) {
      throw new Error('Admin account has been deactivated');
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: 'ADMIN',
    };

    const token = generateToken(payload);
    return { user, token };
  }

  /**
   * Verifies Google OAuth token or authenticates student profile
   */
  static async verifyAndAuthGoogle(idToken: string, fallbackProfile?: { email: string; fullName: string; googleId: string; profilePicture?: string }) {
    let email = fallbackProfile?.email;
    let fullName = fallbackProfile?.fullName;
    let googleId = fallbackProfile?.googleId;
    let profilePicture = fallbackProfile?.profilePicture;

    if (googleClient && idToken && !idToken.startsWith('dev_mock_')) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken,
          audience: env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
          email = payload.email || email;
          fullName = payload.name || fullName;
          googleId = payload.sub || googleId;
          profilePicture = payload.picture || profilePicture;
        }
      } catch (err: any) {
        if (env.NODE_ENV === 'production') {
          throw new Error('Invalid or expired Google OAuth ID Token');
        }
      }
    }

    if (!email || !googleId) {
      throw new Error('Google authentication profile details missing');
    }

    return this.handleGoogleAuth(email, fullName || 'University Student', googleId, profilePicture);
  }

  static async handleGoogleAuth(email: string, fullName: string, googleId: string, profilePicture?: string) {
    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
      include: { studentProfile: true },
    });

    if (!user) {
      const randomStudentId = `UZ-2024-${Math.floor(100 + Math.random() * 900)}`;
      user = await prisma.user.create({
        data: {
          email,
          fullName,
          googleId,
          profilePicture,
          role: 'STUDENT',
          studentProfile: {
            create: {
              studentId: randomStudentId,
              department: 'Computer Science',
              semester: 1,
            },
          },
        },
        include: { studentProfile: true },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId, profilePicture: profilePicture || user.profilePicture },
        include: { studentProfile: true },
      });
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as any,
      studentId: user.studentProfile?.studentId,
    };

    const token = generateToken(payload);
    return { user, token };
  }
}
