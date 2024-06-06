import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException('soyElErrorPorElQueNoAnda');
    }

    try {
      const secretKey = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey,
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getTokenFromHeaders = (request: Request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}
