import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CountPostsDto } from './dto/count-posts.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {};

  @Post()
  create(@Body() dto: CreatePostDto): Promise<PostDto> {
    return this.postService.createPost(dto);
  };

  @Get()
  findAll(): Promise<Array<PostDto>> {
    return this.postService.findAllPosts();
  };

  @Get('popular')
  findAllPopular(): Promise<CountPostsDto> {
    return this.postService.findAllPopularPosts();
  };

  @Get('search')
  search(@Query() dto: SearchPostDto): Promise<CountPostsDto> {
    return this.postService.searchPost(dto);
  };

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostDto> {
    return this.postService.findOnePost(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<UpdateResult> {
    return this.postService.updatePost(+id, dto);
  };

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.removePost(+id);
  };
};
