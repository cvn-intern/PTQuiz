import { sendMailOptions } from './types/sendMail.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    RefreshTokenDto,
    RegisterDto,
    ResetPasswordDto,
    OAuthDto,
    ChangePasswordDto,
} from './dto';
import * as argon2 from 'argon2';
import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '../mailer/mailer.service';
import { Role, Status } from './types';
import { EmailDto } from './dto/forgotPassword.dto';
import { TokenDto } from './dto/token.dto';
import { Error, JwtError } from '../error';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private mailer: MailerService,
    ) {}

    async OAuth(dto: OAuthDto) {
        try {
            const { authId, avatar, displayName, email, loginFrom } = dto;

            let user = await this.prisma.users.findUnique({
                where: {
                    email: email,
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

            if (!user) {
                user = await this.prisma.users.create({
                    data: {
                        email: email,
                        authId: authId,
                        displayName: displayName,
                        isLogin: true,
                        role: Role.User,
                        avatar: avatar,
                        status: Status.Active,
                        loginFrom: loginFrom,
                        createdAt: new Date(),
                    },
                });
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
        } catch (err) {
            throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
        }
    }

    async register(dto: RegisterDto) {
        try {
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
        } catch (err) {
            return exceptionHandler(err);
        }
    }
    async resendConfirmation(dto: EmailDto) {
        try {
            const { email } = dto;
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
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async confirmEmail(dto: TokenDto) {
        try {
            const { token } = dto;
            const decoded = await this.verifyToken(token);
            const user = await this.prisma.users.findUnique({
                where: {
                    id: decoded.id,
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    JwtError.INVALID_TOKEN,
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
                    status: updatedUser.status,
                },
            };
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async login(dto: LoginDto) {
        try {
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
            const isPasswordValid = await this.verifyHash(
                user.password,
                password,
            );
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
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async logout(userId: string) {
        try {
            await this.updateRefreshToken(userId, '', false);
            return {
                accessToken: '',
                refreshToken: '',
            };
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async forgotPassword(dto: EmailDto) {
        try {
            const { email } = dto;
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
        } catch (err) {
            return exceptionHandler(err);
        }
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
                    id: decoded.id,
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
                    status: updatedUser.status,
                },
            };
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async changePassword(dto: ChangePasswordDto, userId: string) {
        try {
            const { oldPassword, newPassword, confirmPassword } = dto;
            if (newPassword !== confirmPassword) {
                throw new HttpException(
                    'Password do not match confirm password',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const user = await this.prisma.users.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    password: true,
                    loginFrom: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    'User not found',
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (user.loginFrom !== null) {
                throw new HttpException(
                    'You are using OAuth, please change password in your OAuth account',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const isPasswordValid = await this.verifyHash(
                user.password,
                oldPassword,
            );
            if (!isPasswordValid) {
                throw new HttpException(
                    'Old password is not valid',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const hashedPassword = await this.hashData(newPassword);
            await this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return {
                message: 'Password changed successfully',
            };
        } catch (err) {
            return exceptionHandler(err);
        }
    }

    async refreshTokens(dto: RefreshTokenDto) {
        try {
            const { refreshToken } = dto;
            const decoded = await this.verifyToken(refreshToken);
            const user = await this.prisma.users.findFirst({
                where: {
                    id: decoded.id,
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
            if (!user) {
                throw new HttpException(
                    'Invalid token',
                    HttpStatus.BAD_REQUEST,
                );
            }
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
            return exceptionHandler(err);
        }
    }

    async getProfile(userId: string) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                    avatar: true,
                    role: true,
                    status: true,
                    loginFrom: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    'User not found',
                    HttpStatus.BAD_REQUEST,
                );
            }
            return {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                avatar: user.avatar,
                role: user.role,
                status: user.status,
                loginFrom: user.loginFrom,
            };
        } catch (err) {
            return exceptionHandler(err);
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
            { id: userId },
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

export const exceptionHandler = (err: Error) => {
    if (
        err.name === JwtError.JSON_WEB_TOKEN_ERROR ||
        err.name === JwtError.SYNTAX_ERROR
    ) {
        throw new HttpException(JwtError.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
    } else if (err.name === JwtError.TOKEN_EXPIRED_ERROR) {
        throw new HttpException(JwtError.EXPIRED_TOKEN, HttpStatus.BAD_REQUEST);
    } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
};
