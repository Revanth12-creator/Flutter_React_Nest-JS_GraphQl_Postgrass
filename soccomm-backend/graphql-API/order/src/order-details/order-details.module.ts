import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderModule } from 'src/order/order.module';
import { OrderDetailsResolver } from './order-details.resolver';
import { OrderDetailsService } from './order-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), OrderModule],
  providers: [OrderDetailsResolver, OrderDetailsService],
})
export class OrderDetailsModule {}
