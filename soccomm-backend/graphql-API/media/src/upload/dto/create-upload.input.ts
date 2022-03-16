import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUploadInput {

  @Field()
  mimetype: string;

  @Field()
  destination: string;

  @Field()
  filename: string;

  @Field()
  path: string;

  @Field()
  userId: string;
}
