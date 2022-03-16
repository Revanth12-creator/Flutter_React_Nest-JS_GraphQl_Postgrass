import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateGroupPostInput {
  @Field()
  groupId: string;

  @Field()
  postId: string;
}
