import { TEAM_USER_REPOSITORY } from 'src/common/constants';
import { TeamUser } from './team-user.entity';
import { ITeamUserService } from './interfaces/team-user-service.interface';
import { TeamUserService } from './team-users.service';

export const teamUserProviders = [
  {
    provide: TEAM_USER_REPOSITORY,
    useValue: TeamUser,
  },
  {
    provide: ITeamUserService,
    useClass: TeamUserService,
  },
];
