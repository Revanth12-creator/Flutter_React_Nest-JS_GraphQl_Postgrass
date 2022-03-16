import {
  Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailsService } from './order-details.service';

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(
    @Args('createOrderDetailInput')
    createOrderDetailInput: CreateOrderDetailInput,
    @CurrentUser() user,
  ) {
    let { orderId, userId, orderqty, orderAmount } = createOrderDetailInput;
    userId: user.sub;
    return this.orderDetailsService.create({
      orderId,
      userId,
      orderqty,
      orderAmount,
    });
  }

  @Query(() => [OrderDetail], { name: 'allorderDetails' })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Query(() => OrderDetail, { name: 'orderDetail' })
  findOne(@Args('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Mutation(() => OrderDetail)
  updateOrderDetail(
    @Args('updateOrderDetailInput')
    updateOrderDetailInput: UpdateOrderDetailInput,
  ) {
    return this.orderDetailsService.update(
      updateOrderDetailInput.id,
      updateOrderDetailInput,
    );
  }

  @Mutation(() => OrderDetail)
  removeOrderDetail(@Args('id') id: string) {
    return this.orderDetailsService.remove(id);
  }

  @ResolveField(() => Order)
  order(@Parent() orderDetail: OrderDetail) {
    return this.orderDetailsService.findOrder(orderDetail.orderId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.orderDetailsService.findOne(reference.id);
  }
}
