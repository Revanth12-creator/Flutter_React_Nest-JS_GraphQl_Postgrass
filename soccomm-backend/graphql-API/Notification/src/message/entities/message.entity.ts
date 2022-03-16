import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { KnownTypeNamesRule } from 'graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  summary?: string;

  @Field({nullable: true})
  @Column({nullable: true})
  userId: string;

  @Field()
  @Column()
  sendto: string;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;

  @Field()
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  receivedat: Date;

  @Field()
  @Column({ nullable: true, length: 50 })
  createdby: string;

  @Field()
  @Column({ nullable: true, length: 50 })
  receivedby: string;

  @Field({nullable: true})
  @Column({ nullable: true, default: false })
  unread: boolean;

  @Field(() => User)
  user: User;
}
