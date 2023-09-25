import { IUser } from 'src/modules/users/interfaces/user.interface';
import { ITeamUser } from './team-user.interface';
import { IUpdateTeamUserDto } from './dto/update-team-user.dto.interface';
import { ICreateTeamUserDto } from './dto/create-team-user.dto.interface';

export interface ITeamUserService {
  // Create a new user-team relationship
  createTeamUser(createTeamUserDto: ICreateTeamUserDto): Promise<ITeamUser>;

  // Find all teams for a given user
  findTeamsByUserId(userId: number): Promise<Array<ITeamUser>>;

  // Find all users in a given team
  findUsersByTeamId(teamId: number): Promise<Array<IUser>>;

  // Update a user-team relationship (e.g., change role, status)
  updateTeamUser(
    id: number,
    updateTeamUserDto: IUpdateTeamUserDto,
  ): Promise<ITeamUser>;

  // Remove a user from a team
  removeUserFromTeam(teamId: number, userId: number): Promise<boolean>;
}

export const ITeamUserService = Symbol('ITeamUserService');
