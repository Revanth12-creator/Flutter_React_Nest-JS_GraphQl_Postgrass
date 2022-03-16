import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';
import { OrderService } from './order.service';

@Resolver((of) => User)
export class PostResolver {
  constructor(private orderService: OrderService) {}

  @ResolveField((of) => [Order])
  public order(@Parent() post: Post): any {
    return this.orderService.findByPostId(post.id);
  }
}
