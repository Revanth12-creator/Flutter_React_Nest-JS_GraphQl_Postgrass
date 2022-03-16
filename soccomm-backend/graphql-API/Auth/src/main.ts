import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = Number(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(passport.initialize());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); // enable app level validation for request d
  await app.listen(PORT);
}
bootstrap();
