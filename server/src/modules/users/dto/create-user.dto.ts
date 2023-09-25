import {
  IsEmail,
  IsString,
  IsBoolean,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
} from 'class-validator';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto.interface';
import { GenderType } from '../interfaces/user.interface';
import { ToPhone } from 'src/common/decorators/to-phone.decorator';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @MinLength(1, { message: 'firstname has min length of 1' })
  @MaxLength(50, { message: 'firstname has max length of 50' })
  firstname: string;

  @IsString()
  @MinLength(1, { message: 'lastname has min length of 1' })
  @MaxLength(50, { message: 'lastname has max length of 50' })
  lastname: string;

  @IsString()
  @MinLength(1, { message: 'username has min length of 1' })
  @MaxLength(20, { message: 'username has max length of 20' })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'password has min length of 8' })
  @MaxLength(255, { message: 'password has max length of 255' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ToPhone
  phone: string;

  @IsDateString()
  birthday: Date;

  @IsEnum(GenderType)
  gender: GenderType;

  @IsBoolean()
  isActive: boolean;
}
