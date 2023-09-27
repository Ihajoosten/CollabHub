import { Inject, Injectable } from '@nestjs/common';
import { ITeamService } from './interfaces/team-service.interface';
import { ICreateTeamDto } from './interfaces/dto/create-team.dto.interface';
import { IUpdateTeamDto } from './interfaces/dto/update-team.dto.interface';
import { ITeam } from './interfaces/team.interface';
import { TEAM_REPOSITORY } from 'src/common/constants';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService implements ITeamService {
  constructor(
    @Inject(TEAM_REPOSITORY)
    private readonly teamRepo: typeof Team,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<ITeam> {
    return this.teamRepo.create(createTeamDto);
  }

  async findById(teamId: number): Promise<ITeam> {
    const team = await this.teamRepo.findByPk(teamId);
    if (!team) {
      return null;
    }
    return team;
  }

  async findAllTeams(): Promise<Array<ITeam> | null> {
    const teams = await this.teamRepo.findAll();
    if (!teams || teams.length === 0) return null;
    return teams;
  }

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<ITeam> {
    const team = await this.teamRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!team) return null;

    updateTeamDto.lastActivity = new Date(Date.now());
    const result = await team.update(updateTeamDto);
    return !result ? null : result;
  }

  async deleteTeam(teamId: number): Promise<boolean> {
    const deleted = await this.teamRepo.destroy({
      where: {
        id: teamId,
      },
    });
    return deleted > 0;
  }
}
