import { GoogleInput } from '../../user/dto/google-user.input';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleService } from '../google/google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private googleService: GoogleService) {
    super({
      clientID: process.env.ClientID,
      clientSecret: process.env.ClientSecret,
      callbackURL: process.env.CallbackURL,
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails, photos, displayName, id } = profile;
    const userdetails: GoogleInput = {
      username: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
      googleId: id,
    };
    return this.googleService.validateUser(userdetails);
  }
}
