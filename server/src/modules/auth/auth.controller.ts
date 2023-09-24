import { Controller, Body, Post, UseGuards, Inject, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserExistGuard } from 'src/common/guards/user-exist.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() body: LoginUserDto) {
        return await this.authService.login(body);
    }

    @UseGuards(UserExistGuard)
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return await this.authService.register(body);
    }
}