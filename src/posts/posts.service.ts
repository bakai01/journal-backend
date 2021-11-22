import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/posts.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsEntity)
    private postsRepository: Repository<PostsEntity>
  ) {};

  private async findById(id: number): Promise<CreatePostDto> | undefined {
    const post = await this.postsRepository.findOne(id);
    return post;
  };

  async createPost(dto: CreatePostDto): Promise<CreatePostDto> {
    const post = await this.postsRepository.save(dto);
    return post
  };

  async findAllPosts(): Promise<Array<CreatePostDto>> {
    const posts = await this.postsRepository.find();
    return posts;
  };

  async findOnePost(id: number): Promise<CreatePostDto> {
    const existPost = this.findById(id);

    if (existPost) {
      return existPost;
    }

    throw new NotFoundException('Такого поста не существует');
  };

  async updatePost(id: number, dto: UpdatePostDto): Promise<UpdateResult> {
    const existPost = await this.findById(id);

    if (existPost) {
      const updatedPost = await this.postsRepository.update(id, dto);
      return updatedPost;
    }

    throw new NotFoundException('Такого поста не существует');
  };

  async removePost(id: number): Promise<DeleteResult> {
    const existPost = await this.findById(id);

    if (existPost) {
      const deletedPost = await this.postsRepository.delete(id);
      return deletedPost;
    }

    throw new NotFoundException('Такого поста не существует');
  };
};
