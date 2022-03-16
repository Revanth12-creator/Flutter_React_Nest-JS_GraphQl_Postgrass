import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy, JwtSecret } from './jwt/jwt-auth.strategy';

import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleController } from './google/google.controller';
import { FacebookController } from './facebook/facebook.controller';
import { FacebookService } from './facebook/facebook.service';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleService } from './google/google.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt/jwt-auth.service';
import SmsService from './otp/sms.service';
import SmsController from './otp/sms.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '36000s' },
    }),
    PassportModule,
  ],
  controllers: [GoogleController, FacebookController, SmsController],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    GoogleService,
    FacebookService,
    FacebookStrategy,
    JwtAuthService,
    JwtAuthStrategy,
    GoogleStrategy,
    SmsService,
  ],
})
export class AuthModule {}
