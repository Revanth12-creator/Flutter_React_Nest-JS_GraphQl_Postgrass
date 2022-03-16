import {
    Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { CreatePostAttributeInput } from './dto/create-post-attribute.input';
import { UpdatePostAttributeInput } from './dto/update-post-attribute.input';
import { Attribute } from './entities/attribute.entity';
import { PostAttribute } from './entities/post-attribute.entity';
import { PostAttributesService } from './post-attributes.service';

@Resolver(() => PostAttribute)
export class PostAttributesResolver {
  constructor(
    private readonly postAttributesService: PostAttributesService,
    public postService: PostService,
  ) {}

  @Mutation(() => [PostAttribute])
  createPostAttribute(
    @Args({
      name: 'createPostAttributeInput',
      type: () => [CreatePostAttributeInput],
    })
    createPostAttributeInput: CreatePostAttributeInput[],
    @CurrentUser() user,
  ) {
    return this.postAttributesService.create(createPostAttributeInput);
  }

  @Query(() => [PostAttribute], { name: 'allpostAttributes' })
  findAll() {
    return this.postAttributesService.findAll();
  }

  @Query(() => PostAttribute, { name: 'postAttribute' })
  findOne(@Args('id') id: string) {
    return this.postAttributesService.findOne(id);
  }

  @Mutation(() => PostAttribute)
  updatePostAttribute(
    @Args('updatePostAttributeInput')
    updatePostAttributeInput: UpdatePostAttributeInput,
  ) {
    return this.postAttributesService.update(
      updatePostAttributeInput.id,
      updatePostAttributeInput,
    );
  }

  @Mutation(() => PostAttribute)
  removePostAttribute(@Args('id') id: string) {
    return this.postAttributesService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.postAttributesService.findOne(reference.id);
  }

  @ResolveField(() => Post)
  async post(@Parent() post: PostAttribute) {
    return this.postService.findOne(post.postId);
  }
  @ResolveField(() => Attribute)
  async attribute(@Parent() postAttribute: PostAttribute) {
    return { __typename: 'Attribute', id: postAttribute.attributeId };
  }
}
