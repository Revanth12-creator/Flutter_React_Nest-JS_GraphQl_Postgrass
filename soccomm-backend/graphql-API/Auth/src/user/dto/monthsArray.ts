import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MonthsArrayInput {
  @Field()
  fromDate: string;

  @Field()
  toDate: string;
}
