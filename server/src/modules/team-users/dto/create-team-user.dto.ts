import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator';
import { ICreateTeamUserDto } from '../interfaces/dto/create-team-user.dto.interface';
import { TeamRoleType } from '../interfaces/team-user.interface';

export class CreateTeamUserDto implements ICreateTeamUserDto {
  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsEnum(TeamRoleType)
  role: TeamRoleType;
}
