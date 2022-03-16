import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingRepositiry: Repository<Rating>,
  ) {}

  async create(createRatingInput: CreateRatingInput) {
    const rating = await this.ratingRepositiry.create(createRatingInput);
    return this.ratingRepositiry.save(rating);
  }

  findAll() {
    return this.ratingRepositiry.find();
  }

  findOne(id: string) {
    return this.ratingRepositiry.findOne(id);
  }

  update(id: string, updateRatingInput: UpdateRatingInput) {
    return this.ratingRepositiry.update(id, updateRatingInput);
  }
  findUser(userId: string) {
    return this.ratingRepositiry.find({ where: { userId } });
  }

  findPost(postId: string) {
    return this.ratingRepositiry.find({ where: { postId } });
  }

  remove(id: string) {
    return this.ratingRepositiry.delete(id);
  }
}
