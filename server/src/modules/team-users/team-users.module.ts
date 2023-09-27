import { Module } from '@nestjs/common';
import { TeamUserService } from './team-users.service';
import { TeamUserController } from './team-users.controller';
import { teamUserProviders } from './team-users.provider';

@Module({
  providers: [TeamUserService, ...teamUserProviders],
  controllers: [TeamUserController],
  exports: [TeamUserService],
})
export class TeamUsersModule {}
