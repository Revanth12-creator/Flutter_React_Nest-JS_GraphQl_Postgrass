import { UseGuards } from '@nestjs/common';
import {
    Args, Mutation, Query, ResolveField, Resolver
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
  @UseGuards(GqlAuthGuard)
  @Resolver(() => Address)
  export class AddressResolver {
    constructor(private readonly addressService: AddressService) {}

    @Mutation(() => Address)
    createAddress(
      @Args('createAddressInput') createAddressInput: CreateAddressInput,
      @CurrentUser() user,
    ) {
      let { userId, address1, address2, city, state, zip, phonenumber } =
        createAddressInput;

      userId = user.sub;
      return this.addressService.create({
        userId,
        address1,
        address2,
        city,
        state,
        zip,
        phonenumber,
      });
    }

    @Query(() => [Address], { name: 'Alladdress' })
    findAll() {
      return this.addressService.findAll();
    }

    @Query(() => Address, { name: 'address' })
    findOne(@Args('id') id: string) {
      return this.addressService.findOne(id);
    }

    @Mutation(() => Address)
    updateAddress(
      @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
    ) {
      return this.addressService.update(
        updateAddressInput.id,
        updateAddressInput,
      );
    }

    @Mutation(() => Address)
    removeAddress(@Args('id') id: string) {
      return this.addressService.remove(id);
    }
    @ResolveField(() => User)
    user(@CurrentUser() user) {
      return this.addressService.findUser(user.sub);
    }

    @Query(() => Address)
    phonenumber(@Args('phone') phone: string) {
      return this.addressService.findPhone(phone);
    }
  }
