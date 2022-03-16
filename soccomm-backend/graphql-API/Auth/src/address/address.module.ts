import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule],
  providers: [AddressResolver, AddressService],
})
export class AddressModule {}
