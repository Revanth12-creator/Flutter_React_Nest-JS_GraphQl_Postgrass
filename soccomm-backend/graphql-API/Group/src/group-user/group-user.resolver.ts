import { DeleteGroupUserInput } from "./dto/delete-group-user.input";
import { UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  ResolveReference,
  Parent,
} from "@nestjs/graphql";
import { GroupUserService } from "./group-user.service";
import { GroupUser } from "./entities/group-user.entity";
import { CreateGroupUserInput } from "./dto/create-group-user.input";
import { UpdateGroupUserInput } from "./dto/update-group-user.input";
import { Group } from "src/group/entities/group.entity";
import { User } from "./entities/user.entity";
import { getgroups } from "process";
import { CurrentUser } from "src/auth/decorators/currentuser.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
@UseGuards(GqlAuthGuard)
@Resolver(() => GroupUser)
export class GroupUserResolver {
  constructor(private readonly groupUserService: GroupUserService) {}

  @Mutation(() => GroupUser)
  createGroupUser(
    @Args("createGroupUserInput") createGroupUserInput: CreateGroupUserInput
  ) {
    return this.groupUserService.create(createGroupUserInput);
  }

  @Mutation(() => [GroupUser])
  createGroupUserAll(
    @Args("createGroupUserInput", { type: () => [CreateGroupUserInput] })
    createGroupUserInput: CreateGroupUserInput[]
  ) {
    return this.groupUserService.createGroupusers(createGroupUserInput);
  }

  @Query(() => [GroupUser], { name: "allgroupUser" })
  findAll() {
    return this.groupUserService.findAll();
  }
  @Query(() => [GroupUser], { name: "allgroupUserByUserId" })
  findAllByUserId(@Args("userId") userId: string) {
    return this.groupUserService.findAllByUserId(userId);
  }

  @Query(() => GroupUser, { name: "groupUser" })
  findOne(@Args("id") id: string) {
    return this.groupUserService.findOne(id);
  }

  @Mutation(() => GroupUser)
  updateGroupUser(
    @Args("updateGroupUserInput") updateGroupUserInput: UpdateGroupUserInput
  ) {
    return this.groupUserService.update(
      updateGroupUserInput.id,
      updateGroupUserInput
    );
  }

  @Mutation(() => GroupUser)
  removeGroupUser(@Args("id") id: string) {
    return this.groupUserService.remove(id);
  }

  @Mutation(() => GroupUser)
  deleteGroupUser(
    @Args("deleteGroupUser") deleteGroupUser: DeleteGroupUserInput
  ) {
    return this.groupUserService.deleteGroupByGroupIdAndUserId(deleteGroupUser);
  }

  @ResolveField(() => Group)
  group(@Parent() groupUser: GroupUser) {
    return this.groupUserService.findGroup(groupUser.groupId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.groupUserService.findOne(reference.id);
  }

  @ResolveField((of) => User)
  user(@Parent() group: GroupUser) {
    return { __typename: "User", id: group.userId };
  }

  @Query(() => [GroupUser])
  getgroup(@CurrentUser() user) {
    return this.groupUserService.findGroupByUserId(user);
  }
}
