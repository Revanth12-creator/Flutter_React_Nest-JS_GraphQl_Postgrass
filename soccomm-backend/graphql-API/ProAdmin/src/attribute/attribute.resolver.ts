import {
    Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { Category } from './../category/entities/category.entity';
import { AttributeService } from './attribute.service';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Attribute } from './entities/attribute.entity';

@Resolver(() => Attribute)
export class AttributeResolver {
  constructor(private readonly attributeService: AttributeService) {}

  @Mutation(() => Attribute)
  createAttribute(
    @Args('createAttributeInput') createAttributeInput: CreateAttributeInput,
  ) {
    return this.attributeService.create(createAttributeInput);
  }

  @Query(() => [Attribute], { name: 'allattribute' })
  findAll() {
    return this.attributeService.findAll();
  }

  @Query(() => Attribute, { name: 'attribute' })
  findOne(@Args('id') id: string) {
    return this.attributeService.findOne(id);
  }

  @Mutation(() => Attribute)
  updateAttribute(
    @Args('updateAttributeInput') updateAttributeInput: UpdateAttributeInput,
  ) {
    return this.attributeService.update(
      updateAttributeInput.id,
      updateAttributeInput,
    );
  }

  @Mutation(() => Attribute)
  removeAttribute(@Args('id') id: string) {
    return this.attributeService.remove(id);
  }

  @ResolveField(() => Category)
  async category(@Parent() attribute: Attribute) {
    return this.attributeService.findCategory(attribute.categoryId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.attributeService.findOne(reference.id);
  }
}
