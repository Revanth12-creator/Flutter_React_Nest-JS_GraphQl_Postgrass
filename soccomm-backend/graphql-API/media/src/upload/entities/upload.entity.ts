import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Upload {
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
  userId: string;

  @Field(() => User)
  user: User;
}
