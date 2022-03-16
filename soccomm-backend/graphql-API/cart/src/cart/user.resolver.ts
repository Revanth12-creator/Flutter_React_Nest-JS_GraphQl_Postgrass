import { CartService } from './cart.service';
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { Cart } from './entities/cart.entity';

@Resolver((of)=> User)
export class UserResolver{
    constructor (public cartService: CartService) { }
    @ResolveField((of) => [Cart])
    public cart(@Parent() user: User): any {
        return this.cartService.findUser(user.id)
    }
}