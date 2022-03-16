import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const { parentId, isActive, isEnd, name, level } = createCategoryInput;
    if (parentId) {
      const parent = await this.categoryRepo.findOne(parentId);
      if (parent.isEnd && parent.isEnd === true) {
        throw new HttpException(
          'This is End level Category you cannot add it as parent to further categories',
          404,
        );
      }
    }

    const category = await this.categoryRepo.create(createCategoryInput);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find({ relations: ['attribute'] });
  }

  findByLevel(level: number) {
    return this.categoryRepo.find({
      where: { level },
      order: { id: 'ASC' },
      relations: ['attribute'],
    });
  }

  getLastLevelCategories() {
    return this.categoryRepo.find({
      where: { isEnd: true },
      order: { id: 'ASC' },
      relations: ['attribute'],
    });
  }

  findCountByLevel(level: number) {
    return this.categoryRepo.count({ where: { level } });
  }

  async findOne(id: string) {
    const cat = await this.categoryRepo.findOne(id, {
      relations: ['attribute'],
    });
    console.log(cat);

    return cat;
  }

  async findParent(parentId: string) {
    if (parentId == '0') {
      return null;
    }
    return await this.categoryRepo.findOne({ id: parentId });
  }

  async findChild(id: string) {
    return await this.categoryRepo.find({ where: { parentId: id } });
  }
  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepo.create(updateCategoryInput);
    return this.categoryRepo.update(id, category);
  }

  remove(id: string) {
    return this.categoryRepo.delete(id);
  }
  findByParentId(parentId: string) {
    return this.categoryRepo.find({
      where: { parentId },
      order: { id: 'ASC' },
      relations: ['attribute'],
    });
  }
}
