import { Category } from '../../category/entities/category.entity';
import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  categoryId: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.attribute, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive?: boolean;
}
