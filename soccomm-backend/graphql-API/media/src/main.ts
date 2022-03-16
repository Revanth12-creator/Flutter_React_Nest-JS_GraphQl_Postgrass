import { NestFactory } from '@nestjs/core';
//import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
const PORT = Number(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(PORT);
}
bootstrap();
