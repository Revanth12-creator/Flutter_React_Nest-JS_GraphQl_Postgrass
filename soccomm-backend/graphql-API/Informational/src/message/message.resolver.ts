import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messageAll' })
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => Message, { name: 'messageOne' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => String }) id: string) {
    return this.messageService.remove(id);
  }
}
