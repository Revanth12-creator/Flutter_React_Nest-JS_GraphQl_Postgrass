import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';


@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private postService: PostService) {}

  @ResolveField((of) => [Post])
  public post(@Parent() cateogry: Category): any {
    return this.postService.findByCategory(cateogry.id);
  }
}
