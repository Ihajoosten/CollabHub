import { Module } from '@nestjs/common';
import { ThreadsModule } from './threads/threads.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ThreadsModule, PostsModule, CommentsModule],
})
export class ForumsModule {}
