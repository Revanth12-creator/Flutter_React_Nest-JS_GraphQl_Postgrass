import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}
  create(createMessageInput: CreateMessageInput) {
    let data = this.messageRepo.create(createMessageInput);
    return this.messageRepo.save(data);
  }

  findAll() {
    return this.messageRepo.find();
  }

  findOne(id: string) {
    return this.messageRepo.findOne({ where: { id: id } });
  }

  update(id: string, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
