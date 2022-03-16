import { CartService } from './cart.service';
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "./entities/post.entity";
import { Cart } from './entities/cart.entity';

@Resolver((of) => Post)
export class PostResolver{
    constructor (private cartService: CartService) { }

    @ResolveField((of) => [Cart])
    public Cart(@Parent() post: Post): any {
        return this.cartService.findPost(post.id)
    }
}