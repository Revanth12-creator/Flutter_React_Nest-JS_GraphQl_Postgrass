import { Post } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { PostService } from './post.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private postService: PostService) {}

  @ResolveField((of) => [Post])
  public post(@Parent() user: User): any {
    console.log(user, 'user');
    return this.postService.findByUseId(user.id);
  }
}
