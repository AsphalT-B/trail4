import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { VidpostService } from './vidpost.service.js';
import { CreateVidpostDto } from './dto/create-vidpost.dto.js';
import { UpdateVidpostDto } from './dto/update-vidpost.dto.js';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('vidpost')
export class VidpostController {
  constructor(private readonly vidpostService: VidpostService) {}

  @Post('create')
  @Roles(['ADMIN'])
  create(@Body() createVidpostDto: CreateVidpostDto, @Req() req: any,) {
    console.log(req.user);
    const userId = req.user.id;
    return this.vidpostService.create(createVidpostDto, userId);
  }

  @AllowAnonymous()
  @Get("all-vidoes")
  findAll() {
    return this.vidpostService.findAll();
  }

  @AllowAnonymous()
  @Get("recent-post")
  findRecent(){
    return this.vidpostService.findRecent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vidpostService.findOne(id);
  }

  @Patch(':id/update')
  @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateVidpostDto: UpdateVidpostDto) {
    return this.vidpostService.update(id, updateVidpostDto);
  }

  @Delete(':id/delete')
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.vidpostService.remove(id);
  }
}
