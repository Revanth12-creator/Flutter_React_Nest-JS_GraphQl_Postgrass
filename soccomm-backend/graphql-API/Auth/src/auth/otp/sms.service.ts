import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Twilio } from 'twilio';
const logger = new Logger();
export type JwtUser = { token: string; userId: string };
@Injectable()
export default class SmsService {
  private twilioClient: Twilio;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    const accountSid = process.env.TwilloAccountSID;
    const authToken = process.env.TwilloAuthToken;

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  PhoneNumberVerification(phoneNumber: string) {
    const serviceSid = process.env.TwilloVerficationServiceSID;
    return this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms', locale: 'en' });
  }
  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    const serviceSid = process.env.TwilloVerficationServiceSID;
    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }
    const address = await this.userService.findPhone(phoneNumber)
     if (!address) {
       return 'Currently you have Limited Access to the application, Please Register Your Account for Fully Acesss';
     }
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user) {
      return 'Currently you have Limited Access to the application, Please Register Your Account for Fully Acesss';
    }
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    logger.log('LoggedIn User', JSON.stringify(user));
    const token = await this.jwtService.sign(payload);
    const login1: JwtUser = {
      token: token,
      userId: user.id,
    };
    return login1;
  }
}
