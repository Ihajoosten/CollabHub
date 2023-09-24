// NestJS Modules
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Custom Modules
import { AuthModule } from './modules/auth//auth.module';
import { UsersModule } from './modules/users/users.module';
import { KanbanModule } from './modules/kanban/kanban.module';
import { ScrumModule } from './modules/scrum/scrum.module';
import { ForumsModule } from './modules/forums/forums.module';
import { TeamsModule } from './modules/teams/teams.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FilesModule } from './modules/files/files.module';
import { DatabaseModule } from './core/database/database.module';
import { WebsocketsModule } from './core/websockets/websockets.module';
import { EmailModule } from './core/email/email.module';
import { SearchModule } from './core/search/search.module';
import { SecurityModule } from './core/security/security.module';
import { CachingModule } from './core/caching/caching.module';

// Custom imports
import * as express from 'express';
import * as cors from 'cors';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    KanbanModule,
    ScrumModule,
    ForumsModule,
    TeamsModule,
    AnalyticsModule,
    WebsocketsModule,
    NotificationsModule,
    FilesModule,
    EmailModule,
    SearchModule,
    SecurityModule,
    CachingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Enable CORS for all routes
    consumer.apply(express.json()).forRoutes('*');
    consumer.apply(express.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(cors()).forRoutes('*');
  }
}
