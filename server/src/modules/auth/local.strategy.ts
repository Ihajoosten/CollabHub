import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(IAuthService) private readonly authService: IAuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        return user;
    }
}