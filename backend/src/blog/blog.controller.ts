import { Controller, Get, Post, Body, Patch, Param, Req, Delete } from '@nestjs/common';
import { BlogService } from './blog.service.js';
import { CreateBlogDto } from './dto/create-blog.dto.js';
import { UpdateBlogDto } from './dto/update-blog.dto.js';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  @Roles(['ADMIN'])
  create(@Body() createBlogDto: CreateBlogDto, @Req() req:any) {
    const userId = req.user.id;
    return this.blogService.create(createBlogDto, userId);
  }

  @AllowAnonymous()
  @Get('all-blog')
  findAll() {
    return this.blogService.findAll();
  }

  @AllowAnonymous()
  @Get('recent-blog')
  findRecent() {
    return this.blogService.findRecent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id/delete')
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
