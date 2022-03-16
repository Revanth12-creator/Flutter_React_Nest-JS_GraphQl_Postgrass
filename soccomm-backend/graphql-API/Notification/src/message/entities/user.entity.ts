import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field((type) => [Message])
  message?: Message[];
}
