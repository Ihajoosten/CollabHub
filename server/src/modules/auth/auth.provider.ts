import { IAuthService } from './interfaces/auth-service.interface';
import { AuthService } from './auth.service';

export const authProviders = [
    {
        provide: IAuthService,
        useClass: AuthService,
    },
];
