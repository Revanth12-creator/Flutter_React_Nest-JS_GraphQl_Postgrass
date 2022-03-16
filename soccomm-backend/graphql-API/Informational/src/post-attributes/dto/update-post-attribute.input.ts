import { CreatePostAttributeInput } from './create-post-attribute.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostAttributeInput extends PartialType(
  CreatePostAttributeInput,
) {
  @Field()
  id: string;
}
