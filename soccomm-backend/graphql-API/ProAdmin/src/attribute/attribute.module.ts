import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './attribute.resolver';
import { Attribute } from './entities/attribute.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, Category])],
  providers: [AttributeResolver, AttributeService],
})
export class AttributeModule {}
