import { Body, Controller, Post } from '@nestjs/common';
import { UploadsService } from './upload.service.js';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presign') presign(
    @Body() body: { fileName: string; fileType: string },
  ) {
    return this.uploadsService.presign(body.fileName, body.fileType);
  }
}
