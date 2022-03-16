import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  mimetype: string;

  @Field()
  destination: string;

  @Field()
  filename: string;

  @Field()
  path: string;

  @Field()
  categoryId: string;
}
