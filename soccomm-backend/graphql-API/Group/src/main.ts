import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import passport from "passport";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
const PORT = Number(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
