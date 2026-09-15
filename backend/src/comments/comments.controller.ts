import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':videoId/create')
  create(
  @Param('videoId') videoId: string,
  @Body() createCommentDto: CreateCommentDto, @Req() req: any,) {
    console.log(videoId)

    const userId = req.user.id
    console.log(userId)

    return this.commentsService.create(createCommentDto, videoId, userId)     
  };


  @Get('all-comments')
  findAll() {
    return this.commentsService.findAll();
  }

  @AllowAnonymous()
  @Get("recent-comments")
  findRecent(){
    return this.commentsService.findRecent();
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string, @Req() req: any,) {

    const userId = req.user.id
    return this.commentsService.remove(id, userId);
  }
}
