
import { Injectable, Logger } from '@nestjs/common';
import { GoogleInput } from 'src/user/dto/google-user.input';
import { UserService } from 'src/user/user.service';
const logger = new Logger();
@Injectable()
export class GoogleService {
  constructor(private userService: UserService) {}

  async validateUser(userdeatils: GoogleInput) {
    const { googleId } = userdeatils;
    const user = await this.userService.findByGoogleId(googleId);
    if (user) {
      await this.userService.updatebyGoogle(googleId, userdeatils);
      logger.log('Google Details Updated');
      return user;
    }
    return this.userService.createbyGoogle(userdeatils);
  }
}
