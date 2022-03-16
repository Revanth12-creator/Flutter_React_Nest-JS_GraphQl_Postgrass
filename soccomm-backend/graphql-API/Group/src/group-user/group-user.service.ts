import { DeleteGroupUserInput } from "./dto/delete-group-user.input";
import { GroupService } from "../group/group.service";
import { GroupUser } from "./entities/group-user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateGroupUserInput } from "./dto/create-group-user.input";
import { UpdateGroupUserInput } from "./dto/update-group-user.input";
import { getConnection, Repository } from "typeorm";
import { Group } from "src/group/entities/group.entity";

@Injectable()
export class GroupUserService {
  constructor(
    @InjectRepository(GroupUser) private groupUser: Repository<GroupUser>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>
  ) {}
  async create(createGroupUserInput: CreateGroupUserInput) {
    const groupuser = await this.groupUser.create(createGroupUserInput);
    return this.groupUser.save(groupuser);
  }
  async createGroupusers(createGroupUserInput: CreateGroupUserInput[]) {
    const groupuser = await this.groupUser.create(createGroupUserInput);
    return this.groupUser.save(groupuser);
  }

  findAll() {
    return this.groupUser.find();
  }
  findAllByUserId(userId: string) {
    return this.groupUser.find({ where: { userId } });
  }

  findOne(id: string) {
    return this.groupUser.findOne(id);
  }

  async update(id: string, updateGroupUserInput: UpdateGroupUserInput) {
    const update = await this.groupUser.create(updateGroupUserInput);
    return this.groupUser.update(id, update);
  }

  remove(id: string) {
    return this.groupUser.delete(id);
  }
  findGroup(id: string) {
    return this.groupRepo.findOne(id);
  }
  async findUser(userId: string) {
    return await this.groupUser.find({ userId: userId });
  }
  async findGroupBy(id: string) {
    return await this.groupRepo.findOne(id);
  }
  async findGroupByUserId(userId: string) {
    const groupIds = await this.groupUser.find({ where: { userId } });

    return groupIds;
  }

  async deleteGroupByGroupIdAndUserId(deleteGroupUser: DeleteGroupUserInput) {
    const { groupId, userId } = deleteGroupUser;
    const groupuser = await this.groupUser.findOne({
      where: {
        groupId,
        userId,
      },
    });
    return this.groupUser.delete(groupuser.id);
  }

  // async findCandidateByUserId(id: string) {
  //   const connection = getConnection();
  //   const queryRunner = connection.createQueryRunner();
  //   await queryRunner.connect();
  //   let data = await queryRunner.query(`
  //   SELECT
  //   c.firstName,
  //   c.lastName,
  //   c.recruiterId,
  //   u.email,
  //   u.mobile ,
  //   u.userId ,
  //   cl.clientName ,
  //   cl.id,
  //   j.jobCode as jobId,
  //   j.id
  //   FROM
  //   candidate c
  //   INNER JOIN user u ON c.userId = u.userId
  //   left outer join job j on c.jobId=j.id
  //   left outer join client cl on j.clientId=cl.id
  //    where u.userId like '${id}'`);
  //   queryRunner.release();
  //   return data;
  // }

  async findById(id: number) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let data = await queryRunner.query(`
    SELECT
      g.id,
      g.groupName,
      g.createdBy,
      g.updatedBy,
      u.userId,
      gu.groupId,
      gu.userId,
      gu.isActive,
      gu.isAdmin
      FROM groupUser gu
      left outer join group g on gu.id = g.id
      where g.id like '${id}'
    `);
    queryRunner.release();
    return data;
  }
}
