import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class DeleteGroupUserInput {
  @Field()
  groupId: string;

  @Field()
  userId: string;
}
