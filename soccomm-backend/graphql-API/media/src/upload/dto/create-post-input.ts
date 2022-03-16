import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  mimetype: string;

  @Field()
  destination: string;

  @Field()
  filename: string;

  @Field()
  path: string;

  @Field()
  postId: string;
}
