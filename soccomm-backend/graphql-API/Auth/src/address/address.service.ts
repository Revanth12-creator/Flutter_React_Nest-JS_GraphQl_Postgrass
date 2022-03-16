import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    private userService: UserService,
  ) {}
  async create(createAddressInput: CreateAddressInput) {
    const address = await this.addressRepo.create(createAddressInput);
    return await this.addressRepo.save(address);
  }

  findAll() {
    return this.addressRepo.find();
  }

  findOne(id: string) {
    return this.addressRepo.findOne(id);
  }

  update(id: string, updateAddressInput: UpdateAddressInput) {
    return this.addressRepo.update(id, updateAddressInput);
  }

  remove(id: string) {
    return this.addressRepo.delete(id);
  }
  findUser(id: string) {
    return this.userService.findOne(id);
  }

  findPhone(phonenumber: string) {
    return this.addressRepo.findOne({ phonenumber: phonenumber });
  }
}
