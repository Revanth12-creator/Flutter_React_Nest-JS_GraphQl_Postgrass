import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
    Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
@ObjectType()
@Entity()
export class Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  phonenumber: string;

  @Field()
  @Column({ nullable: false, length: 50 })
  address1: string;

  @Field()
  @Column({ nullable: false, length: 50 })
  address2: string;

  @Field()
  @Column({ default: null, length: 20 })
  city: string;

  @Field()
  @Column({ default: null, length: 20 })
  state: string;

  @Field()
  @Column({ default: null, length: 6 })
  zip: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.address, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
