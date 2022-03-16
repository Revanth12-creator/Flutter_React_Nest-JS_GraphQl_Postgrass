import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
//import * as SC from 'socketcluster-client';

// var socket = SC.create({
//   hostname: 'socket',
//   port: 8000,
// });
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) public messageRepository: Repository<Message>,
  ) {}
 async create(createMessageInput: CreateMessageInput) {
    let data = await this.messageRepository.create(createMessageInput);
  //  await socket.invokePublish('message', "DATA");
    return this.messageRepository.save(data)
  }

  findAll() {
    return this.messageRepository.find();
  }

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  async getMessageByUserId(fromDate: string, toDate: string, userId: string) {
    let messages = await this.messageRepository.find({
      where: {
        userId,
        createdAt: LessThanOrEqual(toDate) && MoreThanOrEqual(fromDate),
      },
      order: { userId: 'ASC' },
    });
    console.log('messages', messages);
    return messages;
  }

  async findByUserId(userId: string) {
    return await this.messageRepository.find({ where: { userId: userId } });
  }


  remove(id: string) {
    return this.messageRepository.delete(id);
  }
}
