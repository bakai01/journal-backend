import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    return this.commentsService.createComment(dto);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentsService.updateComment(+id, dto);
  };

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentsService.removeComment(+id);
  };
};
