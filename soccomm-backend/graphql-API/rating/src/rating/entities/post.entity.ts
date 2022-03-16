import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Rating } from './rating.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Rating])
  rating?: Rating[];
}
