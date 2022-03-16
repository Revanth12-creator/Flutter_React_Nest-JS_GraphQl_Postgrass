import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field((type) => [Post])
  post?: Post[];
}
