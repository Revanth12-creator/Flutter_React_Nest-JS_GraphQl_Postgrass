import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationratingModule } from './../applicationrating/applicationrating.module';
import { Rating } from './entities/rating.entity';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';
import { UserResolver } from './user.resolver';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), ApplicationratingModule],
  providers: [RatingResolver, RatingService, UserResolver, PostResolver],
})
export class RatingModule {}
