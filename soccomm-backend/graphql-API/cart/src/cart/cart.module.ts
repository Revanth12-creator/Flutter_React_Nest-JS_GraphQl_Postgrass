import { Cart } from './entities/cart.entity';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartResolver, CartService, UserResolver, PostResolver]
})
export class CartModule {}
