import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
} from 'class-validator';
import { ILoginUserDto } from '../interfaces/dto/login-user.dto.';

export class LoginUserDto implements ILoginUserDto {
    @IsString()
    @MinLength(1, { message: 'username has min length of 1' })
    @MaxLength(20, { message: 'username has max length of 20' })
    username: string;

    @IsString()
    @MinLength(8, { message: 'password has min length of 8' })
    @MaxLength(255, { message: 'password has max length of 255' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak', })
    password: string;
}
