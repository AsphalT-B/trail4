import { Injectable } from '@nestjs/common';
import { CreateVidpostDto } from './dto/create-vidpost.dto.js';
import { UpdateVidpostDto } from './dto/update-vidpost.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class VidpostService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVidpostDto: CreateVidpostDto, userId:string) {
    return this.prisma.video.create({
      data: {
        ...createVidpostDto,
        userId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.video.findMany();
  }

  findOne(id: string) {
    return this.prisma.video.findFirst({
      where: { id },
    });
  }

  findRecent(){
    return this.prisma.video.findMany({
      orderBy:{
        createdAt: 'desc',
      },
      take: 3,
    })
  }

  update(id: string, updateVidpostDto: UpdateVidpostDto) {
    return this.prisma.video.update({
      where: { id },
      data: updateVidpostDto,
    });
  }

  remove(id: string) {
    return this.prisma.video.delete({
      where: { id },
    });
  }
}