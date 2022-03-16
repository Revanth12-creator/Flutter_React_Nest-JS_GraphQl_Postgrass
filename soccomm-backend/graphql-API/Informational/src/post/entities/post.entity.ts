import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PostAttribute } from 'src/post-attributes/entities/post-attribute.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from './category.entity';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  postTitle: string;

  @Column()
  @Field()
  categoryId: string;

  @Column()
  @Field()
  groupId: string;

  @Column({ default: true, nullable: true })
  @Field(() => Boolean,{nullable:true})
  isBuy?: boolean;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  description: string;

  @Field(() => Category)
  category: Category;

  @Field(() => Group)
  group: Group;

  @Field(() => User)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [PostAttribute])
  @OneToMany(() => PostAttribute, (postattribute) => postattribute.post, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  postattribute: PostAttribute[];
}
