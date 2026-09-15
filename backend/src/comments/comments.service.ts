import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CommentsService {
  constructor (private readonly prisma: PrismaService){}

  create(createCommentDto: CreateCommentDto, videoId:string, userId:string) {
    return this.prisma.comment.create({
      data: {
       ...createCommentDto,
       videoId: videoId,
       userId: userId, 
      }
    });
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  findRecent(){
    return this.prisma.comment.findMany({
      orderBy:{
        createdAt: 'desc'
      },
      take: 2,
    })
  }

  update(id: string, updateCommentDto: UpdateCommentDto, userId:string) {
    return this.prisma.comment.update({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
        data: updateCommentDto,
    });
  }

  remove(id: string, userId:string) {
    return this.prisma.comment.delete({
      where:{
        id_userId:{
          id,
          userId,
        }
      },
    });
  }
}
