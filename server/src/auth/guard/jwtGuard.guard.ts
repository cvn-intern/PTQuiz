import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Status } from '../types';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwt: JwtService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                publicKey: process.env.PUBLIC_KEY,
            });
            if (payload['status'] === Status.Inactive) {
                throw new UnauthorizedException('Account is not active');
            }
            request.user = payload;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Access token expired');
            }
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const {
            headers: { authorization },
        } = request;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1];
        }
        return null;
    }
}
