import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class GroupUpload {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mimetype?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  destination?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  filename?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  path?: string;

  @Field()
  @Column()
  groupId: string;

  @Field(() => Group)
  group: Group;
}
