import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { KanbanModule } from './modules/kanban/kanban.module';
import { ScrumModule } from './modules/scrum/scrum.module';
import { ForumsModule } from './modules/forums/forums.module';
import { TeamsModule } from './modules/teams/teams.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FilesModule } from './modules/files/files.module';
import { DatabaseModule } from './database/database.module';
import { WebsocketsModule } from './shared/websockets/websockets.module';
import { EmailModule } from './shared/email/email.module';
import { SearchModule } from './shared/search/search.module';
import { LoggingModule } from './shared/logging/logging.module';
import { SecurityModule } from './shared/security/security.module';
import { CachingModule } from './shared/caching/caching.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    KanbanModule,
    ScrumModule,
    ForumsModule,
    TeamsModule,
    AnalyticsModule,
    WebsocketsModule,
    DatabaseModule,
    NotificationsModule,
    FilesModule,
    EmailModule,
    SearchModule,
    LoggingModule,
    SecurityModule,
    CachingModule,
  ],
  providers: [],
})
export class AppModule {}
