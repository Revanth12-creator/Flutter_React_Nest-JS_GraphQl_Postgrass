import { GroupUserModule } from "./../group-user/group-user.module";
import { Group } from "./entities/group.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupResolver } from "./group.resolver";
import { GroupUser } from "src/group-user/entities/group-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupUser])],
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
