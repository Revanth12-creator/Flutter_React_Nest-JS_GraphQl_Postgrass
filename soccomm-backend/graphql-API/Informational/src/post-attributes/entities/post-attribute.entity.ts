import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Attribute } from './attribute.entity';
@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class PostAttribute {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  attributeId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  attributeValue?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  attributeUnit?: string;

  @Field()
  @Column()
  postId: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.postattribute, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  post: Post;

  @Field(() => Attribute)
  attribute: Attribute;
}
