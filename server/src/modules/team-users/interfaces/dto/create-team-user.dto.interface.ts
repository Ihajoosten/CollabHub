import { TeamRoleType } from '../team-user.interface';

export interface ICreateTeamUserDto {
  teamId: number;
  userId: number;
  role: TeamRoleType;
}
