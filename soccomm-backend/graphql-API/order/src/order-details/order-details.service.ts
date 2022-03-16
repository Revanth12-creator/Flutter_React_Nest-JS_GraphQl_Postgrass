import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}
  async create(createOrderDetailInput: CreateOrderDetailInput) {
    const details = await this.orderDetailRepo.create(createOrderDetailInput);
    return this.orderDetailRepo.save(details);
  }

  async findAll() {
    return await this.orderDetailRepo.find();
  }

  async findOne(id: string) {
    return await this.orderDetailRepo.findOne(id);
  }
  async findOrder(id: string) {
    return await this.orderRepo.findOne(id);
  }

  async findOrderByUserId(userId: string) {
    const order = await this.orderDetailRepo.find({ where: { userId } });

    return order;
  }

  async update(id: string, updateOrderDetailInput: UpdateOrderDetailInput) {
    return await this.orderDetailRepo.update(id, updateOrderDetailInput);
  }

  async remove(id: string) {
    return await this.orderDetailRepo.delete(id);
  }
}
