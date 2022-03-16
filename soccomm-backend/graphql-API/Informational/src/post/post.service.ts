import { GcPostInput } from './dto/GcPost.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { MonthsArrayInput } from './dto/monthsArray';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) public postRepo: Repository<Post>) {}
  create(createPostInput: CreatePostInput) {
    let data = this.postRepo.create(createPostInput);
    return this.postRepo.save(data);
  }

  findAll() {
    return this.postRepo.find({ relations: ['postattribute'] });
  }

  async findAllInDescOrder() {
    return await this.postRepo.find({ 
      relations: ['postattribute'], 
      order: { createdAt: "DESC" } 
    });
  }

  findOne(id: string) {
    return this.postRepo.findOne(id, { relations: ['postattribute'] });
  }

  async getCountOfAllPosts() {
    return await this.postRepo.count();
  }

  async getPostsByCatId(fromDate: string, toDate: string, catId: string) {
    let posts = await this.postRepo.find({
      createdAt: Between(fromDate, toDate),
      categoryId: catId,
    });
    console.log('posts', posts);
    return posts;
  }

  async getPostsForCategories(fromDate: string, toDate: string) {
    console.log('from date', fromDate, 'to Date', toDate);
    const data = this.postRepo.find({
      createdAt: Between(fromDate, toDate),
    });
    console.log('data is', data);
    return data;
  }

  //this function is not being used
  async getPostCountForCategories(fromDate: string, toDate: string) {
    console.log('from date', fromDate, 'to Date', toDate);
    const data = this.postRepo.find({
      createdAt: Between(fromDate, toDate),
    });
    let postCount: Number[] = [];
    (await data).map(async (value) => {
      const count = await this.postRepo.count({
        where: {
          categoryId: value.categoryId,
        },
      });
      console.log('count is', count);
      postCount.push(count);
      console.log('array is', postCount);
    });
    return postCount;
  }

  async getPostCountForGraph(monthsArray: MonthsArrayInput[]) {
    let count: number[] = [];
    for (let i = 0; i < monthsArray.length; i++) {
      console.log('months', monthsArray[i]);
      let { fromDate, toDate } = monthsArray[i];
      const postCount = await this.postRepo.count({
        where: {
          createdAt: Between(fromDate, toDate),
        },
      });
      count.push(postCount);
    }
    console.log('post count', count);
    return await count;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const update = await this.postRepo.create(updatePostInput);
    let data = await this.postRepo.update(id, update);
    return data;
  }

  async remove(id: string) {
    return await this.postRepo.delete(id);
  }

  async findByCategory(categoryId: string) {
    return await this.postRepo.find({ where: { categoryId: categoryId } });
  }
  async findByGroup(groupId: string) {
    return await this.postRepo.find({
      where: { groupId },
      relations: ['postattribute'],
    });
  }
  async findByGroup1(gcPost:GcPostInput) {
    let { groupId, categoryId }= gcPost
    return await this.postRepo.find({
      where: { groupId, categoryId },
      relations: ['postattribute'],
    });
  }
  async findByPostAttribute(postAttributeId: string) {
    return await this.postRepo.find({ where: { postAttributeId } });
  }

  async findBySubCategory(subcategoryId: string) {
    return await this.postRepo.find({
      where: { subcategoryId: subcategoryId },
    });
  }
  async findByUseId(userId: string) {
    return await this.postRepo.find({ where: { userId: userId } });
  }

  async findCount() {
    return await this.postRepo.count();
  }
}
