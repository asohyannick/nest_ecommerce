import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../modules/user/user.service';

// Extend Express Request interface to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.userService.fetchUser(decoded.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
