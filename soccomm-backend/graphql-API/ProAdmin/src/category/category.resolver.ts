import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'allcategory' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Query(() => [Category])
  findByLevel(@Args('level') level: number) {
    return this.categoryService.findByLevel(level);
  }

  @Query(() => [Category])
  getLastLevelCategories() {
    return this.categoryService.getLastLevelCategories();
  }

  @Query(() => String)
  findCountByLevel(@Args('level') level: number) {
    return this.categoryService.findCountByLevel(level);
  }

  @Query(() => [Category])
  findByParentId(@Args('parentid') parentid: string) {
    return this.categoryService.findByParentId(parentid);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id') id: string) {
    return this.categoryService.remove(id);
  }

  @ResolveField(() => Category)
  async parent(@Parent() category: Category) {
    return await this.categoryService.findParent(category.parentId);
  }

  @ResolveField(() => [Category])
  async child(@Parent() category: Category) {
    return await this.categoryService.findChild(category.id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.categoryService.findOne(reference.id);
  }
}
