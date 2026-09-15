import { Module } from '@nestjs/common';
import { VidpostService } from './vidpost.service.js';
import { VidpostController } from './vidpost.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports:[PrismaModule],
  controllers: [VidpostController],
  providers: [VidpostService],
})
export class VidpostModule {}
