import { Sequelize } from 'sequelize-typescript';
import {
  SEQUELIZE,
  DEVELOPMENT,
  TEST,
  PRODUCTION,
} from '../../common/constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { Team } from 'src/modules/teams/team.entity';
import { TeamUser } from 'src/modules/team-users/team-user.entity';

// Entitites
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Team, TeamUser]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
