import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUploadInput } from './create-upload.input';

@InputType()
export class UpdateUploadInput extends PartialType(CreateUploadInput) {
  @Field()
  id: string;
}
