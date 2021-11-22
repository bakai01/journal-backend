import { Module } from '@nestjs/common';

import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
