import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) public cartRepository: Repository<Cart>
  ) {}
  async create(createCartInput: CreateCartInput) {
    const cart = await this.cartRepository.create(createCartInput);
    return  this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: string) {
    return this.cartRepository.findOne(id);
  }

  findPost(postId: string) {
    return this.cartRepository.find({ where: { postId } });
  }

  findUser(userId: string) {
    return this.cartRepository.findOne({where:{userId}})
  }

  async update(id: string, updateCartInput: UpdateCartInput) {
    const update = await this.cartRepository.create(updateCartInput)
    return this.cartRepository.update(id, update);
  }

  remove(id: string) {
    return this.cartRepository.delete(id);
  }
}
