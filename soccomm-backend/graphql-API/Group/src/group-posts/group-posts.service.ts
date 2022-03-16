import { Repository } from "typeorm";
import { GroupPost } from "./entities/group-post.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateGroupPostInput } from "./dto/create-group-post.input";
import { UpdateGroupPostInput } from "./dto/update-group-post.input";

@Injectable()
export class GroupPostsService {
  constructor(
    @InjectRepository(GroupPost)
    private readonly grouppostRepo: Repository<GroupPost>
  ) {}
  async create(createGroupPostInput: CreateGroupPostInput) {
    const grouppost = await this.grouppostRepo.create(createGroupPostInput);
    return this.grouppostRepo.save(grouppost);
  }

  findAll() {
    return this.grouppostRepo.find();
  }

  findOne(id: string) {
    return this.grouppostRepo.findOne(id);
  }

  async update(id: string, updateGroupPostInput: UpdateGroupPostInput) {
    const update = await this.grouppostRepo.create(updateGroupPostInput);
    return this.grouppostRepo.update(id, update);
  }

  remove(id: string) {
    return this.grouppostRepo.delete(id);
  }
}
