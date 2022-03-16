import { FacebookInput } from '../../user/dto/facebook-user.input';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const logger = new Logger();
@Injectable()
export class FacebookService {
  constructor(private userService: UserService) {}

  async validateUser(userdeatils: FacebookInput) {
    const { facebookId } = userdeatils;
    const user = await this.userService.findByFacebookId(facebookId);
    if (user) {
      await this.userService.updatebyFacebookId(facebookId, userdeatils);
      logger.log('Facebook Details Updated');
      return user;
    }
    return this.userService.createbyFacebookId(userdeatils);
  }
}
