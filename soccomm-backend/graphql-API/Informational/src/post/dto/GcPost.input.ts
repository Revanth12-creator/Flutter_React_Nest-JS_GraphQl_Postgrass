import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GcPostInput {
  @Field()
  groupId: string;

  @Field()
  categoryId: string;
}
