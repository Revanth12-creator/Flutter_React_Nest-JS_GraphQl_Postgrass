import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Rating {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  rating: string;

  @Field()
  @Column({ nullable: true })
  feedback?: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  user: User;

  @Field()
  @Column()
  postId: string;

  @Field(() => Post)
  post: Post;
}
