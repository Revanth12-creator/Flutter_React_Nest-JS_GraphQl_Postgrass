import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicationratingService } from 'src/applicationrating/applicationrating.service';
import { Applicationrating } from 'src/applicationrating/entities/applicationrating.entity';
import { Rating } from './entities/rating.entity';
import { User } from './entities/user.entity';
import { RatingService } from './rating.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    public ratingService: RatingService,
    public applicationRatingService: ApplicationratingService,
  ) {}

  @ResolveField((of) => [Rating])
  public rating(@Parent() user: User): any {
    console.log(user, 'user');
    return this.ratingService.findUser(user.id);
  }

  @ResolveField((of) => Applicationrating)
  public applicationrating(@Parent() user: User): any {
    console.log(user, 'user');
    return this.applicationRatingService.findUser(user.id);
  }
}
