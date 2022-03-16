import {
    Args,
    Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { User } from 'src/rating/entities/user.entity';
import { ApplicationratingService } from './applicationrating.service';
import { CreateApplicationratingInput } from './dto/create-applicationrating.input';
import { UpdateApplicationratingInput } from './dto/update-applicationrating.input';
import { Applicationrating } from './entities/applicationrating.entity';

@Resolver(() => Applicationrating)
export class ApplicationratingResolver {
  constructor(
    private readonly applicationRatingService: ApplicationratingService,
  ) {}

  @Mutation(() => Applicationrating)
  createApplicationRating(
    @Args('createApplicationRating')
    createApplicationRating: CreateApplicationratingInput,
    @CurrentUser() user,
  ) {
    let { rating, userId } = createApplicationRating;
    userId = user.sub;
    return this.applicationRatingService.create({ rating, userId });
  }

  @Query(() => [Applicationrating], { name: 'allapplicationratings' })
  findAll() {
    return this.applicationRatingService.findAll();
  }

  @Query(() => Applicationrating, { name: 'rating' })
  findOne(@Args('id') id: string) {
    return this.applicationRatingService.findOne(id);
  }

  @Mutation(() => Applicationrating)
  updateApplicationRating(
    @Args('updateApplicationRating')
    updateApplicationRating: UpdateApplicationratingInput,
  ) {
    return this.applicationRatingService.update(
      updateApplicationRating.id,
      updateApplicationRating,
    );
  }

  @Mutation(() => Applicationrating)
  removeApplicationRating(@Args('id', { type: () => Int }) id: string) {
    return this.applicationRatingService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() rating: Applicationrating) {
    return { __typename: 'User', id: rating.userId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.applicationRatingService.findOne(reference.id);
  }
}
