import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateApplicationratingInput {
  @Field()
  rating: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  feedback?: string;
}
