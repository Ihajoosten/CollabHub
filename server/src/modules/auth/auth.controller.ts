import {
  Controller,
  Body,
  Post,
  UseGuards,
  Inject,
  UsePipes,
} from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserExistGuard } from 'src/common/guards/user-exist.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'User logged in Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  @UseGuards(UserExistGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Created new User Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
}
