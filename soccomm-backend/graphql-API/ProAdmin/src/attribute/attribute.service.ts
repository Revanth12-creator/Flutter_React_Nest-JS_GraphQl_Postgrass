import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './../category/entities/category.entity';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute) private attributeRepo: Repository<Attribute>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  async create(createAttributeInput: CreateAttributeInput) {
    const attrbute = await this.attributeRepo.create(createAttributeInput);
    return this.attributeRepo.save(attrbute);
  }

  findAll() {
    return this.attributeRepo.find();
  }

  findOne(id: string) {
    return this.attributeRepo.findOne(id);
  }

  findCategory(categoryId: string) {
    return this.categoryRepo.findOne(categoryId);
  }

  async update(id: string, updateAttributeInput: UpdateAttributeInput) {
    const attrbute = await this.attributeRepo.create(updateAttributeInput);
    return this.attributeRepo.update(id, attrbute);
  }

  remove(id: string) {
    return this.attributeRepo.delete(id);
  }
}
