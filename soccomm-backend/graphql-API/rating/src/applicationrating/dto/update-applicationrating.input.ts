import { CreateApplicationratingInput } from './create-applicationrating.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApplicationratingInput extends PartialType(
  CreateApplicationratingInput,
) {
  @Field()
  id: string;
}
