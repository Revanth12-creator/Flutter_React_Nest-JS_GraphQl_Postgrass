import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Group } from './entities/group.entity';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver((of) => Group)
export class GroupResolver {
  constructor(private postService: PostService) {}

  @ResolveField((of) => [Post])
  public post(@Parent() cateogry: Group): any {
    return this.postService.findByGroup(cateogry.id);
  }
}
