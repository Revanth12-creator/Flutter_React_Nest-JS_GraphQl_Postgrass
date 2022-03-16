import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationratingInput } from './dto/create-applicationrating.input';
import { UpdateApplicationratingInput } from './dto/update-applicationrating.input';
import { Applicationrating } from './entities/applicationrating.entity';

@Injectable()
export class ApplicationratingService {
  constructor(
    @InjectRepository(Applicationrating)
    private applicationRatingRepo: Repository<Applicationrating>,
  ) {}
  async create(createRatingInput: CreateApplicationratingInput) {
    const rating = await this.applicationRatingRepo.create(createRatingInput);
    return this.applicationRatingRepo.save(rating);
  }

  findAll() {
    return this.applicationRatingRepo.find();
  }

  findOne(id: string) {
    return this.applicationRatingRepo.findOne(id);
  }

  async update(id: string, updateRatingInput: UpdateApplicationratingInput) {
    const update = await this.applicationRatingRepo.create(updateRatingInput);
    return this.applicationRatingRepo.update(id, update);
  }
  findUser(userId: string) {
    return this.applicationRatingRepo.findOne({ userId });
  }
  remove(id: string) {
    return this.applicationRatingRepo.delete(id);
  }
}
