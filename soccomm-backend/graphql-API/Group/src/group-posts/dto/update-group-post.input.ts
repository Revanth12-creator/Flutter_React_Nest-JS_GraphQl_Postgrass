import { CreateGroupPostInput } from "./create-group-post.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateGroupPostInput extends PartialType(CreateGroupPostInput) {
  @Field()
  id: string;
}
