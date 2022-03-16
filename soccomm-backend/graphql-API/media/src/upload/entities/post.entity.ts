import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [PostUpload])
  postupload?: PostUpload[];
}
@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class PostUpload {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  mimetype: string;

  @Field()
  @Column()
  destination: string;

  @Field()
  @Column()
  filename: string;

  @Field()
  @Column()
  path: string;

  @Field()
  @Column()
  postId: string;

  @Field(() => Post)
  post: Post;
}
