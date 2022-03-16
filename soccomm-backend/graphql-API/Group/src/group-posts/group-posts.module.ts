import { GroupPost } from "./entities/group-post.entity";
import { Module } from "@nestjs/common";
import { GroupPostsService } from "./group-posts.service";
import { GroupPostsResolver } from "./group-posts.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([GroupPost])],
  providers: [GroupPostsResolver, GroupPostsService],
  exports: [GroupPostsService],
})
export class GroupPostsModule {}
