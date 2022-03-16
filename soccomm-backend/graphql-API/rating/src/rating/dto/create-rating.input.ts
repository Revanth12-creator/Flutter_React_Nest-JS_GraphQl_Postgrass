import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field()
  rating: string;
  @Field()
  feedback: string;

  @Field()
  postId: string;

  @Field({ nullable: true })
  userId?: string;
}
