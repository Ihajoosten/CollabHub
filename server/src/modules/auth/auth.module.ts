import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.provider';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { userProviders } from '../users/user.provider';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    providers: [AuthService, ...authProviders, ...userProviders, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
