import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { OrderService } from './order.service';


@Resolver((of) => User)
export class UserResolver {
  constructor(private orderService: OrderService) {}

  @ResolveField((of) => [Order])
  public order(@Parent() user: User): any {
    console.log(user, 'user');
    return this.orderService.findByUserId(user.id);
  }
}
