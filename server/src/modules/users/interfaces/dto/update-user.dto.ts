import { GenderType } from '../user.interface';

export interface IUpdateUserDto {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: Date;
  gender?: GenderType;
  isActive?: boolean;
}
