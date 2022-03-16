import { Order } from './order.entity';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field((type) => [Order])
  order?: Order[];
}
