import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateGroupUserInput {
  @Field()
  groupId: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isAdmin?: boolean;
}
