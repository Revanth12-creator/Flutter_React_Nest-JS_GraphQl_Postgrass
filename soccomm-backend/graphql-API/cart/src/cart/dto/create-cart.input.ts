import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field()
  postId: string;

  @Field()
  itemprice: number;

  @Field()
  itemquantity: number;

  @Field({ nullable: true })
  userId?: string;
}
