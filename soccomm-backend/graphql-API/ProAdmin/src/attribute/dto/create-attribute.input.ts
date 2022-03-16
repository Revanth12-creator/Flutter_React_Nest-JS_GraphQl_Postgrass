import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
