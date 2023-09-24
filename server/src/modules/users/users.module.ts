import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.provider';

@Module({
  providers: [UserService, ...userProviders],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
