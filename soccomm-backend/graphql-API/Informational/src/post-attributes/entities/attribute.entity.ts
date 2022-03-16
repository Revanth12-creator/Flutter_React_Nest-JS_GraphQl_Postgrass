import { PrimaryGeneratedColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PostAttribute } from './post-attribute.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Attribute {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field((type) => [PostAttribute])
  postattribute?: PostAttribute[];
}
