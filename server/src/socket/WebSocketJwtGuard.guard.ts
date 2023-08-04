import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Payload, Status } from '../auth/types';
import { WsException } from '@nestjs/websockets';
import { JwtError } from '../error';
import { AuthError } from '../error/authError.enum';

@Injectable()
export class WebSocketJwtGuard implements CanActivate {
    constructor(private jwt: JwtService, private prisma: PrismaService) {}
    async canActivate(context: ExecutionContext) {
        const token = this.extractTokenFromHeader(context);
        if (!token) return false;
        try {
            const payload: Payload = await this.jwt.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                publicKey: process.env.PUBLIC_KEY,
            });
            const user = await this.prisma.users.findUnique({
                where: { id: payload.id },
                select: {
                    status: true,
                    aliasAvatar: true,
                    aliasName: true,
                },
            });
            if (!user) {
                throw new WsException(JwtError.INVALID_TOKEN);
            }
            if (user.status === Status.INACTIVE) {
                throw new WsException(AuthError.USER_NOT_ACTIVATED);
            }
            if (user.status === Status.BLOCKED) {
                throw new WsException(AuthError.USER_BLOCKED);
            }
            const client = context.switchToWs().getClient();
            client.user = payload;
            client.aliasAvatar = user.aliasAvatar;
            client.aliasName = user.aliasName;
            return true;
        } catch (error) {
            if (error.name === JwtError.TOKEN_EXPIRED_ERROR) {
                throw new WsException(JwtError.ACCESS_TOKEN_EXPIRED);
            }
            if (
                error.name === JwtError.JSON_WEB_TOKEN_ERROR ||
                error.name === JwtError.SYNTAX_ERROR
            ) {
                throw new WsException(JwtError.INVALID_TOKEN);
            }
            throw new WsException(error.message);
        }
    }

    private extractTokenFromHeader(context: ExecutionContext): string | null {
        let token = null;
        const {
            headers: { authorization },
        } = context.getArgs()[0].handshake;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            token = authorization.split(' ')[1];
        } else {
            token = context.getArgs()[0].handshake.auth.token;
        }
        return token;
    }
}
