import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 20 }));
  await app.listen(5000);
}
bootstrap();
