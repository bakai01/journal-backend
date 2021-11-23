import { forwardRef, Module } from '@nestjs/common';

import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() => CommentsModule)
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {};
