import { Module } from '@nestjs/common';

import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
