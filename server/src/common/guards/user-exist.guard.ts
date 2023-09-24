import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserService } from 'src/modules/users/interfaces/user-service.interface';

@Injectable()
export class UserExistGuard implements CanActivate {
    constructor(@Inject(IUserService) private readonly userService: IUserService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any) {
        const checkEmail = await this.userService.findByEmail(
            request.body.email,
        );

        const checkUsername = await this.userService.findByUsername(
            request.body.username,
        );

        if (checkEmail) {
            throw new ForbiddenException('This email already exist');
        } else if (checkUsername) {
            throw new ForbiddenException('This username already exist');
        }

        return true;
    }
}