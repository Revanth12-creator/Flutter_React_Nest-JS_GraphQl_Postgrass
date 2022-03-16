import { InputType, Int, Field } from "@nestjs/graphql";
import { GroupType } from "../entities/group";

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field()
  type: GroupType;

  @Field({ nullable: true })
  createruserId?: string;

  @Field({ nullable: true })
  isactive?: boolean;

  @Field({ nullable: true })
  description?: string;
}
