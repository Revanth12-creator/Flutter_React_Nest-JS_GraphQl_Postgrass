import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) public orderRepository: Repository<Order>,
  ) {}
  create(createOrderInput: CreateOrderInput) {
    const order = this.orderRepository.create(createOrderInput);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne(id);
  }
  findByUserId(id: string) {
    return this.orderRepository.find({ where: { userId: id } });
  }
  findByAddressId(id: string) {
    return this.orderRepository.find({ where: { addressId: id } });
  }
  findByPostId(id: string) {
    return this.orderRepository.find({ where: { postId: id } });
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    const update = await this.orderRepository.create(updateOrderInput);
    return this.orderRepository.update(id, update);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }

  async findorderbyuserId(userId: string) {
    const order = await this.orderRepository.find({ userId });
    return order;
  }
}
