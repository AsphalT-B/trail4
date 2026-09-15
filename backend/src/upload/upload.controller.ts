import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service.js';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presign') presign(
    @Body() body: { fileName: string; fileType: string },
  ) {
    return this.uploadService.presign(body.fileName, body.fileType);
  }
}
