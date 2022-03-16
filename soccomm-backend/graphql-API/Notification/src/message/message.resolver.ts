import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
@Resolver((of) => Message)
@UseGuards(GqlAuthGuard)
export class MessageResolver {
  constructor(public readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user,
  ) {
    let { description, title, summery, userId, sendto, unread } =
      createMessageInput;
    userId = user.sub;
    console.log(user)
    return this.messageService.create({
      description,
      title,
      summery,
      userId,
      sendto,
      unread,
    });
  }

  @Query(() => [Message], { name: 'allmessage' })
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Query(() => [Message])
  getPostsByCategoryId(
    @Args('fromDate', { type: () => String }) fromDate: string,
    @Args('toDate', { type: () => String }) toDate: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.messageService.getMessageByUserId(fromDate, toDate, userId);
  }

  @Mutation(() => Message)
  removeMessage(@Args('id') id: string) {
    return this.messageService.remove(id);
  }
}
