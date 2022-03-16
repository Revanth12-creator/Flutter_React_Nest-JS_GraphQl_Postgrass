import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Attribute } from './entities/attribute.entity';
import { PostAttribute } from './entities/post-attribute.entity';
import { PostAttributesService } from './post-attributes.service';

@Resolver((of) => Attribute)
export class AttributeResolver {
  constructor(private postAttributeService: PostAttributesService) {}

  @ResolveField((of) => [PostAttribute])
  public postattribute(@Parent() attribute: Attribute): any {
    return this.postAttributeService.findByAttribute(attribute.id);
  }
}
