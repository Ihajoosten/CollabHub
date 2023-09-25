import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { teamProviders } from './team.provider';

@Module({
  providers: [TeamService, ...teamProviders],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamsModule {}
