import { ObjectType, Field, Int, Directive, ID } from "@nestjs/graphql";
import { Group } from "src/group/entities/group.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class GroupUser {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  groupId: string;

  @Column()
  @Field()
  userId: string;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isAdmin?: boolean;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  @Field({ nullable: true })
  createdAt: Date;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.groupusers, {
    nullable: true,
    onDelete: "CASCADE",
  })
  group: Group;

  @Field(() => User)
  user: User;
}
