import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser:false,
  });

   app.enableCors({
    origin: `${process.env.UI_URL}`,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 8001);
}
await bootstrap();
