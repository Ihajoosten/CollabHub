import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { GenderType } from '../interfaces/user.interface';
import { IUpdateUserDto } from '../interfaces/dto/update-user.dto';

export class UpdateUserDto implements IUpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'firstname has min length of 1' })
  @MaxLength(50, { message: 'firstname has max length of 50' })
  firstname?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'lastname has min length of 1' })
  @MaxLength(50, { message: 'lastname has max length of 50' })
  lastname?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'username has min length of 1' })
  @MaxLength(20, { message: 'username has max length of 20' })
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'password has min length of 8' })
  @MaxLength(255, { message: 'password has max length of 255' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsOptional()
  @IsPhoneNumber('NL')
  phone?: string;

  @IsOptional()
  @IsDate()
  birthday?: Date;

  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}