import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Applicationrating } from 'src/applicationrating/entities/applicationrating.entity';

import { Rating } from './rating.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Rating])
  rating?: Rating[];

  @Field((type) => Applicationrating, { nullable: true })
  applicationrating?: Applicationrating;
}
