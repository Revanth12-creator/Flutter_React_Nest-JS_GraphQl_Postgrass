import { Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(
    @Args('createCartInput') createCartInput: CreateCartInput,
    @CurrentUser() user) {
     let { postId, itemprice,itemquantity ,userId } =
       createCartInput;
    userId = user.sub;
    return this.cartService.create({ postId, itemprice, itemquantity,userId });
  }

  @Query(() => [Cart], { name: 'allcartitems' })
  findAll() {
    return this.cartService.findAll();
  }

  @Query(() => Cart, { name: 'cartitem' })
  findOne(@Args('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => Cart)
  updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return this.cartService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id') id: string) {
    return this.cartService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() cart: Cart) {
    return { __typename: 'User', id: cart.userId };
  }

  @ResolveField((of) => Post)
  post(@Parent() cart: Cart) {
    return { __typename: 'Post', id: cart.postId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.cartService.findOne(reference.id);
  }
}
