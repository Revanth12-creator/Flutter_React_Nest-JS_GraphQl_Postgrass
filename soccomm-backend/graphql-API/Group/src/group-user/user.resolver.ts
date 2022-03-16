import { GroupUser } from "src/group-user/entities/group-user.entity";
import { GroupUserService } from "./group-user.service";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { Group } from "src/group/entities/group.entity";

@Resolver((of) => User)
export class UserResolver {
  constructor(private groupUserService: GroupUserService) {}

  @ResolveField((of) => [GroupUser])
  group(@Parent() user: User) {
    return this.groupUserService.findGroupByUserId(user.id);
  }
}
