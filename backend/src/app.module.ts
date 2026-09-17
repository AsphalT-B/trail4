import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import {auth} from './auth.js'
import { VidpostModule } from './vidpost/vidpost.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { UploadModule } from './upload/upload.module.js';
import {BlogModule} from './blog/blog.module.js'

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),

      AuthModule.forRoot({
      auth,
    }),

    VidpostModule,

    PrismaModule,

    CommentsModule,

    UploadModule,

    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
