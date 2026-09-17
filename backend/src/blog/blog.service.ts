import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto.js';
import { UpdateBlogDto } from './dto/update-blog.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService){}
  
  create(createBlogDto: CreateBlogDto, userId: string) {
    return this.prisma.blog.create({
      data: {
       ...createBlogDto,
       userId: userId, 
      }

    })
  }

  findAll() {
    return this.prisma.blog.findMany()
  }

  findOne(id: string) {
    return this.prisma.blog.findFirst({ where: {id} });
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {id},
      data: updateBlogDto,
    });
  }

  findRecent(){
    return this.prisma.blog.findMany({
      orderBy:{
        createdAt: 'desc',
      },
      take: 3,
    })
  }

  remove(id: string) {
    return this.prisma.blog.delete({
      where: {id}
    });
  }
}
