import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Address } from './entities/address.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { OrderService } from './order.service';

@Resolver((of) => User)
export class AddressResolver {
  constructor(private orderService: OrderService) {}

  @ResolveField((of) => [Order])
  public order(@Parent() address: Address): any {
    return this.orderService.findByAddressId(address.id);
  }
}
