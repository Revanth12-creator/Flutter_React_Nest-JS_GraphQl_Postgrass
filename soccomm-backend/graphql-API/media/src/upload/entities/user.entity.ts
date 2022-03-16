import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Upload } from './upload.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Upload])
  upload?: Upload[];
}
