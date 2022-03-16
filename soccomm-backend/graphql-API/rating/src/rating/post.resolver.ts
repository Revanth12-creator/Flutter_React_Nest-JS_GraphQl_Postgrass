import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private ratingService: RatingService) {}

  @ResolveField((of) => [Rating])
  rating(@Parent() post: Post) {
    return this.ratingService.findPost(post.id);
  }
}
