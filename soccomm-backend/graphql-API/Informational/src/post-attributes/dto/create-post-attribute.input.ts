import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostAttributeInput {
  @Field()
  attributeId: string;

  @Field({ nullable: true })
  attributeValue?: string;

  @Field({ nullable: true })
  attributeUnit?: string;

  @Field()
  postId: string;
}
