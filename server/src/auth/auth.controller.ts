import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LoginDto,
    RefreshTokenDto,
    RegisterDto,
    ResetPasswordDto,
    OAuthDto,
    ChangePasswordDto,
} from './dto';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { JwtAuthGuard } from './guard/jwtGuard.guard';
import { Payload, Tokens } from './types';
import { EmailDto } from './dto/forgotPassword.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@UseInterceptors(ResTransformInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/oauth')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged in successfully')
    async oauth(@Body() dto: OAuthDto) {
        return this.authService.OAuth(dto);
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage(
        'Registered successfully, please check verification link in your email',
    )
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('/resend-confirmation')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Verification link sent successfully')
    async resendConfirmation(@Body() dto: EmailDto) {
        await this.authService.resendConfirmation(dto);
        return null;
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged in successfully')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged out successfully')
    @UseGuards(JwtAuthGuard)
    async logout(@GetCurrentUser('id') userId: string): Promise<Tokens> {
        return this.authService.logout(userId);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User retrieved successfully')
    async getMe(@GetCurrentUser() user: Payload) {
        return user;
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Profile retrieved successfully')
    async getProfile(@GetCurrentUser('id') userId: string) {
        return this.authService.getProfile(userId);
    }

    @Post('/forgot-password')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Reset password link sent successfully')
    async forgotPassword(@Body() dto: EmailDto) {
        await this.authService.forgotPassword(dto);
        return null;
    }

    @Post('/reset-password')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Password reset successfully')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @Post('/change-password')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Password changed successfully')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @GetCurrentUser('id') userId: string,
        @Body() dto: ChangePasswordDto,
    ) {
        return this.authService.changePassword(dto, userId);
    }

    @Post('/refresh')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Tokens refreshed successfully')
    async refreshTokens(@Body() dto: RefreshTokenDto): Promise<Tokens> {
        return await this.authService.refreshTokens(dto);
    }

    @Post('/confirm')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Verify account successfully')
    async confirm(@Body() dto: TokenDto) {
        return this.authService.confirmEmail(dto);
    }

    @Post('/check-valid')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Check valid successfully')
    async checkValid(@Body() dto: TokenDto) {
        return this.authService.checkValidToken(dto);
    }
}
