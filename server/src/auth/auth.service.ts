import { sendMailOptions } from './types/sendMail.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenDto, RegisterDto, ResetPasswordDto } from './dto';
import * as argon2 from 'argon2';
import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '../mailer/mailer.service';
import { Role, Status } from './types';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private mailer: MailerService,
    ) {}

    async register(dto: RegisterDto) {
        const { email, password, confirmPassword, displayName } = dto;
        if (password !== confirmPassword) {
            throw new HttpException(
                'Password do not match confirm password',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashedPassword = await this.hashData(password);
        const userExists = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists && userExists.status === Status.Active) {
            throw new HttpException(
                'User with this email already exists, please login',
                HttpStatus.BAD_REQUEST,
            );
        } else if (userExists && userExists.status === Status.Inactive) {
            throw new HttpException(
                'User with this email already exists, please confirm your email',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newUser = await this.prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                displayName: displayName,
                isLogin: false,
                role: Role.User,
                avatar: process.env.DEFAULT_AVATAR,
                status: Status.Inactive,
            },
        });
        const confirmToken = await this.generateUserIdToken(newUser.id);
        const sendMailOptions: sendMailOptions = {
            to: newUser.email,
            subject: '[PTQuiz Email Confirmation]',
            displayName: newUser.displayName,
            token: confirmToken,
            type: 'confirm',
        };
        await this.mailer.sendMail(sendMailOptions);
        return null;
    }
    async resendConfirmation(email: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                id: true,
                displayName: true,
                status: true,
            },
        });
        if (!user) {
            throw new HttpException(
                'User with this email does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (user.status === Status.Active) {
            throw new HttpException(
                'Email already confirmed',
                HttpStatus.BAD_REQUEST,
            );
        }
        const confirmToken = await this.generateUserIdToken(user.id);
        const sendMailOptions: sendMailOptions = {
            to: user.email,
            subject: '[PTQuiz Email Confirmation]',
            displayName: user.displayName,
            token: confirmToken,
            type: 'confirm',
        };
        await this.mailer.sendMail(sendMailOptions);
        return {
            message: 'Confirmation email sent successfully',
        };
    }

    async confirmEmail(token: string) {
        try {
            const decoded = await this.verifyToken(token);
            const user = await this.prisma.users.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    'Invalid token',
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (user.status === Status.Active) {
                throw new HttpException(
                    'Email already confirmed',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const updatedUser = await this.prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    status: Status.Active,
                },
            });
            const payload: Payload = {
                email: updatedUser.email,
                id: updatedUser.id,
                role: updatedUser.role as Role,
                displayName: updatedUser.displayName,
                avatar: updatedUser.avatar,
                status: updatedUser.status,
            };
            const tokens = await this.generateTokens(payload);
            await this.updateRefreshToken(
                updatedUser.id,
                tokens.refreshToken,
                true,
            );
            return {
                ...tokens,
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    displayName: updatedUser.displayName,
                    avatar: updatedUser.avatar,
                    role: updatedUser.role,
                },
            };
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                id: true,
                password: true,
                role: true,
                displayName: true,
                avatar: true,
                status: true,
            },
        });
        if (!user) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (user.status !== Status.Active) {
            throw new HttpException(
                'Your account is not active, please confirm your email',
                HttpStatus.BAD_REQUEST,
            );
        }
        const isPasswordValid = await this.verifyHash(user.password, password);
        if (!isPasswordValid) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload: Payload = {
            email: user.email,
            id: user.id,
            role: user.role as Role,
            displayName: user.displayName,
            avatar: user.avatar,
            status: user.status,
        };
        const tokens = await this.generateTokens(payload);
        await this.updateRefreshToken(user.id, tokens.refreshToken, true);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                avatar: user.avatar,
                role: user.role,
                status: user.status,
            },
        };
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId, '', false);
        return {
            accessToken: '',
            refreshToken: '',
        };
    }

    async forgotPassword(email: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                id: true,
                displayName: true,
                status: true,
            },
        });
        if (!user) {
            throw new HttpException(
                'User with this email does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (user.status !== Status.Active) {
            throw new HttpException(
                'Your account is not active, please confirm your email',
                HttpStatus.BAD_REQUEST,
            );
        }
        const resetToken = await this.generateUserIdToken(user.id);
        const sendMailOptions: sendMailOptions = {
            to: user.email,
            subject: '[PTQuiz Reset Password]',
            displayName: user.displayName,
            token: resetToken,
            type: 'reset',
        };
        await this.mailer.sendMail(sendMailOptions);
        return {
            message: 'Reset password link sent successfully',
        };
    }

    async resetPassword(dto: ResetPasswordDto) {
        try {
            const { password, confirmPassword, token } = dto;
            if (password !== confirmPassword) {
                throw new HttpException(
                    'Password do not match confirm password',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const decoded = await this.verifyToken(token);
            const user = await this.prisma.users.findUnique({
                where: {
                    id: decoded.userId,
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    'Invalid token',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const hashedPassword = await this.hashData(dto.password);
            const updatedUser = await this.prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    password: hashedPassword,
                },
            });
            const payload: Payload = {
                email: updatedUser.email,
                id: updatedUser.id,
                role: updatedUser.role as Role,
                displayName: updatedUser.displayName,
                avatar: updatedUser.avatar,
                status: updatedUser.status,
            };
            const tokens = await this.generateTokens(payload);
            await this.updateRefreshToken(
                updatedUser.id,
                tokens.refreshToken,
                true,
            );
            return {
                ...tokens,
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    displayName: updatedUser.displayName,
                    avatar: updatedUser.avatar,
                    role: updatedUser.role,
                },
            };
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
    }

    async getMe(userId: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                id: true,
                avatar: true,
                displayName: true,
                role: true,
            },
        });
        return user;
    }

    async refreshTokens(dto: RefreshTokenDto) {
        try {
            const { refreshToken } = dto;
            const decoded = await this.verifyToken(refreshToken);
            const user = await this.prisma.users.findFirst({
                where: {
                    id: decoded.userId,
                    token: refreshToken,
                },
                select: {
                    email: true,
                    id: true,
                    role: true,
                    displayName: true,
                    avatar: true,
                    status: true,
                },
            });
            if (user.status === Status.Inactive) {
                throw new HttpException(
                    'Your account is not active, please confirm your email',
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (!user) {
                throw new HttpException(
                    'Invalid token',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const payload: Payload = {
                email: user.email,
                id: user.id,
                role: user.role as Role,
                displayName: user.displayName,
                avatar: user.avatar,
                status: user.status,
            };
            const tokens = await this.generateTokens(payload);
            await this.updateRefreshToken(user.id, tokens.refreshToken, true);
            return tokens;
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
    }

    async hashData(data: string) {
        return await argon2.hash(data);
    }

    async verifyHash(hashedData: string, plainData: string) {
        return await argon2.verify(hashedData, plainData);
    }

    async generateTokens(payload: Payload) {
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        });
        return { accessToken, refreshToken };
    }

    async generateUserIdToken(userId: string) {
        const token = await this.jwt.signAsync(
            { userId },
            {
                expiresIn: process.env.CONFIRM_TOKEN_TTL,
                privateKey: process.env.PRIVATE_KEY,
                secret: process.env.JWT_SECRET,
            },
        );
        return token;
    }

    async verifyToken(token: string) {
        return await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            publicKey: process.env.PUBLIC_KEY,
        });
    }

    async updateRefreshToken(
        userId: string,
        refreshToken: string,
        isLogin: boolean,
    ) {
        await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                token: refreshToken,
                isLogin,
            },
        });
    }
}
