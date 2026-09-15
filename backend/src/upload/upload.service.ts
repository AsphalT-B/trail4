import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private readonly r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  async presign(fileName: string, fileType: string) {
    try {
      const key = `videos/${Date.now()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
      });

      const uploadUrl = await getSignedUrl(this.r2, command, {
        expiresIn: 600,
      });

      const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

      return {
        uploadUrl,
        publicUrl,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('Could not create upload URL');
    }
  }
}
