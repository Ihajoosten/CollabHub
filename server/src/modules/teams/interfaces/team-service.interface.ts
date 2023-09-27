import { ICreateTeamDto } from './dto/create-team.dto.interface';
import { IUpdateTeamDto } from './dto/update-team.dto.interface';
import { ITeam } from './team.interface';

export interface ITeamService {
  createTeam(createTeamDto: ICreateTeamDto): Promise<ITeam>;
  findById(id: number): Promise<ITeam | null>;
  findAllTeams(): Promise<Array<ITeam> | null>;
  updateTeam(id: number, updateTeamDto: IUpdateTeamDto): Promise<ITeam | null>;
  deleteTeam(id: number): Promise<boolean>;
}

export const ITeamService = Symbol('ITeamService');
