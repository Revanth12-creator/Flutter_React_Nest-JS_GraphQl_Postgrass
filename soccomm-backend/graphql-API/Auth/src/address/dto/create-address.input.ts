import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsAlphanumeric,
  IsString,
  IsNumber,
} from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field({ nullable: true })
  userId: string;

  @IsOptional()
  @Field()
  phonenumber: string;

  @Field()
  address1: string;

  @Field()
  address2: string;

  @Field()
  state: string;

  @Field()
  city: string;

  @Field()
  zip: string;
}
