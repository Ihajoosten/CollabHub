import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [BoardsModule, ListsModule, TasksModule],
})
export class KanbanModule {}
