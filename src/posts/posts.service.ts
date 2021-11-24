import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CommentsService } from 'src/comments/comments.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CountPostsDto } from './dto/count-posts.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private commentsRepo: CommentsService
  ) {};

  private async findById(id: number): Promise<PostDto> | undefined {
    const post = await this.postsRepository.findOne(id);
    return post;
  };

  async createPost(dto: CreatePostDto): Promise<PostDto> {
    const post = await this.postsRepository.save(dto);
    return post
  };

  async findAllPosts(): Promise<Array<PostDto>> {
    const posts = await this.postsRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
    return posts;
  };

  async findOnePost(id: number): Promise<PostDto> {
    const qb = await this.postsRepository
      .createQueryBuilder('posts')
      .where({ id })
      .update()
      .set({
        views: () => 'views + 1'
      })
      .execute();

    if (!qb.affected) {
      throw new NotFoundException('Такого поста не существует');
    }

    const result = await this.findById(id);
    return result;
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
      await this.commentsRepo.removeCommentsByPostId(id);
      const deletedPost = await this.postsRepository.delete(id);
      return deletedPost;
    }

    throw new NotFoundException('Такого поста не существует');
  };

  async findAllPopularPosts(): Promise<CountPostsDto> {
    const posts = await this.postsRepository
      .createQueryBuilder('popularPosts')
      .orderBy('views', 'DESC')
      .limit(3)
      .getManyAndCount()

    const [popularPosts, count] = posts;

    return {
      posts: popularPosts,
      count
    };
  };

  async searchPost(dto: SearchPostDto): Promise<CountPostsDto> {
    const searchedPost = this.postsRepository
      .createQueryBuilder('searchedPost')
      .limit(dto.limit || 2)
      .take(dto.take || 0);

    if (dto.views) {
      searchedPost.orderBy('views', dto.views);
    }
    if (dto.title) {
      searchedPost.andWhere(`searchedPost.title ILIKE :title`);
    }
    if (dto.body) {
      searchedPost.andWhere(`searchedPost.body ILIKE :body`);
    }
    if (dto.tag) {
      searchedPost.andWhere(`searchedPost.tags ILIKE :tag`);
    }

    searchedPost.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || ''
    });

    console.log(searchedPost.getSql());

    const [posts, count] = await searchedPost.getManyAndCount();

    return {
      posts,
      count
    };
  };
};
