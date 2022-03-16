import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './entities/post.entity';

@ObjectType()
export class NoOfPostsForCatType {
  @Field()
  post_categoryId: string;

  @Field()
  count: number;
}
