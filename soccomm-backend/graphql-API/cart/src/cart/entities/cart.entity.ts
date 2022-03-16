import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
export class Cart {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  postId: string;

  @Field()
  @Column({ default: 0, type: 'decimal' })
  itemprice: number;

  @Field()
  @Column()
  itemquantity: number;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;
}
