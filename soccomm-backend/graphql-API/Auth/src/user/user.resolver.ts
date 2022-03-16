import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveReference,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from './roles';
import { GqlRolesGuard } from 'src/auth/guards/gqlrole-auth.guard';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { MonthsArrayInput } from './dto/monthsArray';
const logger = new Logger();
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'alluser' })
  findAll(@Context() req, @CurrentUser() user) {
    logger.log('All', JSON.stringify(user));

    return this.userService.findAll();
  }

  @Query(() => [User])
  findAllUsersInRange(
  @Args('fromDate', { type: () => String }) fromDate: string,
  @Args('toDate', { type: () => String }) toDate: string
  ) {
    return this.userService.findAllInRange(fromDate,toDate);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => [Number])
  getCountOfActiveAndInactiveUsers(
  @Args('fromDate', { type: () => String }) fromDate: string,
  @Args('toDate', { type: () => String }) toDate: string
  ) {
    return this.userService.getCountOfActiveAndInactiveUsers(fromDate,toDate);
  }

  @Query(() => [Number])
  getUserCountForGraph(
    @Args('monthsArray', { type: () => [MonthsArrayInput] })
    monthsArray: MonthsArrayInput[],
  ) {
    return this.userService.getUserCountForGraph(monthsArray);
  }

  @Query(() => [User])
  getUsersByStatus(
  @Args('isActive') isActive: boolean,
  @Args('fromDate', { type: () => String }) fromDate: string,
  @Args('toDate', { type: () => String }) toDate: string, 
  ) {
    return this.userService.getUsersByStatus(isActive,fromDate,toDate);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.userService.findOne(reference.id);
  }

  @Query(() => String)
  findCount() {
    return this.userService.findCount();
  }
}
