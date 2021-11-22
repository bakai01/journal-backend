import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {};

  @Post()
  create(@Body() dto: CreatePostDto): Promise<CreatePostDto> {
    return this.postService.createPost(dto);
  };

  @Get()
  findAll(): Promise<Array<CreatePostDto>> {
    return this.postService.findAllPosts();
  };

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreatePostDto> {
    return this.postService.findOnePost(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return this.postService.updatePost(+id, updatePostDto);
  };

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.removePost(+id);
  };
};
