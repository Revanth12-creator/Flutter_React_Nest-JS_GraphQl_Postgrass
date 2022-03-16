import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post, PostUpload } from './entities/post.entity';
import { UploadService } from './upload.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private uploadService: UploadService) {}

  @ResolveField((of) => [PostUpload])
  postupload(@Parent() post: Post) {
    return this.uploadService.findByPostId(post.id);
  }
}
