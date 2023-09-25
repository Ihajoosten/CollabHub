import { IsString, IsBoolean, IsArray, IsInt, IsUrl } from 'class-validator';
import { ICreateTeamDto } from '../interfaces/dto/create-team.dto.interface';

export class CreateTeamDto implements ICreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isPublic: boolean;

  @IsInt()
  ownerUserId: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsUrl()
  imageUrl: string;
}
