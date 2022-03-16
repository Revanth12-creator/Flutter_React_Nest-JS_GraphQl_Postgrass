import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostAttributeInput } from './dto/create-post-attribute.input';
import { UpdatePostAttributeInput } from './dto/update-post-attribute.input';
import { PostAttribute } from './entities/post-attribute.entity';

@Injectable()
export class PostAttributesService {
  constructor(
    @InjectRepository(PostAttribute)
    private postattributeRepo: Repository<PostAttribute>,
  ) {}
  async create(
    createPostAttributeInput: CreatePostAttributeInput[],
  ): Promise<any> {
    const create = await this.postattributeRepo.create(
      createPostAttributeInput,
    );
    return this.postattributeRepo.save(create);
  }

  findAll() {
    return this.postattributeRepo.find();
  }

  findOne(id: string) {
    return this.postattributeRepo.findOne(id);
  }

  async update(id: string, updatePostAttributeInput: UpdatePostAttributeInput) {
    const update = await this.postattributeRepo.create(
      updatePostAttributeInput,
    );
    return this.postattributeRepo.update(id, update);
  }
  async findByPost(postId: string) {
    return await this.postattributeRepo.find({ where: { postId } });
  }
  async findByAttribute(attributeId: string) {
    return await this.postattributeRepo.find({ where: { attributeId } });
  }

  remove(id: string) {
    return this.postattributeRepo.delete(id);
  }
}
