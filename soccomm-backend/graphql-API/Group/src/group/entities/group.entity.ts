import { ObjectType, Field, Int, ID, Directive } from "@nestjs/graphql";
import { GroupUser } from "src/group-user/entities/group-user.entity";

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupType } from "./group";

@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Group {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ type: "enum", enum: GroupType, default: GroupType.PUBLIC })
  type: GroupType;

  @Field()
  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat: Date;

  @Field()
  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  updatedat: Date;

  @Field()
  @Column({ nullable: true, length: 50 })
  createdby: string;

  @Field()
  @Column({ nullable: true, length: 50 })
  updatedby: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [GroupUser])
  @OneToMany(() => GroupUser, (groupuser) => groupuser.group, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  groupusers: GroupUser[];

  @Field(() => Boolean)
  @Column({ default: true })
  isactive?: boolean;
}
