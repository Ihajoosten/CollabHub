export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: GenderType;
  isActive: boolean;
}

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}
