import { Directive, Field, ObjectType, ID } from '@nestjs/graphql';
import { Cart } from './cart.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Post {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Cart])
  cart: Cart[];
}
