import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from './order.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Order])
  order?: Order[];
}
