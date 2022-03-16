import { GroupUser } from "./../group-user/entities/group-user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import { Connection, Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { GroupUserService } from "src/group-user/group-user.service";
import { count } from "console";
import { Between } from "typeorm";
import { MonthsArrayInput } from "./dto/monthsArray";
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(GroupUser) private groupuserRepo: Repository<GroupUser>
  ) {}
  async create(createGroupInput: CreateGroupInput) {
    const { name, type, createruserId, description } = createGroupInput;
    const group = await this.groupRepo.create({
      name,
      type,
      description,
      createdby: createruserId,
      updatedby: createruserId,
    });
    const currentgroup = await this.groupRepo.save(group);
    const groupuser = await this.groupuserRepo.create({
      groupId: currentgroup.id,
      isActive: true,
      isAdmin: true,
      userId: createruserId,
    });
    const save = await this.groupuserRepo.save(groupuser);
    return currentgroup;
  }

  findAll() {
    return this.groupRepo.find({ relations: ["groupusers"] });
  }
  async searchGroupByName(search: string) {
    let data = await this.groupRepo
      .createQueryBuilder()
      .select([
        "Group.id as id",
        "Group.name as name",
        "Group.type as type",
        "Group.isactive as isactive",
        "Group.createdat as createdat",
        "Group.updatedat as updatedat",
        "Group.createdby as createdby",
        "Group.updatedby as updatedby",
        "Group.description as description",
      ])
      .where("name ILIKE :name", { name: `%${search}%` })
      // .andWhere("isactive ILIKE :isactive", { isactive: true })
      .getRawMany();
    return data;
  }
  findAndCountPrivate() {
    return this.groupRepo.find({ where: { type: "private" } });
  }

  findAndCountPublic() {
    return this.groupRepo.find({ where: { type: "public" } });
  }

  findOne(id: string) {
    return this.groupRepo.findOne(id, { relations: ["groupusers"] });
  }

  async getCountOfAllGroups() {
    return await this.groupRepo.count();
  }

  async getGroupCountForGraph(monthsArray: MonthsArrayInput[]) {
    let count: number[] = [];
    for (let i = 0; i < monthsArray.length; i++) {
      console.log("months", monthsArray[i]);
      let { fromDate, toDate } = monthsArray[i];
      const groupCount = await this.groupRepo.count({
        where: {
          createdat: Between(fromDate, toDate),
        },
      });
      count.push(groupCount);
    }
    console.log("group count", count);
    return await count;
  }


  async findAllInRange(fromDate:string,toDate:string){
    return await this.groupRepo.find({ 
      where: {
        createdat: Between(fromDate, toDate),
      },
      relations: ["groupusers"]
    });
  }

  //  async findGroupTypeCount(){
  //     let countOfGrpPrivate=await this.groupRepo
  //       .createQueryBuilder('group')
  //       .select(['COUNT(group.id)'])
  //       .where('type %islike% private')
  //       .getRawMany();
  // console.log('count of private',countOfGrpPrivate);
  // return countOfGrpPrivate;
  //   }

  async update(id: string, updateGroupInput: UpdateGroupInput) {
    const update = await this.groupRepo.create(updateGroupInput);
    return this.groupRepo.update(id, update);
  }

  remove(id: string) {
    return this.groupRepo.delete(id);
  }
  async findgroupBUserId(userId: string) {
    const group = await this.groupuserRepo.find({ userId });
    console.log(group);
    return group;
  }
  async findByType(type: string) {
    return this.groupRepo.find({ where: { type } });
  }
}
