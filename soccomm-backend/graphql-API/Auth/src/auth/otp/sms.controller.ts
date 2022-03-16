import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Req,
  BadRequestException,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { OtpInput } from 'src/user/dto/otp-user.dto';
import { UserService } from 'src/user/user.service';
import SmsService from './sms.service';

@Controller('sms')
export default class SmsController {
  constructor(
    private readonly smsService: SmsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async initiatePhoneNumberVerification(@Body() otp: OtpInput) {
    return await this.smsService.PhoneNumberVerification(otp.phonenumber);
  }

  @Post('check')
  async verify(@Body() otp: OtpInput) {
    return await this.smsService.confirmPhoneNumber(otp.phonenumber, otp.otp);
  }

  @Get('phone/:phone')
  async getuser(@Param('phone') phone: string) {
    return await this.userService.findByPhone(phone);
  }
}
