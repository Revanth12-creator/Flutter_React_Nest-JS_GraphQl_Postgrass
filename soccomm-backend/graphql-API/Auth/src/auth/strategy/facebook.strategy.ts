import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { FacebookService } from '../facebook/facebook.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private facebookService: FacebookService) {
    super({
      clientID: process.env.FacebookClientID,
      clientSecret: process.env.FacebookClientSecret,
      callbackURL: process.env.FacebookCallbackURL,
      scope: 'email',
      profileFields: ['emails', 'name', 'displayName', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { emails, name, displayName, photos, id } = profile;
    const user = {
      email: emails[0].value,
      facebookId: id,
      username: displayName,
      avatar: photos[0].value,
    };
    const payload = {
      user,
      accessToken,
    };
    return this.facebookService.validateUser(user);

    //return this.facebookService.validateUser(user);
  }
}
