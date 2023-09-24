import { Module } from '@nestjs/common';
import { SprintsModule } from './sprints/sprints.module';
import { StoriesModule } from './stories/stories.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [SprintsModule, StoriesModule, TasksModule],
})
export class ScrumModule {}
