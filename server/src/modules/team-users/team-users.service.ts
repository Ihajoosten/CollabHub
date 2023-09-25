import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITeamUserService } from './interfaces/team-user-service.interface';
import { IUpdateTeamUserDto } from './interfaces/dto/update-team-user.dto.interface';
import { ICreateTeamUserDto } from './interfaces/dto/create-team-user.dto.interface';
import { TEAM_USER_REPOSITORY } from 'src/common/constants';
import { TeamUser } from './team-user.entity';
import { User } from '../users/user.entity';
import { Team } from '../teams/team.entity';

@Injectable()
export class TeamUserService implements ITeamUserService {
  constructor(
    @Inject(TEAM_USER_REPOSITORY)
    private readonly teamUserRepo: typeof TeamUser,
  ) {}

  async createTeamUser(
    createTeamUserDto: ICreateTeamUserDto,
  ): Promise<TeamUser> {
    createTeamUserDto.joinedAt = new Date(Date.now().toLocaleString());
    const teamUser = await this.teamUserRepo.create(createTeamUserDto);
    return !teamUser ? null : teamUser;
  }

  async findTeamsByUserId(userId: number): Promise<Array<TeamUser>> {
    const teamUsers = await this.teamUserRepo.findAll({
      where: { userId },
      include: [Team],
    });
    return teamUsers.length > 0 ? teamUsers : null;
  }

  async findUsersByTeamId(teamId: number): Promise<Array<User>> {
    const teamUsers = await this.teamUserRepo.findAll({
      where: { teamId },
      include: [User],
    });
    const users = teamUsers.map((teamUser) => teamUser.user);
    return users.length > 0 ? users : null;
  }

  async updateTeamUser(
    id: number,
    updateTeamUserDto: IUpdateTeamUserDto,
  ): Promise<TeamUser> {
    const teamUser = await this.teamUserRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!teamUser) return null;

    const result = await teamUser.update(updateTeamUserDto);
    return !result ? null : result;
  }

  async removeUserFromTeam(teamId: number, userId: number): Promise<boolean> {
    const deleted = await this.teamUserRepo.destroy({
      where: {
        teamId: teamId,
        userId: userId,
      },
    });
    return deleted > 0;
  }
}
