import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '../roles';
import { IsEmail, IsOptional, IsString } from 'class-validator';
registerEnumType(Role, {
  name: 'Role',
});
@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @IsEmail()
  @Field()
  email: string;

  @IsOptional()
  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  role?: Role;

  @Field({ nullable: true })
  isactive?: boolean;

  @Field({ nullable: true })
  lastLogin?: Date;
}
