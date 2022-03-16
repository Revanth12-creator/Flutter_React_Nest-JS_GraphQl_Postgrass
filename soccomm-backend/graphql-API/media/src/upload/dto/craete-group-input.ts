import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field({ nullable: true })
  mimetype?: string;

  @Field({ nullable: true })
  destination?: string;

  @Field({ nullable: true })
  filename?: string;

  @Field({ nullable: true })
  path?: string;

  @Field()
  groupId: string;
}
