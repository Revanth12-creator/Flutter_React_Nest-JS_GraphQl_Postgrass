import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Category {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [CategoryUpload])
  categoryupload?: CategoryUpload[];
}
@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class CategoryUpload {
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
  categoryId: string;

  @Field(() => Category)
  category: Category;
}
