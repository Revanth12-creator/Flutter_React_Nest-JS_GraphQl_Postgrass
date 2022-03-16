import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  title?: string;

  @Field()
  summary?: string;

  @Field()
  description?: string;
}
