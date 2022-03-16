import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupPostsService } from "./group-posts.service";
import { GroupPost } from "./entities/group-post.entity";
import { CreateGroupPostInput } from "./dto/create-group-post.input";
import { UpdateGroupPostInput } from "./dto/update-group-post.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
@UseGuards(GqlAuthGuard)
@Resolver(() => GroupPost)
export class GroupPostsResolver {
  constructor(private readonly groupPostsService: GroupPostsService) {}

  @Mutation(() => GroupPost)
  createGroupPost(
    @Args("createGroupPostInput") createGroupPostInput: CreateGroupPostInput
  ) {
    return this.groupPostsService.create(createGroupPostInput);
  }

  @Query(() => [GroupPost], { name: "groupPosts" })
  findAll() {
    return this.groupPostsService.findAll();
  }

  @Query(() => GroupPost, { name: "groupPost" })
  findOne(@Args("id") id: string) {
    return this.groupPostsService.findOne(id);
  }

  @Mutation(() => GroupPost)
  updateGroupPost(
    @Args("updateGroupPostInput") updateGroupPostInput: UpdateGroupPostInput
  ) {
    return this.groupPostsService.update(
      updateGroupPostInput.id,
      updateGroupPostInput
    );
  }

  @Mutation(() => GroupPost)
  removeGroupPost(@Args("id") id: string) {
    return this.groupPostsService.remove(id);
  }
}
