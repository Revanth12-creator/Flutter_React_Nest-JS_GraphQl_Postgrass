import { Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Address } from './entities/address.entity';
import { Order } from './entities/order.entity';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user,
  ) {
    let { orderamount, shippingdate, orderstatus, orderqty,addressId, userId } =
      createOrderInput;
    userId = user.sub;
    return this.orderService.create({orderamount, orderqty, orderstatus, shippingdate,addressId, userId});
  }

  @Query(() => [Order], { name: 'allorders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() order: Order) {
    return {__typename: "User", id: order.userId}
  }
  @ResolveField((of) => Address)
  address(@Parent() order: Order) {
    return {__typename: "Address", id: order.addressId}
  }
  @ResolveField((of) => Post)
  post(@Parent() order: Order) {
    return {__typename: "Post", id: order.postId}
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.orderService.findOne(reference.id)
  }


  @Query(() => [OrderDetail])
  getorders(@CurrentUser() user) {
    return this.orderService.findorderbyuserId(user.sub)
  }
}
