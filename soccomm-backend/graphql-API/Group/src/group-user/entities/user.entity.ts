import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Group } from "src/group/entities/group.entity";
import { GroupUser } from "./group-user.entity";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive("@external")
  id: string;

  @Field((type) => [GroupUser])
  group?: GroupUser[];
}
