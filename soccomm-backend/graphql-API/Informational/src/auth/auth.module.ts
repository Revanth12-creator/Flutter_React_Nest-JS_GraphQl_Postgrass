import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';
import { Module } from '@nestjs/common';

@Module({
  providers: [JwtAuthStrategy],
})
export class AuthModule {}
