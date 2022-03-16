import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  orderamount: number;

  @Field()
  shippingdate: string;

  @Field()
  orderstatus: string;

  @Field()
  orderqty: number;

  @Field({nullable: true})
  userId?: string;

  @Field()
  addressId: string;
}
