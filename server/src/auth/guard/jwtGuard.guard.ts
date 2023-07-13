import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Status } from '../types';
import { JwtError } from '../../error';
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
                throw new UnauthorizedException(JwtError.ACCESS_TOKEN_EXPIRED);
            }
            if (
                error.name === JwtError.JSON_WEB_TOKEN_ERROR ||
                error.name === JwtError.SYNTAX_ERROR
            ) {
                throw new UnauthorizedException(JwtError.INVALID_TOKEN);
            }
            throw new UnauthorizedException(error.message);
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
