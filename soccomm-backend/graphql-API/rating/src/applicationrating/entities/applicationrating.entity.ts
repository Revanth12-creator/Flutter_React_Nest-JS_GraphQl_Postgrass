import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { User } from 'src/rating/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Applicationrating {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  rating: string;

  @Field()
  @Column()
  userId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  feedback?: string;

  @Field(() => User)
  user: User;
}
