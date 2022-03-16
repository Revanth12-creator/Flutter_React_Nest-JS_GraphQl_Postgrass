import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Address } from 'src/address/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
