import { USER_REPOSITORY } from 'src/common/constants';
import { User } from './user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { UserService } from './user.service';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: IUserService,
    useClass: UserService,
  },
];
