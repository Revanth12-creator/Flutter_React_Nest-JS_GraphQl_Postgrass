import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}

@InputType()
export class JwtUser {
  @Field()
  token: string;

  @Field()
  userId: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
