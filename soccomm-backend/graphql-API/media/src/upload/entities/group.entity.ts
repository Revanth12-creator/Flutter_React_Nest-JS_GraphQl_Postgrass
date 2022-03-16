import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { GroupUpload } from './group-upload.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Group {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [GroupUpload])
  groupupload?: GroupUpload[];
}
