import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { IUpdateTeamUserDto } from '../interfaces/dto/update-team-user.dto.interface';
import { TeamRoleType } from '../interfaces/team-user.interface';

export class UpdateTeamUserDto implements IUpdateTeamUserDto {
  @IsOptional()
  @IsEnum(TeamRoleType)
  role?: TeamRoleType;
}
