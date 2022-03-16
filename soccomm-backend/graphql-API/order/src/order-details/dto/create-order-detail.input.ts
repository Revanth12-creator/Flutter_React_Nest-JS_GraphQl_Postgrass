import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  @Field()
  orderId: string;

  @Field()
  orderqty: number;

  @Field()
  orderAmount: number;

  @Field({ nullable: true })
  userId?: string;
}
