import { GcPostInput } from './dto/GcPost.input';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { CreatePostInput } from './dto/create-post.input';
import { MonthsArrayInput } from './dto/monthsArray';
import { UpdatePostInput } from './dto/update-post.input';
import { Category } from './entities/category.entity';
import { Group } from './entities/group.entity';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';
import { PostService } from './post.service';
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user,
  ) {
    let { description, categoryId, groupId, userId, postTitle, type, isBuy } =
      createPostInput;
    userId = user.sub;
    return this.postService.create({
      description,
      categoryId,
      groupId,
      userId,
      postTitle,
      type,
      isBuy,
    });
  }

  @Query(() => [Post], { name: 'allPosts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => [Post], { name: 'allPostsInDescOrder' })
  findAllInDescOrder() {
    return this.postService.findAllInDescOrder();
  }

  @Query(() => Number)
  getPostsCount() {
    return this.postService.getCountOfAllPosts();
  }

  @Query(() => [Post])
  getPostsByCategoryId(
    @Args('fromDate', { type: () => String }) fromDate: string,
    @Args('toDate', { type: () => String }) toDate: string,
    @Args('catId', { type: () => String }) catId: string,
  ) {
    return this.postService.getPostsByCatId(fromDate, toDate, catId);
  }

  @Query(() => [Post])
  getPostsForCategories(
    @Args('fromDate', { type: () => String }) fromDate: string,
    @Args('toDate', { type: () => String }) toDate: string,
  ) {
    console.log('from ', fromDate, 'to', toDate);
    return this.postService.getPostsForCategories(fromDate, toDate);
  }

  @Query(() => [Number])
  getPostCountForGraph(
    @Args('monthsArray', { type: () => [MonthsArrayInput] })
    monthsArray: MonthsArrayInput[],
  ) {
    return this.postService.getPostCountForGraph(monthsArray);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id') id: string) {
    return this.postService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.postService.findOne(reference.id);
  }

  @ResolveField((of) => User)
  user(@Parent() post: Post) {
    return { __typename: 'User', id: post.userId };
  }

  @ResolveField((of) => Category)
  async category(@Parent() post: Post) {
    return { __typename: 'Category', id: post.categoryId };
  }

  @ResolveField((of) => Group)
  group(@Parent() post: Post) {
    return { __typename: 'Group', id: post.groupId };
  }

  @Query(() => [Post])
  groupcategoryposts(@Args('gcPost') gcPost: GcPostInput) {
    return this.postService.findByGroup1(gcPost);
  }
  @Query(() => [Post])
  groupposts(@Args('groupId') groupId: string) {
    return this.postService.findByGroup(groupId);
  }
}
