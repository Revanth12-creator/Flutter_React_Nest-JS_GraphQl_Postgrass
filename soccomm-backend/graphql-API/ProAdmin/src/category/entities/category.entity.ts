import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true, default: '0' })
  @Field({ nullable: true })
  parentId?: string;

  @Field(() => Category, { nullable: true })
  parent: Category;

  @Field(() => [Category], { nullable: true })
  child: Category[];

  @Column()
  @Field(() => Int)
  level: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => [Attribute], { nullable: true })
  @OneToMany(() => Attribute, (attribute) => attribute.category, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  attribute: Attribute;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive?: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isEnd?: boolean;
}
