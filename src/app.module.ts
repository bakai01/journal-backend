import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/entities/users.entity';
import { PostModule } from './posts/post.module';
import { PostsEntity } from './posts/entities/posts.entity';

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
      entities: [UsersEntity, PostsEntity],
      synchronize: true
    }),
    UsersModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {};
