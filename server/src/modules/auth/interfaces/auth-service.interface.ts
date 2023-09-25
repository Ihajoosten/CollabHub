import { ICreateUserDto } from 'src/modules/users/interfaces/dto/create-user.dto.interface';
import { ILoginUserDto } from './dto/login-user.dto.';

export interface IAuthService {
  register(user: ICreateUserDto): Promise<boolean>;
  login(user: ILoginUserDto): Promise<{ token: string } | null>;
  validateUser(email: string, password: string): Promise<any>;
}

export const IAuthService = Symbol('IAuthService');
