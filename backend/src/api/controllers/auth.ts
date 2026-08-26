import { Request, Response } from 'express';
import { AuthService } from '../../services/auth';
import { adminLoginSchema } from '../../utils/validation';
import { AuthenticatedRequest } from '../../types';

export class AuthController {
  static async adminLogin(req: Request, res: Response) {
    try {
      const validated = adminLoginSchema.parse(req.body);
      const { user, token } = await AuthService.loginAdmin(validated.email, validated.password);
      
      return res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            profilePicture: user.profilePicture,
          },
        },
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async googleAuth(req: Request, res: Response) {
    try {
      const { idToken, email, fullName, googleId, profilePicture } = req.body;
      
      const { user, token } = await AuthService.verifyAndAuthGoogle(idToken, {
        email,
        fullName: fullName || 'University Student',
        googleId: googleId || `g-${Date.now()}`,
        profilePicture,
      });

      return res.json({
        success: true,
        message: 'Student Google authentication successful',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            profilePicture: user.profilePicture,
            studentProfile: user.studentProfile,
          },
        },
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    return res.json({
      success: true,
      data: req.user,
    });
  }
}
