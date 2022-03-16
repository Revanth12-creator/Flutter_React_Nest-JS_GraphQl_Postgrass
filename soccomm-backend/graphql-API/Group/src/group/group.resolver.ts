import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/currentuser.decorator";
import {
  Query,
  Mutation,
  Args,
  Int,
  Resolver,
  ResolveReference,
} from "@nestjs/graphql";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import { GroupUser } from "src/group-user/entities/group-user.entity";
import { MonthsArrayInput } from "./dto/monthsArray";
@UseGuards(GqlAuthGuard)
@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}
  @Mutation(() => Group)
  createGroup(
    @Args("createGroupInput") createGroupInput: CreateGroupInput,
    @CurrentUser() user
  ) {
    console.log(user);

    let { name, type, createruserId } = createGroupInput;
    createruserId = user.sub;
    return this.groupService.create({ name, type, createruserId });
  }

  @Query(() => [Group], { name: "allgroup" })
  findAll() {
    return this.groupService.findAll();
  }

  @Query(() => [Group])
  findByType(@Args("type") type: string) {
    return this.groupService.findByType(type);
  }

  @Query(() => [Group])
  findAllGroupsInRange(
    @Args("fromDate", { type: () => String }) fromDate: string,
    @Args("toDate", { type: () => String }) toDate: string
  ) {
    return this.groupService.findAllInRange(fromDate, toDate);
  }

  @Query(() => [Group], { name: "searchByGroupName" })
  searchByGroupName(@Args("serach") search: string) {
    return this.groupService.searchGroupByName(search);
  }

  @Query(() => [Group], { name: "allprivate" })
  findAndCountPrivate() {
    return this.groupService.findAndCountPrivate();
  }
  @Query(() => [Group], { name: "allpublic" })
  findAndCountPublic() {
    return this.groupService.findAndCountPublic();
  }
  @Query(() => Group, { name: "group" })
  findOne(@Args("id") id: string) {
    return this.groupService.findOne(id);
  }

  @Query(() => Number)
  getGroupsCount() {
    return this.groupService.getCountOfAllGroups();
  }

  @Query(() => [Number])
  getGroupCountForGraph(
    @Args("monthsArray", { type: () => [MonthsArrayInput] })
    monthsArray: MonthsArrayInput[]
  ) {
    return this.groupService.getGroupCountForGraph(monthsArray);
  }
  //   @Get("addressByUserId/:uid")
  // findByUserId(@Param("uid") uid: string) {
  //   return this.addressService.findByUserId(uid);
  // }

  @Mutation(() => Group)
  updateGroup(@Args("updateGroupInput") updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput.id, updateGroupInput);
  }

  @Mutation(() => Group)
  removeGroup(@Args("id") id: string) {
    return this.groupService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.groupService.findOne(reference.id);
  }
  @Query(() => [GroupUser])
  getgroups(@CurrentUser() user) {
    return this.groupService.findgroupBUserId(user.sub);
  }
}
