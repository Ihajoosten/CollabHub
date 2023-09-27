import { TEAM_REPOSITORY } from 'src/common/constants';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { ITeamService } from './interfaces/team-service.interface';

export const teamProviders = [
  {
    provide: TEAM_REPOSITORY,
    useValue: Team,
  },
  {
    provide: ITeamService,
    useClass: TeamService,
  },
];
