import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  summery: string;

  @Field()
  userId?: string;

  @Field()
  sendto: string;

  @Field({nullable: true})
  unread?: boolean;
}
