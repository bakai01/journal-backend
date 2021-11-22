import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { PostModule } from './posts/post.module';
import { CommentsModule } from './comments/comments.module';
import { UserEntity } from './users/entities/user.entity';
import { PostEntity } from './posts/entities/post.entity';
import { CommentEntity } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, PostEntity, CommentEntity],
      synchronize: true
    }),
    UsersModule,
    PostModule,
    CommentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {};
