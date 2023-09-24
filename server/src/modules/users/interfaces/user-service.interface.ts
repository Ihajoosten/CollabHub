import { ICreateUserDto } from './dto/create-user.dto';
import { IUpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.interface';

export interface IUserService {
  createUser(createUserDto: ICreateUserDto): Promise<IUser>;
  findById(id: number): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findAll(): Promise<Array<IUser> | []>;
  updateUser(id: number, updateUserDto: IUpdateUserDto): Promise<IUser | null>;
  deleteUser(id: number): Promise<boolean>;
}

export const IUserService = Symbol('IUserService');
