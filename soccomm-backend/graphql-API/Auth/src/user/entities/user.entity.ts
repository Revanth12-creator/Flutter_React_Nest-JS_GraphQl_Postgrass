import { Address } from './../../address/entities/address.entity';
import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles';

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ nullable: true })
  password?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role?: Role;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  googleId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookId?: string;

  @Field(() => [Address], { nullable: true })
  @OneToMany(() => Address, (addres) => addres.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  address: Address[];

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true })
  isactive: boolean;
}

@ObjectType()
export class Jwt {
  @Field()
  token: string;

  @Field()
  userId: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
