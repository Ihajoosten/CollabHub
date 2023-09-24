import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../users/interfaces/user-service.interface';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(IUserService) private readonly userService: IUserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        // check if user in the token actually exist
        const user = await this.userService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException(
                'You are not authorized to perform the operation',
            );
        }
        return payload;
    }
}