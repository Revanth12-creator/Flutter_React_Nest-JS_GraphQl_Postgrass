import { CreateGroupUserInput } from "./create-group-user.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateGroupUserInput extends PartialType(CreateGroupUserInput) {
  @Field()
  id: string;
}
