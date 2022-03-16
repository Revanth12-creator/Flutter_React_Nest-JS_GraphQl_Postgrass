import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { Post } from './entities/post.entity';
import { GroupResolver } from './group.resolver';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserResolver } from './user.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostResolver,
    PostService,
    CategoryResolver,
    UserResolver,
    GroupResolver,
  ],
  exports: [PostService],
})
export class PostModule {}
