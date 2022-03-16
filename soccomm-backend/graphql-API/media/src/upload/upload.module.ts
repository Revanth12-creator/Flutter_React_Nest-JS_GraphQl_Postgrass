import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryUpload } from './entities/category.entity';
import { GroupUpload } from './entities/group-upload.entity';
import { PostUpload } from './entities/post.entity';
import { Upload } from './entities/upload.entity';
import { GroupResolver } from './group.resolver';
import { PostResolver } from './post.resolver';
import { uploadController } from './upload.controller';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload, PostUpload, GroupUpload, CategoryUpload]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [uploadController],
  providers: [
    UploadResolver,
    UploadService,
    UserResolver,
    GroupResolver,
    PostResolver,
  ],
})
export class UploadModule {}
