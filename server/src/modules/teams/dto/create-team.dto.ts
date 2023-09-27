import {
  IsString,
  IsBoolean,
  IsArray,
  IsInt,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { ICreateTeamDto } from '../interfaces/dto/create-team.dto.interface';

export class CreateTeamDto implements ICreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  @IsInt()
  ownerUserId: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
