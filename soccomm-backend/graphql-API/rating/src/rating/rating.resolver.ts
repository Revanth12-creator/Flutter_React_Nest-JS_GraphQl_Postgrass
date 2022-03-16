import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { Rating } from './entities/rating.entity';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { RatingService } from './rating.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => Rating)
  createRating(
    @Args('createRatingInput') createRatingInput: CreateRatingInput,
    @CurrentUser() user,
  ) {
    let { rating, postId, userId, feedback } = createRatingInput;
    userId = user.sub;
    return this.ratingService.create({ rating, postId, userId, feedback });
  }

  @Query(() => [Rating], { name: 'allratings' })
  findAll() {
    return this.ratingService.findAll();
  }

  @Query(() => Rating, { name: 'rating' })
  findOne(@Args('id') id: string) {
    return this.ratingService.findOne(id);
  }

  @Mutation(() => Rating)
  updateRating(
    @Args('updateRatingInput') updateRatingInput: UpdateRatingInput,
  ) {
    return this.ratingService.update(updateRatingInput.id, updateRatingInput);
  }

  @Mutation(() => Rating)
  removeRating(@Args('id', { type: () => Int }) id: string) {
    return this.ratingService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() rating: Rating) {
    return { __typename: 'User', id: rating.userId };
  }

  @ResolveField((of) => Post)
  post(@Parent() rating: Rating) {
    return { __typename: 'Post', id: rating.postId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ratingService.findOne(reference.id);
  }
}
