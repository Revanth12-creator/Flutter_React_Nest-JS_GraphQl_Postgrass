import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressResolver } from './address.resolver';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderResolver, OrderService, UserResolver, AddressResolver],
  exports: [OrderService]
})
export class OrderModule {}
