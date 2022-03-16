import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from './entities/message.entity';
import { User } from './entities/user.entity';
import { MessageService } from './message.service';


@Resolver((of) => User)
export class UserResolver {
  constructor(private messageService: MessageService) {}

  @ResolveField((of) => [Message])
  public message(@Parent() user: User): any {
    console.log(user, 'user');
    return this.messageService.findByUserId(user.id);
  }
}
