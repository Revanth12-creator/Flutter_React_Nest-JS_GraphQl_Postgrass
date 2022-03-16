import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  postTitle: string;

  @Field()
  categoryId: string;

  @Field()
  groupId: string;

  @Field({ nullable: true })
  isBuy?: boolean;
  
  @Field({ nullable: true })
  userId?: string;

  @Field()
  type: string;

  @Field()
  description: string;
}
