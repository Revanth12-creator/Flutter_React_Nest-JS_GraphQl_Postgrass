
import { GroupModule } from "../group/group.module";
import { GroupUser } from "./entities/group-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { GroupUserService } from "./group-user.service";
import { GroupUserResolver } from "./group-user.resolver";
import { Group } from "src/group/entities/group.entity";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([GroupUser, Group]), GroupModule],
  providers: [GroupUserResolver, GroupUserService, UserResolver],
})
export class GroupUserModule {}
