import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field(() => Int)
  level: number;

  @Field({ nullable: true })
  isActive?: boolean;


  @Field({ nullable: true, defaultValue: false })
  isEnd?: boolean;
}
