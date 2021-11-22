import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor (
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>
  ) {};

  private async getById(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(id);
    return comment;
  };

  async createComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const preparationComment: IComment = {
      text: dto.text,
      post: { id: dto.postId },
      user: { id: 1 }
    };

    const comment = await this.commentRepository.save(preparationComment);

    return comment;
  };

  async updateComment(id: number, dto: UpdateCommentDto): Promise<UpdateResult> {
    const exist = await this.getById(id);

    if (exist) {
      const preparationComment: IComment = {
        text: dto.text,
        post: { id: dto.postId },
        user: { id: 1 }
      };

      const updatedComment = await this.commentRepository.update(id, preparationComment);
      return updatedComment;
    }

    throw new NotFoundException('Такого комментария не существует');
  };

  async removeComment(id: number): Promise<DeleteResult> {
    const exist = await this.getById(id);

    if (exist) {
      const deletedComment = await this.commentRepository.delete(id);
      return deletedComment;
    }

    throw new NotFoundException('Такого комментария не существует');
  };
};
