import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IUpdateTeamDto } from '../interfaces/dto/update-team.dto.interface';

export class UpdateTeamDto implements IUpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: Array<string>;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  // Statistical properties
  @IsOptional()
  @IsInt()
  memberCount?: number;

  @IsOptional()
  @IsInt()
  postCount?: number;

  @IsOptional()
  @IsInt()
  commentCount?: number;

  @IsOptional()
  @IsDate()
  lastActivity?: Date;

  @IsOptional()
  @IsInt()
  upvotes?: number;

  @IsOptional()
  @IsInt()
  downvotes?: number;
}
